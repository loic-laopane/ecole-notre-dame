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

# Copier TOUT le code source d'abord
# (nécessaire pour que bin/console soit disponible pendant composer install)
COPY . .

# Installer les dépendances
# SYMFONY_SKIP_SCRIPTS désactive cache:clear et assets:install
# mais laisse symfony/runtime générer autoload_runtime.php via son plugin
RUN APP_ENV=prod SYMFONY_SKIP_SCRIPTS=1 composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# Vérifier que les fichiers critiques sont présents
RUN ls vendor/autoload.php && echo "✅ autoload.php OK" && \
    ls vendor/autoload_runtime.php && echo "✅ autoload_runtime.php OK"

# Permissions var/
RUN mkdir -p var/cache var/log && chmod -R 777 var/

# Script de démarrage
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]
