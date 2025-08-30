# 🚀 Backend API - Sistema de Gerenciamento de Produtos

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

API backend desenvolvida em Laravel 11 para o sistema de gerenciamento de produtos, containerizada com Docker para desenvolvimento e produção.

## ✨ Funcionalidades

- **CRUD completo de produtos** com validações robustas
- **Sistema de categorias** para organização
- **Autenticação Laravel Sanctum** com tokens Bearer
- **Upload de imagens** com validação de tipo e tamanho
- **Paginação e busca** avançada por nome/descrição
- **Relacionamentos** entre produtos e categorias
- **API RESTful** seguindo padrões de mercado

## 🐳 Execução com Docker (Recomendado)

### Pré-requisitos
- Docker Desktop
- Docker Compose

### Inicialização Rápida

```bash
# Na raiz do projeto
docker-compose up -d backend mysql

# Gerar chave da aplicação (primeira execução)
docker-compose exec backend php artisan key:generate

# Executar migrações
docker-compose exec backend php artisan migrate --seed
```

### Comandos Úteis

```bash
# Ver logs do backend
docker-compose logs -f backend

# Executar comandos Artisan
docker-compose exec backend php artisan migrate
docker-compose exec backend php artisan test
docker-compose exec backend php artisan tinker

# Acessar container
docker-compose exec backend bash
```

## 🔧 Execução Local (Alternativo)

### Pré-requisitos
- PHP 8.2+
- Composer
- MySQL ou SQLite

### Instalação

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## 🌐 Endpoints da API

**Base URL:** `http://localhost:8000/api`

### Categorias (Público)
```http
GET /api/categories
```

### Produtos (Autenticado)
```http
GET    /api/products           # Listar com paginação/busca
POST   /api/products           # Criar produto
GET    /api/products/{id}      # Visualizar produto
PUT    /api/products/{id}      # Atualizar produto
DELETE /api/products/{id}      # Excluir produto
```

### Autenticação
**Credenciais de teste:**
- Email: `teste@exemplo.com`
- Senha: `123456`

**Gerar token:**
```bash
docker-compose exec backend php artisan tinker
# No tinker:
$user = App\Models\User::where('email', 'teste@exemplo.com')->first();
$token = $user->createToken('test-token')->plainTextToken;
echo $token;
```

## 🗄️ Banco de Dados

### Estrutura
- **categories** - Categorias de produtos
- **products** - Produtos com relacionamento
- **users** - Usuários do sistema
- **personal_access_tokens** - Tokens Sanctum

### Configuração Docker
- **Host:** `mysql` (interno) / `localhost` (externo)
- **Porta:** `3306`
- **Database:** `innyx_db`
- **Usuário:** `innyx_user`
- **Senha:** `innyx_password`

## 🧪 Testes

```bash
# Com Docker
docker-compose exec backend php artisan test

# Localmente
php artisan test
```

## 📁 Estrutura do Projeto

```
backend/
├── app/
│   ├── Http/Controllers/     # Controllers da API
│   ├── Models/              # Models Eloquent
│   └── Providers/           # Service Providers
├── database/
│   ├── migrations/          # Migrações do banco
│   ├── seeders/            # Seeders de dados
│   └── mysql.cnf           # Configurações MySQL otimizadas
├── routes/
│   └── api.php             # Rotas da API
├── storage/
│   └── app/public/images/  # Upload de imagens
├── Dockerfile              # Container otimizado multi-stage
├── .env.docker            # Configurações para Docker
└── README_SISTEMA_PRODUTOS.md # Documentação detalhada
```

## 🚀 Otimizações Docker

- **Multi-stage build** para reduzir tamanho da imagem
- **Cache de dependências** Composer para builds rápidos
- **Configurações MySQL** otimizadas para performance
- **Volumes persistentes** para dados e uploads
- **Health checks** para monitoramento

## 📚 Documentação Adicional

- **Sistema Completo:** `README_SISTEMA_PRODUTOS.md`
- **Projeto Geral:** `README_PROJETO.md`
- **Otimizações Docker:** `../OTIMIZACOES_DOCKER.md`

## 📄 Licença

Este projeto é parte do INNYX Challenge e utiliza o framework Laravel sob licença MIT.
