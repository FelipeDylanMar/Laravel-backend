<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rota de teste simples - sem dependências
Route::get('/teste', function () {
    return response()->json([
        'message' => 'API funcionando perfeitamente!',
        'timestamp' => date('Y-m-d H:i:s'),
        'status' => 'success',
        'server' => 'Laravel ' . app()->version()
    ]);
});

// Rota de status do sistema
Route::get('/status', function () {
    return response()->json([
        'sistema' => 'Laravel Backend',
        'versao' => app()->version(),
        'ambiente' => app()->environment(),
        'debug' => config('app.debug'),
        'timezone' => config('app.timezone'),
        'locale' => config('app.locale'),
        'status' => 'online'
    ]);
});

// Rotas para usuários (simuladas - sem banco de dados)
Route::get('/usuarios', function () {
    return response()->json([
        'usuarios' => [
            ['id' => 1, 'nome' => 'João Silva', 'email' => 'joao@email.com', 'ativo' => true],
            ['id' => 2, 'nome' => 'Maria Santos', 'email' => 'maria@email.com', 'ativo' => true],
            ['id' => 3, 'nome' => 'Pedro Costa', 'email' => 'pedro@email.com', 'ativo' => false],
            ['id' => 4, 'nome' => 'Ana Oliveira', 'email' => 'ana@email.com', 'ativo' => true]
        ],
        'total' => 4,
        'pagina' => 1,
        'por_pagina' => 10
    ]);
});

Route::get('/usuarios/{id}', function ($id) {
    $usuarios = [
        1 => ['id' => 1, 'nome' => 'João Silva', 'email' => 'joao@email.com', 'ativo' => true, 'criado_em' => '2024-01-15'],
        2 => ['id' => 2, 'nome' => 'Maria Santos', 'email' => 'maria@email.com', 'ativo' => true, 'criado_em' => '2024-02-20'],
        3 => ['id' => 3, 'nome' => 'Pedro Costa', 'email' => 'pedro@email.com', 'ativo' => false, 'criado_em' => '2024-03-10'],
        4 => ['id' => 4, 'nome' => 'Ana Oliveira', 'email' => 'ana@email.com', 'ativo' => true, 'criado_em' => '2024-04-05']
    ];
    
    if (isset($usuarios[$id])) {
        return response()->json([
            'usuario' => $usuarios[$id],
            'encontrado' => true
        ]);
    }
    
    return response()->json([
        'error' => 'Usuário não encontrado',
        'codigo' => 'USER_NOT_FOUND',
        'usuario_id' => $id
    ], 404);
});

Route::post('/usuarios', function (Request $request) {
    // Validação simples
    $nome = $request->input('nome');
    $email = $request->input('email');
    
    if (!$nome || !$email) {
        return response()->json([
            'error' => 'Nome e email são obrigatórios',
            'codigo' => 'VALIDATION_ERROR'
        ], 400);
    }
    
    return response()->json([
        'message' => 'Usuário criado com sucesso!',
        'usuario' => [
            'id' => rand(5, 1000),
            'nome' => $nome,
            'email' => $email,
            'ativo' => true,
            'criado_em' => date('Y-m-d H:i:s')
        ],
        'status' => 'created'
    ], 201);
});

// Rota para testar diferentes métodos HTTP
Route::put('/usuarios/{id}', function (Request $request, $id) {
    return response()->json([
        'message' => "Usuário {$id} atualizado com sucesso!",
        'dados_recebidos' => $request->all(),
        'metodo' => 'PUT'
    ]);
});

Route::delete('/usuarios/{id}', function ($id) {
    return response()->json([
        'message' => "Usuário {$id} removido com sucesso!",
        'metodo' => 'DELETE'
    ]);
});

// Rota para testar headers e informações da requisição
Route::get('/info', function (Request $request) {
    return response()->json([
        'ip' => $request->ip(),
        'user_agent' => $request->userAgent(),
        'metodo' => $request->method(),
        'url' => $request->fullUrl(),
        'headers' => $request->headers->all(),
        'parametros' => $request->all()
    ]);
});