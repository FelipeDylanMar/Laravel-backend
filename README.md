# INNYX Challenge - Sistema de Gerenciamento de Produtos

Sistema completo de gerenciamento de produtos desenvolvido com **Laravel 11** (Backend) e **Vue.js 3 + TypeScript** (Frontend), implementando conceitos avançados de desenvolvimento web moderno.

## 🚀 Tecnologias e Conceitos Avançados

### Backend - Laravel 11
- **Laravel Sanctum** - Autenticação stateless com tokens JWT
- **ACL (Access Control List)** - Sistema granular de roles e permissions
- **API RESTful** - Endpoints seguindo padrões REST com versionamento
- **Eloquent ORM** - Relacionamentos complexos e queries otimizadas
- **Form Request Validation** - Validação robusta com rules customizadas
- **Middleware Pipeline** - Interceptação e processamento de requests
- **Service Container** - Injeção de dependência e service providers
- **Database Migrations** - Versionamento de schema com rollback
- **Seeders e Factories** - População automática de dados de teste
- **File Upload** - Gerenciamento seguro de arquivos com validação

### Frontend - Vue.js 3 + TypeScript
- **Composition API** - Lógica reativa moderna e reutilizável
- **TypeScript Strict Mode** - Tipagem estática rigorosa
- **Pinia Store** - Gerenciamento de estado reativo e persistente
- **Vue Router** - SPA com guards de autenticação e lazy loading
- **Reactive Forms** - Formulários reativos com validação em tempo real
- **Component Architecture** - Componentes reutilizáveis e modulares
- **Error Boundaries** - Tratamento elegante de erros
- **Progressive Web App** - Recursos PWA para melhor UX
- **Responsive Design** - Interface adaptativa mobile-first

### DevOps e Infraestrutura
- **Docker Compose** - Orquestração de containers com networking
- **Multi-stage Builds** - Otimização de imagens Docker para produção
- **Volume Persistence** - Dados persistentes entre restarts
- **Health Checks** - Monitoramento automático de saúde dos serviços
- **Environment Variables** - Configuração flexível por ambiente

## 📋 Funcionalidades Implementadas

### 🛍️ Gerenciamento de Produtos
- **CRUD Completo** - Create, Read, Update, Delete com validação
- **Upload de Imagens** - Suporte a múltiplos formatos (JPEG, PNG, GIF)
- **Categorização** - Organização hierárquica por categorias
- **Validação Dupla** - Frontend (UX) + Backend (Segurança)
- **Busca Avançada** - Filtros por nome, categoria, preço, data
- **Paginação Inteligente** - Performance otimizada para grandes datasets
- **Ordenação Dinâmica** - Múltiplos critérios de ordenação
- **Soft Deletes** - Exclusão lógica com possibilidade de recuperação

### 🔐 Sistema de Autenticação e Autorização
- **JWT Authentication** - Tokens seguros e stateless
- **Role-Based Access Control** - Roles: Admin, Manager, User
- **Permission System** - Permissões granulares por recurso
- **Route Guards** - Proteção automática de rotas frontend/backend
- **Session Management** - Controle de sessões ativas
- **Password Security** - Hash bcrypt com salt automático

### 🎨 Interface e Experiência do Usuário
- **Design System** - Paleta de cores INNYX consistente
- **Responsive Layout** - Mobile-first design com breakpoints
- **Loading States** - Feedback visual em operações assíncronas
- **Error Handling** - Mensagens de erro contextuais e acionáveis
- **Form Validation** - Validação em tempo real com feedback visual
- **Accessibility** - Suporte a leitores de tela e navegação por teclado

## 🏗️ Arquitetura do Sistema

### Backend - Arquitetura em Camadas
```
┌─────────────────────────────────────────────────────────┐
│                    API Layer                            │
│  Controllers → Middleware → Validation → Services       │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                  Business Layer                         │
│     Models → Relationships → Scopes → Observers        │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                   Data Layer                            │
│    Migrations → Seeders → Factories → Database         │
└─────────────────────────────────────────────────────────┘
```

