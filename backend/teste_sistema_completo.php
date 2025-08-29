<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

echo "=== TESTE DO SISTEMA DE PRODUTOS ===\n\n";

echo "1. Testando conexão com banco de dados...\n";
try {
    $pdo = new PDO('sqlite:' . database_path('database.sqlite'));
    echo "✅ Conexão SQLite: OK\n";
} catch (Exception $e) {
    echo "❌ Erro na conexão: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n2. Verificando tabelas do banco...\n";
$tables = ['users', 'categories', 'products', 'personal_access_tokens'];
foreach ($tables as $table) {
    $stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='$table'");
    if ($stmt->fetch()) {
        echo "✅ Tabela '$table': OK\n";
    } else {
        echo "❌ Tabela '$table': NÃO ENCONTRADA\n";
    }
}

echo "\n3. Verificando dados de exemplo...\n";
$stmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
$categoriesCount = $stmt->fetch()['count'];
echo "📊 Categorias cadastradas: $categoriesCount\n";

$stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
$usersCount = $stmt->fetch()['count'];
echo "👥 Usuários cadastrados: $usersCount\n";

$stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
$productsCount = $stmt->fetch()['count'];
echo "📦 Produtos cadastrados: $productsCount\n";

echo "\n4. Verificando extensões PHP necessárias...\n";
$extensions = ['pdo_sqlite', 'mbstring', 'json', 'openssl', 'curl'];
foreach ($extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "✅ Extensão '$ext': OK\n";
    } else {
        echo "❌ Extensão '$ext': NÃO CARREGADA\n";
    }
}

echo "\n5. Listando categorias cadastradas...\n";
$stmt = $pdo->query("SELECT * FROM categories");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "📁 ID: {$row['id']} - Nome: {$row['nome']}\n";
}

echo "\n6. Verificando usuário de teste...\n";
$stmt = $pdo->query("SELECT * FROM users WHERE email = 'teste@exemplo.com'");
if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "✅ Usuário de teste encontrado: {$user['name']} ({$user['email']})\n";
} else {
    echo "❌ Usuário de teste não encontrado\n";
}

echo "\n7. Testando autenticação por token...\n";
try {
    $stmt = $pdo->query("SELECT * FROM users WHERE email = 'teste@exemplo.com'");
    if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $tokenName = 'teste-token-' . date('Y-m-d-H-i-s');
        $token = bin2hex(random_bytes(40));
        
        $stmt = $pdo->prepare("INSERT INTO personal_access_tokens (tokenable_type, tokenable_id, name, token, abilities, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $now = date('Y-m-d H:i:s');
        $stmt->execute([
            'App\\Models\\User',
            $user['id'],
            $tokenName,
            hash('sha256', $token),
            '["*"]',
            $now,
            $now
        ]);
        
        echo "✅ Token criado: $token\n";
        
        echo "\n8. Testando endpoints da API...\n";
        
        if (!extension_loaded('curl')) {
            echo "❌ Extensão cURL não está habilitada. Pulando testes de API.\n";
            echo "   Para habilitar cURL, descomente 'extension=curl' no php.ini\n";
        } else {
            $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8000/api/categories');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            echo "✅ GET /api/categories: OK (Status: $httpCode)\n";
            $categories = json_decode($response, true);
            echo "   📊 Categorias retornadas: " . count($categories) . "\n";
        } else {
            echo "❌ GET /api/categories: FALHOU (Status: $httpCode)\n";
        }
        
        // Testar endpoint de produtos (protegido)
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8000/api/products');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token,
            'Accept: application/json',
            'Content-Type: application/json'
        ]);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            echo "✅ GET /api/products: OK (Status: $httpCode)\n";
            $products = json_decode($response, true);
            echo "   📦 Produtos retornados: " . count($products) . "\n";
        } else {
            echo "❌ GET /api/products: FALHOU (Status: $httpCode)\n";
            echo "   Resposta: $response\n";
        }
        
        $productData = [
            'nome' => 'Produto Teste',
            'descricao' => 'Descrição do produto de teste',
            'preco' => 99.99,
            'data_validade' => '2025-12-31',
            'categoria_id' => 1
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:8000/api/products');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($productData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token,
            'Accept: application/json',
            'Content-Type: application/json'
        ]);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 201) {
            echo "✅ POST /api/products: OK (Status: $httpCode)\n";
            $newProduct = json_decode($response, true);
            echo "   📦 Produto criado: ID {$newProduct['id']} - {$newProduct['nome']}\n";
        } else {
            echo "❌ POST /api/products: FALHOU (Status: $httpCode)\n";
            echo "   Resposta: $response\n";
        }
        
        }
        
    } else {
        echo "❌ Usuário de teste não encontrado para criar token\n";
    }
} catch (Exception $e) {
    echo "❌ Erro no teste de autenticação: " . $e->getMessage() . "\n";
}

echo "\n=== TESTE CONCLUÍDO ===\n";
echo "\n🌐 Servidor disponível em: http://127.0.0.1:8000\n";
echo "📚 Documentação: README_SISTEMA_PRODUTOS.md\n";
echo "\n🔑 Para testar as APIs manualmente, use:\n";
echo "   Email: teste@exemplo.com\n";
echo "   Senha: 123456\n";
echo "\n📋 Endpoints testados:\n";
echo "   GET  /api/categories (público)\n";
echo "   GET  /api/products (protegido)\n";
echo "   POST /api/products (protegido)\n";