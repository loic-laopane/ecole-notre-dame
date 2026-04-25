<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * Health check endpoint utilisé par Fly.io pour vérifier que l'app est vivante.
 */
class HealthController extends AbstractController
{
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
