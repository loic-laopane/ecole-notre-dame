#!/bin/bash
set -e

# Toujours se placer dans le répertoire du projet
cd /var/www/backend

echo "=== NDSL Backend – Démarrage ==="
echo "APP_ENV=${APP_ENV:-prod}"
echo "Répertoire: $(pwd)"

# Vérifications
[ -f vendor/autoload.php ]         && echo "✅ autoload.php OK"         || { echo "❌ autoload.php manquant"; exit 1; }
[ -f vendor/autoload_runtime.php ] && echo "✅ autoload_runtime.php OK" || { echo "❌ autoload_runtime.php manquant"; exit 1; }
[ -f bin/console ]                 && echo "✅ bin/console OK"          || { echo "❌ bin/console manquant"; exit 1; }

# APP_SECRET
if [ -z "$APP_SECRET" ]; then
    export APP_SECRET=$(php -r "echo bin2hex(random_bytes(16));")
    echo "⚠️  APP_SECRET généré temporairement"
fi

# Cache warmup
echo "🔥 Cache warmup..."
php bin/console cache:warmup --env=${APP_ENV:-prod} --no-debug \
    && echo "✅ Cache OK" \
    || echo "⚠️  Cache warmup échoué (non bloquant)"

# Migrations
if [ -n "$DATABASE_URL" ]; then
    echo "🔄 Migrations..."
    php bin/console doctrine:migrations:migrate \
        --no-interaction --allow-no-migration --env=${APP_ENV:-prod} \
        && echo "✅ Migrations OK" \
        || echo "⚠️  Migrations échouées (non bloquant)"
else
    echo "⚠️  DATABASE_URL non défini — migrations ignorées"
fi

echo "🚀 Démarrage PHP sur 0.0.0.0:8080..."
exec php -S 0.0.0.0:8080 -t public
