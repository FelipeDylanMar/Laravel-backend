# 🚀 Otimizações Docker - INNYX Challenge

## 📋 Resumo das Melhorias Implementadas

Este documento descreve as otimizações implementadas para melhorar significativamente a performance da aplicação Docker.

## 🔧 Principais Otimizações

### 1. **Multi-Stage Builds**
- **Backend**: Separação em stages (base, dependencies, development, production)
- **Frontend**: Stages otimizados com cache de node_modules e build de produção
- **Benefício**: Redução do tamanho das imagens e melhor cache de layers

### 2. **Volumes Nomeados**
- `backend_vendor`: Cache do Composer
- `backend_storage`: Persistência de storage do Laravel
- `frontend_node_modules`: Cache do npm
- `frontend_dist`: Cache de build
- **Benefício**: Evita reinstalação de dependências a cada rebuild

### 3. **Configurações de Performance**
- **MySQL**: Buffer pool otimizado (256M), configurações InnoDB
- **Containers**: Limites de memória e CPU definidos
- **Health checks**: Verificação automática de saúde dos serviços

### 4. **Imagens Alpine**
- Backend: `php:8.2-fpm-alpine` (menor e mais rápida)
- Frontend: `node:20-alpine` (redução significativa de tamanho)
- **Benefício**: Inicialização mais rápida e menor uso de recursos

## 🚀 Como Usar

### Método Rápido (Recomendado)
```powershell
# Execute o script de inicialização otimizado
.\dev-start.ps1
```

### Método Manual
```bash
# Parar containers existentes
docker-compose down

# Construir com cache otimizado
docker-compose build --parallel

# Iniciar serviços
docker-compose up -d

# Aguardar MySQL e executar migrações
docker-compose exec backend php artisan migrate
```

## 📊 Melhorias de Performance Esperadas

| Aspecto | Antes | Depois | Melhoria |
|---------|-------|--------|---------|
| Tempo de build inicial | ~5-8 min | ~2-3 min | **60-70%** |
| Rebuild após mudanças | ~3-5 min | ~30-60s | **80-90%** |
| Uso de memória | ~2-3 GB | ~1-1.5 GB | **40-50%** |
| Tempo de inicialização | ~2-3 min | ~30-60s | **70-80%** |

## 🔍 Detalhes Técnicos

### Backend (Laravel)
- **Base**: PHP 8.2 FPM Alpine
- **Cache**: Composer dependencies em volume separado
- **Otimizações**: Autoloader otimizado, cache de configuração
- **Produção**: Route cache, view cache, config cache

### Frontend (Vue.js)
- **Base**: Node 20 Alpine
- **Cache**: node_modules em volume separado
- **Desenvolvimento**: Hot reload otimizado
- **Produção**: Build estático servido via Nginx

### Banco de Dados (MySQL)
- **Buffer Pool**: 256MB para melhor cache
- **InnoDB**: Configurações otimizadas para desenvolvimento
- **Health Check**: Verificação automática de disponibilidade

## 🛠️ Comandos Úteis

```bash
# Ver logs em tempo real
docker-compose logs -f

# Rebuild apenas um serviço
docker-compose build backend
docker-compose up -d backend

# Limpar cache Docker (se necessário)
docker system prune -a

# Ver uso de recursos
docker stats

# Executar comandos no backend
docker-compose exec backend php artisan tinker

# Executar comandos no frontend
docker-compose exec frontend npm run build
```

## 🚨 Troubleshooting

### Problema: Containers lentos para iniciar
**Solução**: Verifique se o WSL2 está habilitado (Windows) ou se há recursos suficientes

### Problema: Erro de permissão no Laravel
**Solução**: 
```bash
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```

### Problema: node_modules não encontrado
**Solução**: 
```bash
docker-compose down
docker volume rm innyx-challenge_frontend_node_modules
docker-compose up -d frontend
```

## 📈 Monitoramento

Para monitorar a performance:

```bash
# Ver uso de recursos em tempo real
docker stats

# Ver logs de performance do MySQL
docker-compose exec mysql tail -f /var/log/mysql/slow.log

# Verificar health checks
docker-compose ps
```

---

**💡 Dica**: Para máxima performance, mantenha os volumes nomeados e evite reconstruir as imagens desnecessariamente. Use `docker-compose up -d` para mudanças no código.