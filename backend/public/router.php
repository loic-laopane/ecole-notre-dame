<?php
declare(strict_types=1);

/**
 * Routeur pour le serveur PHP built-in (php -S).
 *
 * Sans ce fichier, php -S sert uniquement les fichiers physiques et retourne
 * 404 pour toutes les routes Symfony (/api/*, /api/health, etc.).
 * Ce routeur reproduit le comportement de la directive try_files d'Nginx :
 *   - fichier physique trouvé → servi directement (CSS, JS, images…)
 *   - sinon                  → tout passe par public/index.php (front controller Symfony)
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/');

// Servir les fichiers statiques existants directement (évite de passer par Symfony)
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Toutes les autres requêtes → front controller Symfony
require_once __DIR__ . '/index.php';
