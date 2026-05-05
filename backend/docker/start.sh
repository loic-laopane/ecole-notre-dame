#!/bin/bash
set -e

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

# Clés JWT : supporte deux modes
#   - Fichiers .pem via JWT_SECRET_KEY / JWT_PUBLIC_KEY (chemin)
#   - Contenu base64 via JWT_SECRET_KEY_BASE64 / JWT_PUBLIC_KEY_BASE64 (Railway/CI)
if [ -n "$JWT_SECRET_KEY_BASE64" ] && [ -n "$JWT_PUBLIC_KEY_BASE64" ]; then
    mkdir -p /tmp/jwt
    echo "$JWT_SECRET_KEY_BASE64" | base64 -d > /tmp/jwt/private.pem
    echo "$JWT_PUBLIC_KEY_BASE64" | base64 -d > /tmp/jwt/public.pem
    export JWT_SECRET_KEY=/tmp/jwt/private.pem
    export JWT_PUBLIC_KEY=/tmp/jwt/public.pem
    echo "✅ Clés JWT chargées depuis les variables base64"
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

# Railway injecte $PORT ; fallback à 8080 pour les autres environnements
PORT=${PORT:-8080}
echo "🚀 Démarrage PHP sur 0.0.0.0:${PORT}..."
# public/router.php est indispensable : php -S ne réécrit pas les URLs vers index.php
# sans lui, toutes les routes Symfony (/api/*) retournent 404.
exec php -S 0.0.0.0:${PORT} -t public public/router.php
