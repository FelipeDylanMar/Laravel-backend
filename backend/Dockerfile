# Multi-stage build para otimização
FROM php:8.2-cli-alpine AS base

# Instalar dependências do sistema (Alpine)
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev \
    zip \
    unzip \
    mysql-client \
    bash

# Instalar extensões PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Stage para dependências
FROM base AS dependencies

# Copiar apenas arquivos de dependências primeiro (para cache)
COPY composer.json composer.lock ./

# Instalar dependências com cache otimizado
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-autoloader

# Stage de desenvolvimento
FROM base AS development

# Copiar composer files primeiro
COPY composer.json composer.lock ./

# Copiar resto dos arquivos
COPY . /var/www/html

# Copiar dependências do stage anterior
COPY --from=dependencies /var/www/html/vendor ./vendor

# Instalar dependências de desenvolvimento (sem scripts)
RUN composer install --optimize-autoloader --no-scripts

# Executar scripts após ter todos os arquivos
RUN composer run-script post-autoload-dump

# Copiar e configurar git wrapper para evitar warnings do proc_open()
COPY git-wrapper.sh /usr/local/bin/git
RUN chmod +x /usr/local/bin/git

# Criar diretórios necessários
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views storage/app/public bootstrap/cache

# Definir permissões
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Criar link simbólico do storage
RUN ln -sf /var/www/html/storage/app/public /var/www/html/public/storage

# Copiar arquivo de ambiente
RUN cp .env.docker .env

# Gerar chave da aplicação
RUN php artisan key:generate

# Otimizar autoloader
RUN composer dump-autoload --optimize

# Stage de produção
FROM base AS production

# Copiar dependências otimizadas
COPY --from=dependencies /var/www/html/vendor ./vendor

# Copiar aplicação
COPY . /var/www/html

# Configurar para produção
RUN composer install --no-dev --optimize-autoloader --no-scripts
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

# Configurações finais
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expor porta
EXPOSE 8000

# Comando padrão para desenvolvimento
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

# Copiar configuração PHP personalizada
COPY php.ini /usr/local/etc/php/php.ini

# Expor porta
EXPOSE 8000

# Comando padrão
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]