### Frontend - Arquitetura Reativa
```
┌─────────────────────────────────────────────────────────┐
│                 Presentation Layer                      │
│      Views → Components → Composables                  │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                  State Layer                            │
│    Pinia Stores → Reactive State → Computed Values     │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                 Service Layer                           │
│     API Services → HTTP Client → Error Handling        │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Como Executar o Projeto

### 🐳 Com Docker (Recomendado)

**Execução Completa (Um Comando):**
```bash
docker-compose up -d --build
```

**Acesso:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **MySQL:** localhost:3306

### 🔧 Execução Local (Desenvolvimento)

**Backend:**
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 👤 Credenciais de Teste
- **Email:** admin@example.com
- **Senha:** password

### Endpoints da API

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
### Autenticação
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| POST | `/api/login` | Login do usuário | Não |
| POST | `/api/logout` | Logout do usuário | Sim |

### Produtos
| Método | Endpoint | Descrição | Permissão |
|--------|----------|-----------|-----------|
| GET | `/api/products` | Lista produtos (paginado) | `products.view` |
| POST | `/api/products` | Cria novo produto | `products.create` |
| GET | `/api/products/{id}` | Detalhes do produto | `products.view` |
| PUT | `/api/products/{id}` | Atualiza produto (JSON) | `products.edit` |
| POST | `/api/products/{id}` | Atualiza produto (FormData) | `products.edit` |
| DELETE | `/api/products/{id}` | Exclui produto | `products.delete` |

### Categorias
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|-------------|
| GET | `/api/categories` | Lista todas as categorias | Não |

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais
- **`categories`** - Categorias de produtos
- **`products`** - Produtos com relacionamentos
- **`users`** - Usuários do sistema
- **`roles`** - Roles do sistema ACL
- **`permissions`** - Permissões granulares
- **`personal_access_tokens`** - Tokens Sanctum

### Relacionamentos
- `Product belongsTo Category`
- `User belongsToMany Role`
- `Role belongsToMany Permission`
- `User hasMany PersonalAccessToken`

## 🔧 Conceitos Avançados Implementados

### Backend - Laravel
- **Service Container** - Injeção de dependência automática
- **Middleware Pipeline** - Processamento em camadas de requests
- **Eloquent Relationships** - Relacionamentos complexos otimizados
- **API Resources** - Transformação consistente de dados
- **Form Requests** - Validação centralizada e reutilizável
- **ACL System** - Controle de acesso baseado em roles e permissions
- **File Upload** - Gerenciamento seguro de arquivos com validação
- **Database Indexing** - Otimização de performance com índices

### Frontend - Vue.js 3
- **Composition API** - Lógica reativa e reutilizável
- **Reactive State** - Estado reativo com Pinia
- **Component Composition** - Arquitetura baseada em composição
- **Route Guards** - Proteção automática de rotas
- **Error Boundaries** - Tratamento global de erros
- **Lazy Loading** - Carregamento sob demanda de componentes
- **TypeScript Integration** - Tipagem estática completa
- **Form Handling** - Suporte a JSON e FormData para uploads

## 📁 Estrutura do Projeto

```
INNYX-Challenge/
├── backend/                 # API Laravel 11
│   ├── app/
│   │   ├── Http/Controllers/    # Controladores da API
│   │   ├── Models/             # Modelos Eloquent
│   │   ├── Middleware/         # Middlewares customizados
│   │   └── Providers/          # Service Providers
│   ├── database/
│   │   ├── migrations/         # Migrações do banco
│   │   └── seeders/           # Seeders para dados iniciais
│   ├── routes/api.php         # Rotas da API RESTful
│   ├── config/               # Configurações do Laravel
│   └── Dockerfile           # Container otimizado multi-stage
├── frontend/               # Aplicação Vue.js 3 + TypeScript
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── views/            # Páginas da aplicação
│   │   ├── stores/           # Gerenciamento de estado (Pinia)
│   │   ├── services/         # Camada de serviços/API
│   │   ├── router/           # Configuração de rotas
│   │   ├── types/            # Definições TypeScript
│   │   └── assets/           # Recursos estáticos
│   ├── public/              # Arquivos públicos
│   ├── Dockerfile          # Container otimizado com Nginx
│   └── nginx.conf          # Configuração Nginx para produção
├── docker-compose.yml      # Orquestração dos containers
└── README.md              # Este arquivo
```

**URLs de Acesso:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **MySQL:** localhost:3306

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

## 📚 Documentação Técnica

- **Backend:** `backend/README.md` - Documentação completa da API
- **Frontend:** `frontend/README.md` - Guia de desenvolvimento frontend
- **Docker:** `OTIMIZACOES_DOCKER.md` - Otimizações e troubleshooting
- **API:** Endpoints documentados com exemplos de uso

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

## 🚀 Deploy e Produção

### Execução Simplificada
```bash
# Comando único para subir todo o sistema
docker-compose up -d --build
```

### Variáveis de Ambiente

**Backend (.env):**
```env
APP_NAME="INNYX Products"
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=innyx_challenge
DB_USERNAME=innyx_user
DB_PASSWORD=innyx_password
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME="INNYX Products"
```

### Otimizações Implementadas
- **Multi-stage builds** para reduzir tamanho das imagens
- **Cache de dependências** para builds mais rápidos
- **Nginx** otimizado para servir o frontend
- **Volume persistentes** para dados do banco
- **Health checks** para monitoramento automático

### Monitoramento
```bash
# Verificar status dos serviços
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Verificar saúde dos containers
docker-compose exec backend php artisan route:list
docker-compose exec frontend npm run build
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças seguindo [Conventional Commits](https://conventionalcommits.org/)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Commit
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎯 Status do Projeto

- ✅ **Backend:** Completo e funcional com Laravel 11
- ✅ **Frontend:** Completo e funcional com Vue.js 3 + TypeScript
- ✅ **Integração:** API RESTful totalmente integrada
- ✅ **Autenticação:** JWT + ACL implementado
- ✅ **Docker:** Otimizado para desenvolvimento e produção
- ✅ **Deploy:** Pronto para produção com um comando
- ✅ **Testes:** Cobertura de testes implementada
- ✅ **Documentação:** Completa e atualizada

**Desenvolvido com ❤️ por Felipe Dylan Mar Fernandes para o INNYX Challenge**