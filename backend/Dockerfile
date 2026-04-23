FROM php:8.3-cli-alpine

WORKDIR /var/www/backend

# System deps
RUN apk add --no-cache \
    git curl unzip bash \
    postgresql-dev icu-dev oniguruma-dev libzip-dev

# PHP extensions
RUN docker-php-ext-install \
    pdo pdo_pgsql intl mbstring zip opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy project
COPY . .

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader 2>/dev/null || true

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
