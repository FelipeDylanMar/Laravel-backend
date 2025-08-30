# Sistema de Gerenciamento de Produtos - Backend

API backend desenvolvida em Laravel para gerenciamento de produtos com autenticação por token.

> **Nota:** Este é o backend do projeto. O projeto completo está estruturado com backend e frontend separados na pasta raiz.

## Funcionalidades

- **CRUD completo de produtos** com 5 endpoints REST
- **Listagem de categorias**
- **Autenticação por token** usando Laravel Sanctum
- **Upload de imagens** com validação
- **Paginação e busca** por nome/descrição
- **Relacionamento** entre produtos e categorias

## 🛠️ Tecnologias Utilizadas

- **Laravel 11** - Framework PHP
- **Laravel Sanctum** - Autenticação por token
- **MySQL 8.0** - Banco de dados (Docker)
- **SQLite** - Banco de dados (desenvolvimento local)
- **PHP 8.2+** - Linguagem de programação
- **Docker & Docker Compose** - Containerização

## 📋 Requisitos do Sistema

### 🐳 Com Docker (Recomendado)
- **Docker Desktop** - Versão mais recente
- **Docker Compose** - Incluído no Docker Desktop
- **Memória:** Mínimo 2GB RAM
- **Espaço em disco:** 500MB livres

### 🔧 Desenvolvimento Local
- **PHP:** 8.2 ou superior
- **Composer:** Para gerenciamento de dependências
- **MySQL:** 8.0+ ou SQLite
- **Memória:** Mínimo 512MB RAM
- **Espaço em disco:** 100MB livres
- **Extensões PHP necessárias:**
- `pdo_sqlite` ou `pdo_mysql`
- `mbstring`
- `json`
- `openssl`
- `fileinfo` (para upload de imagens)

## Estrutura do Banco de Dados

### Tabela Categories
- `id` (Primary Key)
- `nome` (String, máximo 100 caracteres)
- `created_at`, `updated_at`

### Tabela Products
- `id` (Primary Key)
- `nome` (String, máximo 50 caracteres)
- `descricao` (String, máximo 200 caracteres)
- `preco` (Double, positivo)
- `data_validade` (Date, deve ser futura)
- `imagem` (String, nullable)
- `categoria_id` (Foreign Key para categories)
- `created_at`, `updated_at`

## 🚀 Instalação e Configuração

### 🐳 Com Docker (Recomendado)

#### Pré-requisitos
- Docker Desktop
- Docker Compose

#### Passos de Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd INNYX-Challange
   ```

2. **Inicie os serviços:**
   ```bash
   docker-compose up -d backend mysql
   ```

3. **Configure a aplicação (primeira execução):**
   ```bash
   docker-compose exec backend php artisan key:generate
   docker-compose exec backend php artisan migrate --seed
   docker-compose exec backend php artisan storage:link
   ```

4. **Acesse a aplicação:**
   - Backend API: http://localhost:8000
   - MySQL: localhost:3306

### 🔧 Desenvolvimento Local (Alternativo)

#### Pré-requisitos
- PHP 8.2 ou superior
- Composer
- MySQL ou SQLite
- Extensões PHP: pdo, pdo_mysql (ou pdo_sqlite)

#### Passos de Instalação

1. **Clone o repositório e navegue para o backend**
   ```bash
   git clone <url-do-repositorio>
   cd INNYX-Challange/backend
   ```

   > **Nota:** Certifique-se de que todas as extensões PHP necessárias estão habilitadas antes de prosseguir.

2. **Instale as dependências**
   ```bash
   composer install
   ```

3. **Configure o ambiente**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure o banco de dados no arquivo .env**
   ```env
   # Para SQLite
   DB_CONNECTION=sqlite
   DB_DATABASE=/caminho/absoluto/para/database/database.sqlite
   
   # Para MySQL
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=innyx_db
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   ```

5. **Execute as migrations**
   ```bash
   php artisan migrate --seed
   ```

6. **Crie o diretório para imagens**
   ```bash
   mkdir -p storage/app/public/products
   php artisan storage:link
   ```

## Estrutura do Projeto

Este backend faz parte de um projeto full-stack organizado da seguinte forma:

```
INNYX-Challange/
├── backend/          # API Laravel (este diretório)
├── frontend/         # Aplicação Vue.js 3
├── .gitignore        # Configurações do Git
└── README.md         # Documentação principal
```

### Integração com Frontend
- O backend fornece uma API REST para o frontend Vue.js
- Autenticação via Laravel Sanctum com tokens Bearer
- CORS configurado para permitir requisições do frontend
- Endpoints padronizados seguindo convenções REST

## Execução

### Executando o Servidor de Desenvolvimento

**Com Docker:**
```bash
docker-compose up -d backend
```

**Localmente:**
```bash
php artisan serve
```

A API estará disponível em: `http://localhost:8000`

