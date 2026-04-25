#!/bin/bash
set -e

echo "=== NDSL Backend – Démarrage ==="
echo "APP_ENV=${APP_ENV:-prod}"

# Vérifier que vendor/ est bien là
if [ ! -f /var/www/backend/vendor/autoload.php ]; then
    echo "❌ vendor/autoload.php introuvable !"
    exit 1
fi
echo "✅ vendor/ OK"

# Cache warmup
echo "🔥 Cache warmup..."
php bin/console cache:warmup --env=${APP_ENV:-prod} --no-debug 2>/dev/null && echo "✅ Cache OK" || echo "⚠️  Cache warmup ignoré"

# Migrations
if [ -n "$DATABASE_URL" ]; then
    echo "🔄 Migrations..."
    php bin/console doctrine:migrations:migrate \
        --no-interaction \
        --allow-no-migration \
        --env=${APP_ENV:-prod} 2>/dev/null && echo "✅ Migrations OK" || echo "⚠️  Migrations ignorées"
else
    echo "⚠️  DATABASE_URL non défini, migrations ignorées"
fi

echo "🚀 Serveur PHP sur 0.0.0.0:8080..."
exec php -S 0.0.0.0:8080 -t public
