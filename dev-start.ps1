#!/usr/bin/env pwsh

# Script de inicialização otimizado para desenvolvimento
Write-Host "🚀 Iniciando ambiente de desenvolvimento INNYX Challenge..." -ForegroundColor Green

# Verificar se Docker está rodando
if (!(Get-Process "Docker Desktop" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Desktop não está rodando. Por favor, inicie o Docker Desktop primeiro." -ForegroundColor Red
    exit 1
}

# Parar containers existentes
Write-Host "🛑 Parando containers existentes..." -ForegroundColor Yellow
docker-compose down

# Limpar volumes órfãos (opcional)
$cleanVolumes = Read-Host "Deseja limpar volumes órfãos? (y/N)"
if ($cleanVolumes -eq "y" -or $cleanVolumes -eq "Y") {
    Write-Host "🧹 Limpando volumes órfãos..." -ForegroundColor Yellow
    docker volume prune -f
}

# Construir imagens
Write-Host "🔨 Construindo imagens otimizadas..." -ForegroundColor Blue
docker-compose build --parallel

# Iniciar serviços
Write-Host "🚀 Iniciando serviços..." -ForegroundColor Green
docker-compose up -d

# Aguardar MySQL estar pronto
Write-Host "⏳ Aguardando MySQL estar pronto..." -ForegroundColor Yellow
do {
    Start-Sleep -Seconds 2
    $mysqlStatus = docker-compose exec -T mysql mysqladmin ping -h localhost -u root -ppassword 2>$null
} while ($LASTEXITCODE -ne 0)

Write-Host "✅ MySQL está pronto!" -ForegroundColor Green

# Executar migrações
Write-Host "📊 Executando migrações do banco..." -ForegroundColor Blue
docker-compose exec backend php artisan migrate --force

# Executar seeders (opcional)
$runSeeders = Read-Host "Deseja executar os seeders? (y/N)"
if ($runSeeders -eq "y" -or $runSeeders -eq "Y") {
    Write-Host "🌱 Executando seeders..." -ForegroundColor Blue
    docker-compose exec backend php artisan db:seed --force
}

# Mostrar status dos containers
Write-Host "📋 Status dos containers:" -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "🎉 Ambiente iniciado com sucesso!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "🗄️  MySQL: localhost:3306" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para ver os logs: docker-compose logs -f" -ForegroundColor Yellow
Write-Host "Para parar: docker-compose down" -ForegroundColor Yellow