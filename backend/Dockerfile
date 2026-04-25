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

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copier le projet
COPY . .

# Installer les dépendances (sans dev en prod)
RUN composer install \
    --no-interaction \
    --no-dev \
    --optimize-autoloader \
    2>/dev/null || true

# Permissions sur var/
RUN mkdir -p var/cache var/log && chmod -R 777 var/

# Script de démarrage : migrations + serveur sur port 8080
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
