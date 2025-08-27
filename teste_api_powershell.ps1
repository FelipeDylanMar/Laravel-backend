# Script PowerShell para testar API Laravel
# Execute com: powershell -ExecutionPolicy Bypass -File teste_api_powershell.ps1

Write-Host "=== Testando API Laravel com PowerShell ===" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://127.0.0.1:8000/api"

# Funcao para testar endpoints
function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = $null,
        [string]$Description
    )
    
    Write-Host "Testando: $Description" -ForegroundColor Yellow
    Write-Host "   URL: $Url"
    Write-Host "   Metodo: $Method"
    
    try {
        if ($Body) {
            $jsonBody = $Body | ConvertTo-Json
            Write-Host "   Body: $jsonBody"
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Body $jsonBody -ContentType "application/json"
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method
        }
        
        Write-Host "   Sucesso!" -ForegroundColor Green
        Write-Host "   Resposta:" -ForegroundColor Cyan
        $response | ConvertTo-Json -Depth 3 | Write-Host
        Write-Host ""
        return $true
    }
    catch {
        Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

# Verificar se o servidor esta rodando
Write-Host "1. Verificando se o servidor Laravel esta rodando..." -ForegroundColor Blue
try {
    $healthCheck = Invoke-RestMethod -Uri "http://127.0.0.1:8000" -TimeoutSec 5
    Write-Host "   Servidor Laravel esta rodando!" -ForegroundColor Green
} catch {
    Write-Host "   Servidor nao esta rodando!" -ForegroundColor Red
    Write-Host "   Execute: D:\php\php.exe artisan serve" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Testes das rotas de API
Write-Host "2. Executando testes das rotas de API..." -ForegroundColor Blue
Write-Host ""

# Teste 1: Rota de teste simples
$test1 = Test-Endpoint -Url "$baseUrl/teste" -Description "Rota de teste simples"

# Teste 2: Listar usuarios
$test2 = Test-Endpoint -Url "$baseUrl/usuarios" -Description "Listar todos os usuarios"

# Teste 3: Buscar usuario especifico
$test3 = Test-Endpoint -Url "$baseUrl/usuarios/1" -Description "Buscar usuario ID 1"

# Teste 4: Buscar usuario inexistente
$test4 = Test-Endpoint -Url "$baseUrl/usuarios/999" -Description "Buscar usuario inexistente (deve retornar 404)"

# Teste 5: Criar novo usuario
$novoUsuario = @{
    nome = "Ana Oliveira"
    email = "ana@email.com"
}
$test5 = Test-Endpoint -Url "$baseUrl/usuarios" -Method "POST" -Body $novoUsuario -Description "Criar novo usuario"

# Resumo dos testes
Write-Host "=== Resumo dos Testes ===" -ForegroundColor Green
$totalTestes = 5
$testesPassaram = @($test1, $test2, $test3, $test4, $test5) | Where-Object { $_ -eq $true } | Measure-Object | Select-Object -ExpandProperty Count

Write-Host "Total de testes: $totalTestes"
Write-Host "Testes que passaram: $testesPassaram" -ForegroundColor Green
Write-Host "Testes que falharam: $($totalTestes - $testesPassaram)" -ForegroundColor Red

if ($testesPassaram -eq $totalTestes) {
    Write-Host "Todos os testes passaram! Sua API esta funcionando corretamente." -ForegroundColor Green
} else {
    Write-Host "Alguns testes falharam. Verifique se o servidor esta rodando e as rotas estao configuradas." -ForegroundColor Yellow
}

Write-Host "Proximos passos para testes mais avancados:"
Write-Host "1. Instale Postman ou Insomnia para testes visuais"
Write-Host "2. Configure banco de dados para testes com dados reais"
Write-Host "3. Implemente autenticacao e teste rotas protegidas"
Write-Host "4. Escreva testes automatizados com PHPUnit"
Write-Host "5. Configure CI/CD para execucao automatica de testes"

Write-Host "=== Fim dos Testes ===" -ForegroundColor Green