<?php

namespace App\Controller\Api;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/auth', name: 'api_auth_')]
class AuthController extends AbstractController
{
    // ── Redirect to Google ──────────────────────
    #[Route('/google', name: 'google_start')]
    public function connectGoogle(ClientRegistry $registry): RedirectResponse
    {
        return $registry->getClient('google')->redirect(['openid', 'email', 'profile']);
    }

    // ── Google callback ─────────────────────────
    #[Route('/google/callback', name: 'connect_google_check')]
    public function connectGoogleCheck(): never
    {
        // Handled by OAuthAuthenticator
        throw new \LogicException('This should be intercepted by the authenticator.');
    }

    // ── Redirect to Microsoft ───────────────────
    #[Route('/microsoft', name: 'microsoft_start')]
    public function connectMicrosoft(ClientRegistry $registry): RedirectResponse
    {
        return $registry->getClient('microsoft')->redirect(['openid', 'email', 'profile']);
    }

    // ── Microsoft callback ──────────────────────
    #[Route('/microsoft/callback', name: 'connect_microsoft_check')]
    public function connectMicrosoftCheck(): never
    {
        throw new \LogicException('This should be intercepted by the authenticator.');
    }

    // ── Return JWT for authenticated user ───────
    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(
        #[CurrentUser] ?UserInterface $user,
        JWTTokenManagerInterface $jwtManager,
    ): JsonResponse {
        if (!$user) {
            return $this->json(['error' => 'Not authenticated'], 401);
        }

        return $this->json([
            'token' => $jwtManager->create($user),
            'user'  => [
                'email'     => $user->getUserIdentifier(),
                'roles'     => $user->getRoles(),
                'firstName' => method_exists($user, 'getFirstName') ? $user->getFirstName() : null,
                'lastName'  => method_exists($user, 'getLastName')  ? $user->getLastName()  : null,
                'avatar'    => method_exists($user, 'getAvatar')    ? $user->getAvatar()    : null,
            ],
        ]);
    }

    // ── Logout ──────────────────────────────────
    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(): never
    {
        // Handled by Symfony security
        throw new \LogicException('This should be intercepted by the logout handler.');
    }
}
