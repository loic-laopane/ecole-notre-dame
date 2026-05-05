<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Attribute\Route;

class HealthController extends AbstractController
{
    #[Route('/', name: 'api_root', methods: ['GET'])]
    public function root(): RedirectResponse
    {
        return $this->redirect('/api');
    }

    #[Route('/api/health', name: 'api_health', methods: ['GET'])]
    public function health(): JsonResponse
    {
        return $this->json([
            'status'  => 'ok',
            'app'     => 'NDSL API',
            'version' => '1.0.0',
            'env'     => $this->getParameter('kernel.environment'),
        ]);
    }
}