### Para desenvolvimento com frontend
```bash
# Terminal 1 - Backend
cd backend
php artisan serve

# Terminal 2 - Frontend (quando implementado)
cd frontend
npm run dev
```

## Endpoints da API

### 🧪 Testando os Endpoints

**Base URL:** `http://localhost:8000/api`

### Categorias

#### Listar todas as categorias
```http
GET /api/categories
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Eletrônicos",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
]
```

### Produtos (Requer Autenticação)

**Nota:** Todos os endpoints de produtos requerem autenticação via token Bearer.

#### Listar produtos (com paginação e busca)
```http
GET /api/products
GET /api/products?search=termo
GET /api/products?page=2
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "nome": "Smartphone",
      "descricao": "Smartphone Android",
      "preco": 899.99,
      "data_validade": "2025-12-31",
      "imagem": "1640995200.jpg",
      "categoria_id": 1,
      "category": {
        "id": 1,
        "nome": "Eletrônicos"
      }
    }
  ],
  "current_page": 1,
  "per_page": 10,
  "total": 1
}
```

#### Criar produto
```http
POST /api/products
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Body (form-data):**
```
nome: "Produto Teste"
descricao: "Descrição do produto"
preco: 99.99
data_validade: "2025-12-31"
categoria_id: 1
imagem: [arquivo de imagem]
```

#### Visualizar produto específico
```http
GET /api/products/{id}
```

#### Atualizar produto
```http
PUT /api/products/{id}
```

**Body (JSON):**
```json
{
  "nome": "Produto Atualizado",
  "descricao": "Nova descrição",
  "preco": 149.99,
  "data_validade": "2025-12-31",
  "categoria_id": 1
}
```

#### Deletar produto
```http
DELETE /api/products/{id}
```

## Validações

### Produto
- **nome**: obrigatório, string, máximo 50 caracteres
- **descricao**: obrigatório, string, máximo 200 caracteres
- **preco**: obrigatório, numérico, mínimo 0.01
- **data_validade**: obrigatório, data, deve ser futura
- **categoria_id**: obrigatório, deve existir na tabela categories
- **imagem**: opcional, arquivo de imagem (jpeg, png, jpg, gif), máximo 2MB

## Autenticação

O sistema utiliza Laravel Sanctum para autenticação por token. Para acessar os endpoints protegidos:

1. **Obtenha um token** (implementação específica do projeto)
2. **Inclua o token no header** de todas as requisições:
   ```
   Authorization: Bearer {seu-token}
   ```

## Upload de Imagens

- As imagens são armazenadas em `public/images/`
- Nome único gerado automaticamente (timestamp + extensão)
- Formatos aceitos: jpeg, png, jpg, gif
- Tamanho máximo: 2MB
- Imagem anterior é removida ao atualizar produto

## Estrutura de Arquivos

```
app/
├── Http/Controllers/
│   ├── ProductController.php    # CRUD de produtos
│   └── CategoryController.php   # Listagem de categorias
├── Models/
│   ├── Product.php             # Model do produto
│   ├── Category.php            # Model da categoria
│   └── User.php                # Model do usuário (com Sanctum)
database/
├── migrations/
│   ├── create_categories_table.php
│   ├── create_products_table.php
│   └── create_personal_access_tokens_table.php
routes/
└── api.php                     # Rotas da API
public/
└── images/                     # Diretório para upload de imagens
```

## Comandos Úteis

```bash
# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Verificar rotas
php artisan route:list

# Executar testes
php artisan test

# Gerar documentação da API
php artisan route:list --columns=Method,URI,Name
```

## Troubleshooting

### Erro "could not find driver"
- Verifique se as extensões PDO estão instaladas no PHP
- Para MySQL: `php-pdo-mysql`
- Para SQLite: `php-pdo-sqlite`

### Erro de permissão em imagens
- Verifique se o diretório `public/images` existe e tem permissões de escrita

### Erro 419 (CSRF)
- Para APIs, o CSRF está desabilitado nas rotas `/api/*`
- Certifique-se de usar as rotas corretas com prefixo `/api/`

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.