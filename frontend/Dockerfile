# Multi-stage build para otimização
FROM node:20-alpine AS base

# Instalar dependências do sistema
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Stage para dependências
FROM base AS dependencies

# Copiar apenas arquivos de dependências primeiro (para cache)
COPY package*.json ./

# Configurar npm para cache otimizado
RUN npm config set cache /tmp/.npm-cache --global

# Instalar dependências com cache otimizado
RUN npm ci --only=production --silent

# Stage de desenvolvimento
FROM base AS development

# Copiar dependências do stage anterior
COPY --from=dependencies /app/node_modules ./node_modules

# Copiar package files
COPY package*.json ./

# Instalar todas as dependências (incluindo dev)
RUN npm ci --silent

# Copiar código fonte
COPY . .

# Usar arquivo de ambiente Docker
RUN cp .env.docker .env

# Expor porta
EXPOSE 5173

# Comando padrão para desenvolvimento
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

# Stage de build para produção
FROM development AS build

# Build da aplicação
RUN npm run build

# Stage de produção
FROM nginx:alpine AS production

# Copiar arquivos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]