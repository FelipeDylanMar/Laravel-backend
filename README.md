# Sistema de Gerenciamento de Produtos

Sistema completo de gerenciamento de produtos com backend Laravel e frontend Vue.js 3.

## 📁 Estrutura do Projeto

```
INNYX-Challange/
├── backend/          # API Laravel 9+ com PHP 8+
├── frontend/         # Aplicação Vue.js 3 com TypeScript
├── .gitignore        # Configurações do Git
└── README.md         # Este arquivo
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

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

**Servidor:** http://127.0.0.1:8000

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

```bash
cd frontend
# Comandos serão adicionados após setup inicial
```

## 🔧 Desenvolvimento

### Pré-requisitos
- **PHP 8+**
- **Composer**
- **Node.js 16+**
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
   # Comandos serão adicionados
   ```

## 📚 Documentação

- **Backend:** Consulte `backend/README_SISTEMA_PRODUTOS.md`
- **API:** Documentação dos endpoints disponível no backend
- **Frontend:** Documentação será adicionada após implementação

## 🧪 Testes

### Backend
```bash
cd backend
php artisan test
```

### Frontend
```bash
cd frontend
# Comandos de teste serão adicionados
```

## 🚀 Deploy

Instruções de deploy serão adicionadas após conclusão do desenvolvimento.

## 📄 Licença

Este projeto é parte de um desafio técnico.

---

**Status do Projeto:**
- ✅ Backend: Completo e funcional
- 🚧 Frontend: Em desenvolvimento
- 🚧 Integração: Pendente
- 🚧 Deploy: Pendente