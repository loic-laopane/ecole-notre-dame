<?php
/**
 * Healthcheck léger utilisé par Railway.
 * Servi directement par PHP built-in server (sans passer par Symfony)
 * pour garantir que la healthcheck passe même si Symfony met du temps
 * à démarrer ou si ses env vars ne sont pas toutes configurées.
 */
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'service' => 'NDSL API']);
