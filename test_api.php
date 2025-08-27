<?php

/**
 * Teste simples de API para o Laravel
 * Execute com: D:\php\php.exe test_api.php
 */

echo "=== Teste de API Laravel ===\n\n";

// Função para fazer requisições HTTP
function testEndpoint($url, $method = 'GET', $data = null) {
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data && $method !== 'GET') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json'
        ]);
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'response' => $response,
        'error' => $error
    ];
}

// Verificar se o servidor está rodando
echo "1. Verificando se o servidor Laravel está rodando...\n";
$baseUrl = 'http://127.0.0.1:8000';

$result = testEndpoint($baseUrl);

if ($result['error']) {
    echo "   ❌ Erro de conexão: " . $result['error'] . "\n";
    echo "   💡 Certifique-se de que o servidor está rodando: D:\\php\\php.exe artisan serve\n";
    exit(1);
}

if ($result['status'] === 200) {
    echo "   ✅ Servidor respondendo! Status: " . $result['status'] . "\n";
} else {
    echo "   ⚠️  Servidor respondeu com status: " . $result['status'] . "\n";
}

// Teste da página principal
echo "\n2. Testando página principal (/)...\n";
$homeResult = testEndpoint($baseUrl . '/');
echo "   Status: " . $homeResult['status'] . "\n";

if ($homeResult['status'] === 200) {
    echo "   ✅ Página principal carregou com sucesso!\n";
    // Verificar se contém conteúdo Laravel
    if (strpos($homeResult['response'], 'Laravel') !== false) {
        echo "   ✅ Conteúdo Laravel detectado na resposta\n";
    }
} else {
    echo "   ❌ Erro ao carregar página principal\n";
}

// Teste de rota inexistente (deve retornar 404)
echo "\n3. Testando rota inexistente (/rota-que-nao-existe)...\n";
$notFoundResult = testEndpoint($baseUrl . '/rota-que-nao-existe');
echo "   Status: " . $notFoundResult['status'] . "\n";

if ($notFoundResult['status'] === 404) {
    echo "   ✅ Rota inexistente retornou 404 corretamente\n";
} else {
    echo "   ⚠️  Rota inexistente retornou status inesperado: " . $notFoundResult['status'] . "\n";
}

echo "\n=== Resumo dos Testes ===\n";
echo "✅ Testes básicos de conectividade concluídos\n";
echo "\n💡 Para criar testes mais avançados:\n";
echo "   1. Crie arquivos em tests/Feature/ para testes de funcionalidades\n";
echo "   2. Crie arquivos em tests/Unit/ para testes unitários\n";
echo "   3. Use: D:\\php\\php.exe artisan make:test NomeDoTeste\n";
echo "   4. Execute: D:\\php\\php.exe artisan test (após instalar extensões PHP)\n";

echo "\n=== Fim dos Testes ===\n";