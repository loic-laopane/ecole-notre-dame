<?php

namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class OAuthAuthenticator extends OAuth2Authenticator
{
    public function __construct(
        private ClientRegistry        $clientRegistry,
        private EntityManagerInterface $em,
        private UserRepository        $userRepository,
        private RouterInterface       $router,
    ) {}

    public function supports(Request $request): ?bool
    {
        return in_array($request->attributes->get('_route'), [
            'connect_google_check',
            'connect_microsoft_check',
        ]);
    }

    public function authenticate(Request $request): Passport
    {
        $provider = str_contains($request->attributes->get('_route'), 'google')
            ? 'google' : 'microsoft';

        $client      = $this->clientRegistry->getClient($provider);
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function () use ($accessToken, $client, $provider) {
                $oauthUser = $client->fetchUserFromToken($accessToken);

                $email    = $oauthUser->getEmail();
                $oauthId  = $oauthUser->getId();

                // Find or create user
                $user = $this->userRepository->findOneBy(['email' => $email])
                    ?? $this->userRepository->findOneBy(['oauthProvider' => $provider, 'oauthId' => $oauthId]);

                if (!$user) {
                    $user = new User();
                    $user->setEmail($email);
                    $user->setRoles([User::ROLE_PARENT]);
                }

                // Update OAuth info
                $user->setOauthProvider($provider);
                $user->setOauthId($oauthId);

                if (method_exists($oauthUser, 'getFirstName')) {
                    $user->setFirstName($oauthUser->getFirstName());
                    $user->setLastName($oauthUser->getLastName());
                }

                if (method_exists($oauthUser, 'getAvatar') && $oauthUser->getAvatar()) {
                    $user->setAvatar($oauthUser->getAvatar());
                }

                $user->setLastLoginAt(new \DateTimeImmutable());

                $this->em->persist($user);
                $this->em->flush();

                return $user;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Redirect to frontend after successful OAuth login
        $frontendUrl = $_ENV['FRONTEND_URL'] ?? 'http://localhost:3000';
        return new RedirectResponse($frontendUrl . '/auth/callback');
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $message = strtr($exception->getMessageKey(), $exception->getMessageData());
        return new Response($message, Response::HTTP_FORBIDDEN);
    }
}
