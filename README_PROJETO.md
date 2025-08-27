# 🚀 Laravel Backend - Projeto INNYX Challenge

## 📋 Sobre o Projeto

Este é um projeto Laravel 11 desenvolvido como parte do INNYX Challenge. O projeto foi criado e configurado para funcionar mesmo em ambientes com extensões PHP limitadas, incluindo soluções para problemas comuns de configuração.

## ✨ Características

- **Laravel 11** - Framework PHP moderno
- **API RESTful** - Endpoints funcionais para testes
- **Compatibilidade** - Funciona sem extensões `mbstring`, `sqlite`, `curl`
- **Configuração Flexível** - Drivers alternativos para sessão, cache e queue
- **Testes Incluídos** - Scripts de teste em PHP e PowerShell

## 🔧 Correções Implementadas

### 1. Problema: Driver SQLite não encontrado
**Solução:**
- Configuração de driver `null` para banco de dados
- Drivers alternativos (`file`, `sync`) para sessão, cache e queue
- Desabilitação temporária da conexão SQLite

### 2. Problema: Extensão mbstring ausente
**Solução:**
- Implementação de funções `mb_*` alternativas
- Carregamento automático no bootstrap da aplicação
- Compatibilidade total sem a extensão nativa

### 3. Problema: Rotas de API não carregadas
**Solução:**
- Configuração adequada do roteamento no `bootstrap/app.php`
- Rotas de API totalmente funcionais

## 🚀 Como Usar

### Pré-requisitos
- PHP 8.1 ou superior
- Composer

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd meu-projeto-laravel
   ```

2. **Instale as dependências:**
   ```bash
   composer install
   ```

3. **Configure o ambiente:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Inicie o servidor:**
   ```bash
   php artisan serve
   ```

### 🧪 Testando a API

**Endpoints disponíveis:**

```bash
# Teste básico
GET http://127.0.0.1:8000/api/teste

# Status do sistema
GET http://127.0.0.1:8000/api/status

# Lista de usuários (simulados)
GET http://127.0.0.1:8000/api/usuarios

# Informações da requisição
GET http://127.0.0.1:8000/api/request-info
```

**Usando PowerShell:**
```powershell
# Teste básico
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/teste" -Method GET

# Status do sistema
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/status" -Method GET
```

**Usando cURL:**
```bash
# Teste básico
curl http://127.0.0.1:8000/api/teste

# Status do sistema
curl http://127.0.0.1:8000/api/status
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
- Todas as rotas de API
- Funções mb_* implementadas
- Configuração sem SQLite

⚠️ **Limitações:**
- Extensões PHP ausentes: `mbstring`, `sqlite3`, `curl`
- Testes unitários requerem extensões adicionais
- Rotas POST podem ter problemas com CSRF

## 🛠️ Próximos Passos

### Para Produção:
1. Instalar extensões PHP necessárias
2. Configurar banco de dados real (MySQL/PostgreSQL)
3. Implementar autenticação e autorização
4. Configurar cache Redis/Memcached

### Para Desenvolvimento:
1. Configurar ambiente com todas as extensões
2. Implementar testes unitários completos
3. Adicionar middleware de CORS
4. Configurar CI/CD

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