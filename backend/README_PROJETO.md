# 🚀 Laravel Backend - Projeto INNYX Challenge

## 📋 Sobre o Projeto

Este é um sistema completo de gerenciamento de produtos desenvolvido em Laravel 11 como parte do INNYX Challenge. O sistema inclui autenticação por token, CRUD completo de produtos, categorias e upload de imagens, containerizado com Docker para desenvolvimento e produção.

## ✨ Características

- **Laravel 11** - Framework PHP moderno
- **Sistema de Produtos** - CRUD completo com validações
- **Autenticação Sanctum** - Proteção por token Bearer
- **Upload de Imagens** - Sistema completo de upload
- **Banco SQLite** - Configurado e funcionando
- **API RESTful** - Endpoints completos para produtos e categorias
- **Relacionamentos** - Produtos vinculados a categorias
- **Paginação e Busca** - Sistema avançado de listagem

## 🗄️ Banco de Dados

### Configuração Docker (Recomendado)
- **Tipo:** MySQL 8.0
- **Host:** `mysql` (interno) / `localhost:3306` (externo)
- **Database:** `innyx_db`
- **Usuário:** `innyx_user`
- **Senha:** `innyx_password`
- **Status:** ✅ Configurado e funcionando

### Configuração Local (Alternativo)
- **Tipo:** SQLite
- **Localização:** `database/database.sqlite`
- **Status:** ✅ Configurado e funcionando

### Tabelas Criadas
- **categories** - Categorias de produtos
- **products** - Produtos com relacionamento
- **users** - Usuários do sistema
- **personal_access_tokens** - Tokens de autenticação Sanctum

### Dados de Exemplo
- 3 categorias pré-cadastradas
- 1 usuário de teste para autenticação

## 🚀 Como Usar

### 🐳 Com Docker (Recomendado)

#### Pré-requisitos
- Docker Desktop
- Docker Compose

#### Instalação

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
   ```

### 🔧 Desenvolvimento Local (Alternativo)

#### Pré-requisitos
- PHP 8.2 ou superior
- Composer
- MySQL ou SQLite

#### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd INNYX-Challange/backend
   ```

2. **Instale as dependências:**
   ```bash
   composer install
   ```

3. **Configure o ambiente:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   ```

4. **Inicie o servidor:**
   ```bash
   php artisan serve
   ```

### 🧪 Testando a API

**Base URL:** `http://localhost:8000/api`

**Endpoints disponíveis:**

```bash
# Listar categorias (público)
GET http://localhost:8000/api/categories

# Listar produtos (requer autenticação)
GET http://localhost:8000/api/products
Headers: Authorization: Bearer {token}

# Criar produto (requer autenticação)
POST http://localhost:8000/api/products
Headers: Authorization: Bearer {token}

# Ver produto específico
GET http://localhost:8000/api/products/{id}

# Atualizar produto
PUT http://localhost:8000/api/products/{id}

# Deletar produto
DELETE http://localhost:8000/api/products/{id}
```

**Credenciais de teste:**
- Email: `teste@exemplo.com`
- Senha: `123456`

**Como obter token de autenticação:**

Para testar os endpoints protegidos, você pode gerar um token manualmente:

**Com Docker:**
```bash
docker-compose exec backend php artisan tinker

# No tinker, execute:
$user = App\Models\User::where('email', 'teste@exemplo.com')->first();
$token = $user->createToken('test-token')->plainTextToken;
echo $token;
```

**Localmente:**
```bash
php artisan tinker

# No tinker, execute:
$user = App\Models\User::where('email', 'teste@exemplo.com')->first();
$token = $user->createToken('test-token')->plainTextToken;
echo $token;
```

**Usando o token:**
```bash
GET http://localhost:8000/api/products
Authorization: Bearer {token_gerado_acima}
```

## 📁 Estrutura do Projeto

```
meu-projeto-laravel/
├── app/                    # Código da aplicação
│   ├── Http/              # Controllers e Middleware
│   ├── Models/            # Models Eloquent
│   └── Providers/         # Service Providers
├── bootstrap/             # Arquivos de inicialização
│   ├── app.php           # Configuração da aplicação
│   └── mb_functions.php  # Funções mb_* alternativas
├── config/                # Arquivos de configuração
├── routes/                # Definição de rotas
│   ├── api.php           # Rotas da API
│   └── web.php           # Rotas web
├── storage/               # Arquivos de armazenamento
├── tests/                 # Testes automatizados
└── CORREÇÕES_REALIZADAS.md # Documentação das correções
```

## 🔍 Arquivos de Teste

- `manual_test.php` - Teste manual completo do Laravel
- `teste_simples.php` - Teste básico sem dependências
- `exemplo_teste_api.php` - Exemplo de teste de API
- `teste_api_powershell.ps1` - Script PowerShell para testes

## 📊 Status do Projeto

✅ **Funcionando:**
- Servidor Laravel na porta 8000
- Sistema completo de produtos e categorias
- Autenticação Laravel Sanctum
- Banco de dados SQLite com migrations
- Upload de imagens
- Validações completas
- Relacionamentos entre tabelas
- Paginação e busca
- 3 categorias pré-cadastradas
- Usuário de teste criado

✅ **Extensões PHP Habilitadas:**
- `pdo_sqlite` - Banco de dados
- `mbstring` - Manipulação de strings
- `json` - Processamento JSON
- `openssl` - Criptografia
- `fileinfo` - Upload de arquivos

## 🛠️ Próximos Passos

### Para Produção:
1. Migrar para MySQL/PostgreSQL
2. Configurar storage em nuvem para imagens
3. Implementar cache Redis/Memcached
4. Adicionar rate limiting
5. Configurar HTTPS

### Para Desenvolvimento:
1. Implementar testes unitários completos
2. Adicionar middleware de CORS
3. Configurar CI/CD
4. Documentação OpenAPI/Swagger
5. Sistema de logs avançado

## 📝 Logs e Debugging

- **Logs:** `storage/logs/laravel.log`
- **Configuração:** Verificar `.env` e `config/`
- **Debug:** Ativar `APP_DEBUG=true` no `.env`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Projeto:** INNYX Challenge
- **Versão:** 1.0.0
- **Laravel:** 11.x
- **PHP:** 8.1+

---

**Desenvolvido com ❤️ para o INNYX Challenge**