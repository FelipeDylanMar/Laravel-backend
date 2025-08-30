FROM php:8.2-cli

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensões PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar composer.json e composer.lock primeiro
COPY composer.json composer.lock ./

# Instalar dependências
RUN composer install --no-dev --optimize-autoloader

# Copiar resto dos arquivos
COPY . /var/www/html

# Copiar e configurar git wrapper para evitar warnings do proc_open()
COPY git-wrapper.sh /usr/local/bin/git
RUN chmod +x /usr/local/bin/git

# Criar diretórios necessários
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views storage/app/public

# Definir permissões
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Criar link simbólico do storage
RUN ln -sf /var/www/html/storage/app/public /var/www/html/public/storage

# Copiar arquivo de ambiente
RUN cp .env.docker .env

# Gerar chave da aplicação
RUN php artisan key:generate

# Copiar configuração PHP personalizada
COPY php.ini /usr/local/etc/php/php.ini

# Expor porta
EXPOSE 8000

# Comando padrão
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]