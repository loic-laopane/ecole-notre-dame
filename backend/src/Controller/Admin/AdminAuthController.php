<?php

namespace App\Controller\Admin;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AdminAuthController extends AbstractController
{
    #[Route('/admin/login', name: 'admin_login')]
    public function login(): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('admin');
        }

        return $this->render('admin/login.html.twig');
    }

    #[Route('/admin/auth/google', name: 'admin_connect_google_start')]
    public function connectGoogle(ClientRegistry $registry): RedirectResponse
    {
        return $registry->getClient('google')->redirect(['openid', 'email', 'profile']);
    }

    #[Route('/admin/auth/google/callback', name: 'admin_connect_google_check')]
    public function connectGoogleCheck(): never
    {
        throw new \LogicException('Handled by OAuthAuthenticator.');
    }

    #[Route('/admin/logout', name: 'app_logout')]
    public function logout(): never
    {
        throw new \LogicException('Handled by Symfony security.');
    }
}
