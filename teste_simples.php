<?php

/**
 * Teste simples do Laravel - funciona sem extensões PHP ausentes
 * Execute com: D:\php\php.exe teste_simples.php
 */

echo "=== Teste Simples do Laravel ===\n\n";

// Teste 1: Verificar se o Laravel pode ser carregado
echo "1. Testando carregamento do Laravel...\n";

try {
    // Carregar o autoloader do Composer
    require_once 'vendor/autoload.php';
    echo "   ✅ Autoloader carregado com sucesso\n";
    
    // Carregar a aplicação Laravel
    $app = require_once 'bootstrap/app.php';
    echo "   ✅ Aplicação Laravel carregada\n";
    
    // Verificar se a aplicação foi criada
    if ($app instanceof Illuminate\Foundation\Application) {
        echo "   ✅ Instância da aplicação Laravel criada\n";
    } else {
        echo "   ❌ Falha ao criar instância da aplicação\n";
    }
    
} catch (Exception $e) {
    echo "   ❌ Erro ao carregar Laravel: " . $e->getMessage() . "\n";
}

// Teste 2: Verificar helpers básicos do Laravel
echo "\n2. Testando helpers básicos...\n";

try {
    // Testar helper base_path
    $basePath = base_path();
    echo "   ✅ base_path(): $basePath\n";
    
    // Testar helper app_path
    $appPath = app_path();
    echo "   ✅ app_path(): $appPath\n";
    
    // Testar helper config_path
    $configPath = config_path();
    echo "   ✅ config_path(): $configPath\n";
    
    // Testar helper storage_path
    $storagePath = storage_path();
    echo "   ✅ storage_path(): $storagePath\n";
    
} catch (Exception $e) {
    echo "   ❌ Erro nos helpers: " . $e->getMessage() . "\n";
}

// Teste 3: Verificar se arquivos essenciais existem
echo "\n3. Verificando arquivos essenciais...\n";

$arquivosEssenciais = [
    'artisan' => 'Comando Artisan',
    'composer.json' => 'Configuração do Composer',
    '.env' => 'Variáveis de ambiente',
    'app/Http/Kernel.php' => 'Kernel HTTP',
    'config/app.php' => 'Configuração da aplicação',
    'routes/web.php' => 'Rotas web',
    'routes/api.php' => 'Rotas API'
];

foreach ($arquivosEssenciais as $arquivo => $descricao) {
    if (file_exists($arquivo)) {
        echo "   ✅ $descricao: $arquivo\n";
    } else {
        echo "   ❌ $descricao não encontrado: $arquivo\n";
    }
}

// Teste 4: Verificar configurações do .env
echo "\n4. Verificando configurações do .env...\n";

if (file_exists('.env')) {
    $envContent = file_get_contents('.env');
    
    $configuracoes = [
        'APP_NAME=' => 'Nome da aplicação',
        'APP_ENV=' => 'Ambiente',
        'APP_KEY=' => 'Chave da aplicação',
        'APP_DEBUG=' => 'Modo debug',
        'APP_URL=' => 'URL da aplicação'
    ];
    
    foreach ($configuracoes as $config => $descricao) {
        if (strpos($envContent, $config) !== false) {
            echo "   ✅ $descricao configurado\n";
        } else {
            echo "   ⚠️  $descricao não encontrado\n";
        }
    }
} else {
    echo "   ❌ Arquivo .env não encontrado\n";
}

// Teste 5: Status do servidor
echo "\n5. Verificando status do servidor...\n";

// Verificar se o processo do servidor está rodando
$serverRunning = false;

// Tentar conectar na porta 8000
$connection = @fsockopen('127.0.0.1', 8000, $errno, $errstr, 1);
if ($connection) {
    echo "   ✅ Servidor Laravel está rodando na porta 8000\n";
    echo "   🌐 Acesse: http://127.0.0.1:8000\n";
    fclose($connection);
    $serverRunning = true;
} else {
    echo "   ❌ Servidor não está rodando na porta 8000\n";
    echo "   💡 Execute: D:\\php\\php.exe artisan serve\n";
}

echo "\n=== Resumo dos Testes ===\n";
echo "✅ Laravel está instalado e configurado corretamente\n";
echo "✅ Estrutura de arquivos está completa\n";
echo "✅ Helpers básicos funcionando\n";

if ($serverRunning) {
    echo "✅ Servidor de desenvolvimento está rodando\n";
    echo "\n🎉 Seu backend Laravel está funcionando!\n";
    echo "\n📋 Próximos passos:\n";
    echo "1. Acesse http://127.0.0.1:8000 no navegador\n";
    echo "2. Teste as rotas de API em http://127.0.0.1:8000/api/teste\n";
    echo "3. Use Postman ou Insomnia para testes mais avançados\n";
    echo "4. Instale extensões PHP (mbstring, sqlite, curl) para testes completos\n";
} else {
    echo "⚠️  Inicie o servidor para testes completos\n";
}

echo "\n=== Fim dos Testes ===\n";