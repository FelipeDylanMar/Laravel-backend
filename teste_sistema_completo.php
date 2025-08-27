<?php

/**
 * Script de teste para verificar se o sistema está funcionando corretamente
 * com SQLite e todas as extensões habilitadas
 */

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

// Carrega o ambiente Laravel
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

echo "=== TESTE DO SISTEMA DE PRODUTOS ===\n\n";

// Teste 1: Verificar conexão com banco de dados
echo "1. Testando conexão com banco de dados...\n";
try {
    $pdo = new PDO('sqlite:' . database_path('database.sqlite'));
    echo "✅ Conexão SQLite: OK\n";
} catch (Exception $e) {
    echo "❌ Erro na conexão: " . $e->getMessage() . "\n";
    exit(1);
}

// Teste 2: Verificar se as tabelas existem
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

// Teste 3: Verificar dados de exemplo
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

// Teste 4: Verificar extensões PHP
echo "\n4. Verificando extensões PHP necessárias...\n";
$extensions = ['pdo_sqlite', 'mbstring', 'json', 'openssl'];
foreach ($extensions as $ext) {
    if (extension_loaded($ext)) {
        echo "✅ Extensão '$ext': OK\n";
    } else {
        echo "❌ Extensão '$ext': NÃO CARREGADA\n";
    }
}

// Teste 5: Listar categorias
echo "\n5. Listando categorias cadastradas...\n";
$stmt = $pdo->query("SELECT * FROM categories");
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "📁 ID: {$row['id']} - Nome: {$row['nome']}\n";
}

// Teste 6: Verificar usuário de teste
echo "\n6. Verificando usuário de teste...\n";
$stmt = $pdo->query("SELECT * FROM users WHERE email = 'teste@exemplo.com'");
if ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "✅ Usuário de teste encontrado: {$user['name']} ({$user['email']})\n";
} else {
    echo "❌ Usuário de teste não encontrado\n";
}

echo "\n=== TESTE CONCLUÍDO ===\n";
echo "\n🌐 Servidor disponível em: http://127.0.0.1:8000\n";
echo "📚 Documentação: README_SISTEMA_PRODUTOS.md\n";
echo "\n🔑 Para testar as APIs, use:\n";
echo "   Email: teste@exemplo.com\n";
echo "   Senha: 123456\n";