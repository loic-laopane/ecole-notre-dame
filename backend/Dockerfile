FROM php:8.3-cli-alpine

WORKDIR /var/www/backend

# Dépendances système
RUN apk add --no-cache \
    git curl unzip bash \
    postgresql-dev icu-dev oniguruma-dev libzip-dev

# Extensions PHP
RUN docker-php-ext-install \
    pdo pdo_pgsql intl mbstring zip opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Copier tout le code (bin/console doit exister avant composer install)
COPY . .

# Installer les dépendances de production
# Les scripts post-install ont été retirés du composer.json
# car cache:clear nécessite une DB → erreur pendant le build Docker
RUN APP_ENV=prod composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Vérifications
RUN ls vendor/autoload.php && echo "✅ autoload.php OK"
RUN ls vendor/autoload_runtime.php && echo "✅ autoload_runtime.php OK"

# Permissions
RUN mkdir -p var/cache var/log && chmod -R 777 var/

# Script de démarrage
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]
