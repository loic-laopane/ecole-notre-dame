#!/bin/bash
set -e

echo "=== NDSL Backend – Démarrage ==="
echo "APP_ENV=$APP_ENV"

# Warmup cache Symfony
echo "🔥 Cache warmup..."
php bin/console cache:warmup --no-debug --env=${APP_ENV:-prod} 2>/dev/null || true

# Migrations (si DATABASE_URL est défini)
if [ -n "$DATABASE_URL" ]; then
    echo "🔄 Migrations en cours..."
    php bin/console doctrine:migrations:migrate \
        --no-interaction \
        --allow-no-migration \
        --env=${APP_ENV:-prod} 2>/dev/null || echo "⚠️  Migrations ignorées"
else
    echo "⚠️  DATABASE_URL non défini, migrations ignorées"
fi

echo "🚀 Démarrage du serveur PHP sur le port 8080..."
exec php -S 0.0.0.0:8080 -t public
