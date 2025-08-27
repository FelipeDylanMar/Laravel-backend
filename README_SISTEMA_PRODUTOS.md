# Sistema de Gerenciamento de Produtos

Sistema backend desenvolvido em Laravel para gerenciamento de produtos com autenticação por token.

## Funcionalidades

- **CRUD completo de produtos** com 5 endpoints REST
- **Listagem de categorias**
- **Autenticação por token** usando Laravel Sanctum
- **Upload de imagens** com validação
- **Paginação e busca** por nome/descrição
- **Relacionamento** entre produtos e categorias

## Tecnologias Utilizadas

- **Laravel 11** - Framework PHP
- **Laravel Sanctum** - Autenticação por token
- **MySQL/SQLite** - Banco de dados
- **PHP 8.2+** - Linguagem de programação

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

## Instalação e Configuração

### Pré-requisitos
- PHP 8.2 ou superior
- Composer
- MySQL ou SQLite
- Extensões PHP: pdo, pdo_mysql (ou pdo_sqlite)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd meu-projeto-laravel
   ```

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
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Execute as migrations**
   ```bash
   php artisan migrate
   ```

6. **Crie o diretório para imagens**
   ```bash
   mkdir public/images
   ```

## Execução

### Iniciar o servidor de desenvolvimento
```bash
php artisan serve
```

O servidor estará disponível em: `http://localhost:8000`

## Endpoints da API

### Base URL
```
http://localhost:8000/api
```

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