#!/bin/bash
set -e

echo "=== NDSL Backend – Démarrage ==="

# Attendre que la DB soit prête
echo "⏳ Attente de la base de données..."
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
    echo "   DB pas encore prête, nouvelle tentative dans 2s..."
    sleep 2
done
echo "✅ Base de données disponible"

# Lancer les migrations
echo "🔄 Lancement des migrations..."
php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
echo "✅ Migrations OK"

# Cache warmup
echo "🔥 Cache warmup..."
php bin/console cache:warmup --no-debug
echo "✅ Cache OK"

echo "🚀 Démarrage de Supervisor (Nginx + PHP-FPM)..."
exec /usr/bin/supervisord -c /etc/supervisord.conf
