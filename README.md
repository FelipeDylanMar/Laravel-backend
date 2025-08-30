# Sistema de Gerenciamento de Produtos

Sistema completo de gerenciamento de produtos com backend Laravel e frontend Vue.js 3, containerizado com Docker para desenvolvimento e produção.

## 📁 Estrutura do Projeto

```
INNYX-Challange/
├── backend/              # API Laravel 9+ com PHP 8+
│   ├── Dockerfile        # Container otimizado multi-stage
│   └── database/mysql.cnf # Configurações MySQL otimizadas
├── frontend/             # Aplicação Vue.js 3 com TypeScript
│   ├── Dockerfile        # Container otimizado com Nginx
│   └── nginx.conf        # Configuração Nginx para produção
├── docker-compose.yml    # Orquestração dos containers
├── dev-start.ps1         # Script de inicialização rápida
├── OTIMIZACOES_DOCKER.md # Documentação técnica das otimizações
├── .gitignore           # Configurações do Git
└── README.md            # Este arquivo
```

## 🚀 Backend (Laravel)

### Tecnologias
- **Laravel 9+**
- **PHP 8+**
- **MySQL/SQLite**
- **Laravel Sanctum** (Autenticação por token)

### Funcionalidades
- ✅ CRUD completo de produtos
- ✅ Gerenciamento de categorias
- ✅ Autenticação por token
- ✅ Paginação e busca
- ✅ Upload de imagens
- ✅ Validações robustas
- ✅ Relacionamentos de banco
- ✅ Testes automatizados

### Como executar o Backend

**Com Docker (Recomendado):**
```bash
docker-compose up -d backend mysql
```

**Localmente:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Servidor:** http://localhost:8000

### Credenciais de Teste
- **Email:** teste@exemplo.com
- **Senha:** 123456

### Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| GET | `/api/categories` | Lista categorias | Não |
| GET | `/api/products` | Lista produtos (com paginação/busca) | Sim |
| POST | `/api/products` | Cria produto | Sim |
| GET | `/api/products/{id}` | Visualiza produto | Sim |
| PUT/PATCH | `/api/products/{id}` | Atualiza produto | Sim |
| DELETE | `/api/products/{id}` | Exclui produto | Sim |

## 🎨 Frontend (Vue.js 3)

### Tecnologias Planejadas
- **Vue.js 3**
- **TypeScript**
- **Composition API**
- **Vue Router**
- **Pinia** (State Management)
- **Axios** (HTTP Client)
- **UI Library** (a definir)
- **Vite** (Build Tool)

### Funcionalidades Planejadas
- 📋 Listagem de produtos com paginação
- 🔍 Busca e filtros
- ➕ Cadastro de produtos
- ✏️ Edição de produtos
- 🗑️ Exclusão de produtos
- 📁 Gerenciamento de categorias
- 🔐 Sistema de login
- 📱 Interface responsiva
- 🖼️ Upload de imagens

### Como executar o Frontend

**Com Docker (Recomendado):**
```bash
docker-compose up -d frontend
```

**Localmente:**
```bash
cd frontend
npm install
npm run dev
```

**Servidor:** http://localhost:5173

## 🐳 Desenvolvimento com Docker (Recomendado)

### Pré-requisitos
- **Docker Desktop**
- **Docker Compose**
- **PowerShell** (Windows)

### Inicialização Rápida

```powershell
# Execute o script de desenvolvimento
.\dev-start.ps1
```

Ou manualmente:

```bash
# Clone o repositório
git clone <repository-url>
cd INNYX-Challange

# Inicie todos os serviços
docker-compose up -d

# Gere a chave da aplicação Laravel (primeira execução)
docker-compose exec backend php artisan key:generate

# Execute as migrações (primeira execução)
docker-compose exec backend php artisan migrate --seed
```

### URLs de Acesso
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **MySQL:** localhost:3306

### Comandos Úteis

```bash
# Ver logs dos containers
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Rebuild dos containers
docker-compose up --build

# Executar comandos no backend
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan test

# Executar comandos no frontend
docker-compose exec frontend npm run test
```

## 🔧 Desenvolvimento Local (Alternativo)

### Pré-requisitos
- **PHP 8+**
- **Composer**
- **Node.js 18+**
- **NPM/Yarn**
- **MySQL** (opcional, SQLite configurado)

### Setup Completo

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd INNYX-Challange
   ```

2. **Configure o Backend:**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```

3. **Configure o Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📚 Documentação

- **Backend:** Consulte `backend/README_SISTEMA_PRODUTOS.md`
- **API:** Documentação dos endpoints disponível no backend
- **Frontend:** Documentação será adicionada após implementação

## 🧪 Testes

### Backend
**Com Docker:**
```bash
docker-compose exec backend php artisan test
```

**Localmente:**
```bash
cd backend
php artisan test
```

### Frontend
**Com Docker:**
```bash
docker-compose exec frontend npm run test
```

**Localmente:**
```bash
cd frontend
npm run test
```

## 🚀 Deploy

### Produção com Docker

O projeto está configurado com Dockerfiles otimizados para produção:

```bash
# Build das imagens de produção
docker-compose -f docker-compose.yml build

# Deploy em produção
docker-compose up -d
```

### Otimizações Implementadas
- **Multi-stage builds** para reduzir tamanho das imagens
- **Cache de dependências** para builds mais rápidos
- **Nginx** otimizado para servir o frontend
- **MySQL** com configurações de performance
- **Volumes persistentes** para dados do banco

Consulte `OTIMIZACOES_DOCKER.md` para detalhes técnicos.

## 📄 Licença

Este projeto é parte de um desafio técnico.

---

**Status do Projeto:**
- ✅ Backend: Completo e funcional
- ✅ Frontend: Completo e funcional
- ✅ Integração: Implementada
- ✅ Docker: Otimizado para desenvolvimento e produção
- ✅ Deploy: Pronto para produção