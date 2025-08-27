<?php

/**
 * Teste simples para verificar funcionalidades básicas do Laravel
 * Execute com: D:\php\php.exe simple_test.php
 */

require_once 'vendor/autoload.php';

echo "=== Testes Simples do Laravel ===\n\n";

// Teste 1: Verificar se o Laravel está carregado
echo "1. Testando se o Laravel está carregado...\n";
try {
    $app = require_once 'bootstrap/app.php';
    echo "   ✅ Laravel carregado com sucesso!\n";
} catch (Exception $e) {
    echo "   ❌ Erro ao carregar Laravel: " . $e->getMessage() . "\n";
}

// Teste 2: Verificar configurações básicas
echo "\n2. Testando configurações básicas...\n";
try {
    $config = $app->make('config');
    $appName = $config->get('app.name');
    $appEnv = $config->get('app.env');
    echo "   ✅ Nome da aplicação: $appName\n";
    echo "   ✅ Ambiente: $appEnv\n";
} catch (Exception $e) {
    echo "   ❌ Erro ao acessar configurações: " . $e->getMessage() . "\n";
}

// Teste 3: Verificar rotas básicas
echo "\n3. Testando rota principal...\n";
try {
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    $request = Illuminate\Http\Request::create('/', 'GET');
    $response = $kernel->handle($request);
    
    if ($response->getStatusCode() === 200) {
        echo "   ✅ Rota principal (/) responde com status 200\n";
    } else {
        echo "   ❌ Rota principal retornou status: " . $response->getStatusCode() . "\n";
    }
} catch (Exception $e) {
    echo "   ❌ Erro ao testar rota: " . $e->getMessage() . "\n";
}

// Teste 4: Verificar helpers do Laravel
echo "\n4. Testando helpers do Laravel...\n";
try {
    $configPath = config_path();
    $storagePath = storage_path();
    echo "   ✅ config_path(): $configPath\n";
    echo "   ✅ storage_path(): $storagePath\n";
} catch (Exception $e) {
    echo "   ❌ Erro ao testar helpers: " . $e->getMessage() . "\n";
}

echo "\n=== Fim dos Testes ===\n";
echo "\nPara testes mais avançados, você precisará configurar as extensões PHP necessárias (mbstring, etc.)\n";
echo "Depois poderá usar: D:\\php\\php.exe artisan test\n";