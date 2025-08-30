FROM node:20

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Limpar cache e instalar dependências
RUN npm cache clean --force && npm install

# Copiar código fonte
COPY . .

# Usar arquivo de ambiente Docker
RUN cp .env.docker .env

# Expor porta
EXPOSE 5173

# Comando padrão
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]