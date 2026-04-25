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

# Copier composer.json/lock
COPY composer.json composer.lock* ./

# Étape 1 : installer sans scripts applicatifs
# SYMFONY_SKIP_SCRIPTS=1 désactive cache:clear et assets:install
# mais laisse tourner les plugins (symfony/runtime → autoload_runtime.php)
RUN SYMFONY_SKIP_SCRIPTS=1 APP_ENV=prod composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Copier le reste du code
COPY . .

# Vérification
RUN ls vendor/autoload*.php && echo "✅ Autoload files OK"

# Permissions
RUN mkdir -p var/cache var/log && chmod -R 777 var/

COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]
