#!/bin/bash
set -e

echo "=== NDSL Backend – Démarrage ==="
echo "APP_ENV=${APP_ENV:-prod}"
echo "PHP version: $(php -v | head -1)"

# ── Vérifications ──────────────────────────────────────────
if [ ! -f /var/www/backend/vendor/autoload.php ]; then
    echo "❌ FATAL: vendor/autoload.php introuvable"
    echo "   Le composer install a échoué pendant le build Docker"
    exit 1
fi
echo "✅ vendor/autoload.php OK"

if [ ! -f /var/www/backend/vendor/autoload_runtime.php ]; then
    echo "❌ FATAL: vendor/autoload_runtime.php introuvable"
    echo "   Symfony Runtime n'a pas été installé correctement"
    ls /var/www/backend/vendor/ | head -20
    exit 1
fi
echo "✅ vendor/autoload_runtime.php OK"

# ── APP_SECRET obligatoire ──────────────────────────────────
if [ -z "$APP_SECRET" ]; then
    echo "⚠️  APP_SECRET non défini, génération d'une valeur temporaire"
    export APP_SECRET=$(php -r "echo bin2hex(random_bytes(16));")
fi

# ── Cache warmup (optionnel en cas d'erreur) ────────────────
echo "🔥 Cache warmup..."
php bin/console cache:warmup \
    --env=${APP_ENV:-prod} \
    --no-debug \
    && echo "✅ Cache OK" \
    || echo "⚠️  Cache warmup échoué (non bloquant)"

# ── Migrations ──────────────────────────────────────────────
if [ -n "$DATABASE_URL" ]; then
    echo "🔄 Migrations..."
    php bin/console doctrine:migrations:migrate \
        --no-interaction \
        --allow-no-migration \
        --env=${APP_ENV:-prod} \
        && echo "✅ Migrations OK" \
        || echo "⚠️  Migrations échouées (non bloquant)"
else
    echo "⚠️  DATABASE_URL non défini — migrations ignorées"
fi

# ── Démarrage serveur ────────────────────────────────────────
echo "🚀 Démarrage PHP built-in server sur 0.0.0.0:8080..."
exec php -S 0.0.0.0:8080 -t public
