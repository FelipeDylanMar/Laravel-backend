<?php

/**
 * Testes manuais simples para Laravel
 * Execute com: D:\php\php.exe manual_test.php
 */

echo "=== Testes Manuais do Laravel ===\n\n";

// Teste 1: Verificar estrutura de arquivos
echo "1. Verificando estrutura de arquivos...\n";

$requiredFiles = [
    'artisan' => 'Arquivo artisan',
    'composer.json' => 'Configuração do Composer',
    '.env' => 'Arquivo de ambiente',
    'app/Http/Controllers' => 'Diretório de Controllers',
    'app/Models' => 'Diretório de Models',
    'routes/web.php' => 'Arquivo de rotas web',
    'config/app.php' => 'Configuração da aplicação'
];

foreach ($requiredFiles as $file => $description) {
    if (file_exists($file)) {
        echo "   ✅ $description: $file\n";
    } else {
        echo "   ❌ $description não encontrado: $file\n";
    }
}

// Teste 2: Verificar configurações do .env
echo "\n2. Verificando configurações do .env...\n";

if (file_exists('.env')) {
    $envContent = file_get_contents('.env');
    
    $envChecks = [
        'APP_NAME=' => 'Nome da aplicação',
        'APP_ENV=' => 'Ambiente da aplicação',
        'APP_KEY=' => 'Chave da aplicação',
        'DB_CONNECTION=' => 'Conexão do banco de dados'
    ];
    
    foreach ($envChecks as $key => $description) {
        if (strpos($envContent, $key) !== false) {
            echo "   ✅ $description configurado\n";
        } else {
            echo "   ❌ $description não encontrado\n";
        }
    }
} else {
    echo "   ❌ Arquivo .env não encontrado\n";
}

// Teste 3: Verificar rotas
echo "\n3. Verificando arquivo de rotas...\n";

if (file_exists('routes/web.php')) {
    $routesContent = file_get_contents('routes/web.php');
    echo "   ✅ Arquivo de rotas encontrado\n";
    
    if (strpos($routesContent, "Route::get('/'") !== false) {
        echo "   ✅ Rota principal (/) definida\n";
    } else {
        echo "   ⚠️  Rota principal (/) não encontrada\n";
    }
} else {
    echo "   ❌ Arquivo de rotas não encontrado\n";
}

// Teste 4: Verificar vendor/autoload
echo "\n4. Verificando dependências...\n";

if (file_exists('vendor/autoload.php')) {
    echo "   ✅ Autoload do Composer encontrado\n";
    
    if (is_dir('vendor/laravel')) {
        echo "   ✅ Framework Laravel instalado\n";
    } else {
        echo "   ❌ Framework Laravel não encontrado\n";
    }
} else {
    echo "   ❌ Dependências não instaladas (execute: composer install)\n";
}

// Teste 5: Verificar logs
echo "\n5. Verificando logs...\n";

if (is_dir('storage/logs')) {
    echo "   ✅ Diretório de logs existe\n";
    
    $logFiles = glob('storage/logs/*.log');
    if (!empty($logFiles)) {
        echo "   ✅ Arquivos de log encontrados: " . count($logFiles) . " arquivo(s)\n";
        
        // Verificar o log mais recente
        $latestLog = end($logFiles);
        $logContent = file_get_contents($latestLog);
        
        if (strpos($logContent, 'ERROR') !== false) {
            echo "   ⚠️  Erros encontrados no log mais recente\n";
        } else {
            echo "   ✅ Nenhum erro crítico no log mais recente\n";
        }
    } else {
        echo "   ✅ Nenhum arquivo de log (aplicação não teve erros)\n";
    }
} else {
    echo "   ❌ Diretório de logs não encontrado\n";
}

echo "\n=== Guia de Testes ===\n";
echo "\n📋 Para testar seu backend Laravel:\n";
echo "\n1. TESTES BÁSICOS (sem extensões PHP):\n";
echo "   • Execute: D:\\php\\php.exe manual_test.php\n";
echo "   • Verifique se o servidor roda: D:\\php\\php.exe artisan serve\n";
echo "   • Acesse http://127.0.0.1:8000 no navegador\n";

echo "\n2. TESTES DE ROTAS:\n";
echo "   • Crie rotas em routes/web.php\n";
echo "   • Teste no navegador: http://127.0.0.1:8000/sua-rota\n";
echo "   • Use Postman ou Insomnia para APIs\n";

echo "\n3. TESTES UNITÁRIOS (após instalar extensões):\n";
echo "   • Instale extensões PHP: mbstring, curl, sqlite\n";
echo "   • Execute: D:\\php\\php.exe artisan test\n";
echo "   • Crie testes: D:\\php\\php.exe artisan make:test MeuTeste\n";

echo "\n4. TESTES DE API:\n";
echo "   • Use ferramentas como Postman, Insomnia ou curl\n";
echo "   • Teste endpoints: GET, POST, PUT, DELETE\n";
echo "   • Verifique respostas JSON\n";

echo "\n=== Fim dos Testes ===\n";