<?php

/**
 * Exemplo prático: Como criar e testar uma API simples no Laravel
 * 
 * Este arquivo demonstra como:
 * 1. Criar rotas de API
 * 2. Criar um controller
 * 3. Testar manualmente
 */

echo "=== Exemplo: Criando e Testando API Laravel ===\n\n";

echo "📝 PASSO 1: Criar uma rota de API\n";
echo "   Adicione no arquivo routes/api.php:\n";
echo "   \n";
echo "   Route::get('/usuarios', function () {\n";
echo "       return response()->json([\n";
echo "           'usuarios' => [\n";
echo "               ['id' => 1, 'nome' => 'João', 'email' => 'joao@email.com'],\n";
echo "               ['id' => 2, 'nome' => 'Maria', 'email' => 'maria@email.com']\n";
echo "           ]\n";
echo "       ]);\n";
echo "   });\n";
echo "   \n";
echo "   Route::post('/usuarios', function (Request \$request) {\n";
echo "       return response()->json([\n";
echo "           'mensagem' => 'Usuário criado com sucesso',\n";
echo "           'dados' => \$request->all()\n";
echo "       ], 201);\n";
echo "   });\n\n";

echo "📝 PASSO 2: Testar com o navegador\n";
echo "   • Inicie o servidor: D:\\php\\php.exe artisan serve\n";
echo "   • Acesse: http://127.0.0.1:8000/api/usuarios\n";
echo "   • Deve retornar JSON com lista de usuários\n\n";

echo "📝 PASSO 3: Testar com PowerShell (GET)\n";
echo "   Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/usuarios' -Method GET\n\n";

echo "📝 PASSO 4: Testar com PowerShell (POST)\n";
echo "   \$body = @{\n";
echo "       nome = 'Pedro'\n";
echo "       email = 'pedro@email.com'\n";
echo "   } | ConvertTo-Json\n";
echo "   \n";
echo "   Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/usuarios' ```\n";
echo "       -Method POST ```\n";
echo "       -Body \$body ```\n";
echo "       -ContentType 'application/json'\n\n";

echo "📝 PASSO 5: Criar um Controller\n";
echo "   Execute: D:\\php\\php.exe artisan make:controller UsuarioController\n";
echo "   \n";
echo "   No arquivo app/Http/Controllers/UsuarioController.php:\n";
echo "   \n";
echo "   public function index()\n";
echo "   {\n";
echo "       return response()->json([\n";
echo "           'usuarios' => [\n";
echo "               ['id' => 1, 'nome' => 'João'],\n";
echo "               ['id' => 2, 'nome' => 'Maria']\n";
echo "           ]\n";
echo "       ]);\n";
echo "   }\n";
echo "   \n";
echo "   public function store(Request \$request)\n";
echo "   {\n";
echo "       return response()->json([\n";
echo "           'mensagem' => 'Usuário criado',\n";
echo "           'dados' => \$request->all()\n";
echo "       ], 201);\n";
echo "   }\n\n";

echo "📝 PASSO 6: Atualizar rotas para usar Controller\n";
echo "   No arquivo routes/api.php:\n";
echo "   \n";
echo "   Route::get('/usuarios', [UsuarioController::class, 'index']);\n";
echo "   Route::post('/usuarios', [UsuarioController::class, 'store']);\n\n";

echo "🔧 FERRAMENTAS RECOMENDADAS PARA TESTES:\n\n";
echo "1. POSTMAN (Gratuito):\n";
echo "   • Download: https://www.postman.com/downloads/\n";
echo "   • Interface gráfica para testar APIs\n";
echo "   • Suporte a GET, POST, PUT, DELETE\n";
echo "   • Visualização de respostas JSON\n\n";

echo "2. INSOMNIA (Gratuito):\n";
echo "   • Download: https://insomnia.rest/download\n";
echo "   • Alternativa ao Postman\n";
echo "   • Interface simples e intuitiva\n\n";

echo "3. POWERSHELL (Já instalado):\n";
echo "   • Use Invoke-RestMethod para testes rápidos\n";
echo "   • Ideal para automação de testes\n\n";

echo "4. NAVEGADOR (Para GET requests):\n";
echo "   • Acesse diretamente as URLs\n";
echo "   • Instale extensão JSON Viewer\n\n";

echo "✅ CHECKLIST DE TESTES:\n\n";
echo "□ Servidor Laravel rodando (artisan serve)\n";
echo "□ Rota GET retorna JSON válido\n";
echo "□ Rota POST aceita dados\n";
echo "□ Status codes corretos (200, 201, 404, etc.)\n";
echo "□ Headers Content-Type: application/json\n";
echo "□ Validação de dados funcionando\n";
echo "□ Tratamento de erros implementado\n\n";

echo "🚀 PRÓXIMOS PASSOS:\n\n";
echo "1. Instalar extensões PHP necessárias\n";
echo "2. Configurar banco de dados\n";
echo "3. Criar Models e Migrations\n";
echo "4. Implementar autenticação\n";
echo "5. Escrever testes automatizados\n\n";

echo "=== Fim do Exemplo ===\n";