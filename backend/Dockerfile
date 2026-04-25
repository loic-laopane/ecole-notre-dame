# ── Stage 1 : build Composer ─────────────────────────────────────────────
FROM composer:2 AS vendor

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour profiter du cache Docker
COPY composer.json composer.lock* ./

# Installer les dépendances de production
# --ignore-platform-reqs : évite les erreurs d'extensions manquantes dans l'image Composer
RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --ignore-platform-reqs

# ── Stage 2 : image finale ───────────────────────────────────────────────
FROM php:8.3-cli-alpine

WORKDIR /var/www/backend

# Dépendances système
RUN apk add --no-cache \
    git curl unzip bash \
    postgresql-dev icu-dev oniguruma-dev libzip-dev

# Extensions PHP
RUN docker-php-ext-install \
    pdo pdo_pgsql intl mbstring zip opcache

# OPcache production
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.validate_timestamps=0'; \
} >> /usr/local/etc/php/conf.d/opcache.ini

# Copier le code source
COPY . .

# Copier le vendor/ depuis le stage de build
# (on est sûr qu'il est complet et optimisé)
COPY --from=vendor /app/vendor ./vendor

# Permissions sur var/
RUN mkdir -p var/cache var/log && chmod -R 777 var/

# Script de démarrage
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
