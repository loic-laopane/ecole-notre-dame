# ── Stage 1 : dépendances Composer ───────────────────────────────────────
FROM composer:2 AS vendor

WORKDIR /app
COPY composer.json composer.lock* ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --optimize-autoloader

# ── Stage 2 : image finale PHP ───────────────────────────────────────────
FROM php:8.3-fpm-alpine

WORKDIR /var/www/backend

# Dépendances système
RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-dev \
    icu-dev \
    oniguruma-dev \
    libzip-dev \
    bash \
    curl

# Extensions PHP
RUN docker-php-ext-install \
    pdo pdo_pgsql intl mbstring zip opcache

# Config OPcache pour la production
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=256'; \
    echo 'opcache.max_accelerated_files=20000'; \
    echo 'opcache.validate_timestamps=0'; \
} >> /usr/local/etc/php/conf.d/opcache.ini

# Config PHP-FPM
RUN sed -i 's/listen = 127.0.0.1:9000/listen = \/var\/run\/php-fpm.sock/' \
    /usr/local/etc/php-fpm.d/www.conf && \
    sed -i 's/;listen.owner = nobody/listen.owner = nginx/' \
    /usr/local/etc/php-fpm.d/www.conf && \
    sed -i 's/;listen.group = nobody/listen.group = nginx/' \
    /usr/local/etc/php-fpm.d/www.conf

# Config Nginx – écoute sur 8080 (port attendu par Fly.io)
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Config Supervisor (gère nginx + php-fpm)
COPY docker/supervisord.conf /etc/supervisord.conf

# Copier le code source
COPY . .

# Copier les dépendances optimisées depuis le stage vendor
COPY --from=vendor /app/vendor ./vendor

# Permissions
RUN chown -R nginx:nginx /var/www/backend && \
    chmod -R 755 /var/www/backend && \
    mkdir -p var/cache var/log && \
    chown -R nginx:nginx var/

# Compiler les assets Symfony (production)
RUN APP_ENV=prod php bin/console cache:warmup --no-debug 2>/dev/null || true

EXPOSE 8080

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
