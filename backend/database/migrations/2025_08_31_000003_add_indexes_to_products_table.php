<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->index('nome');
            
            $table->index('descricao');
            
            $table->index(['categoria_id', 'nome']);
            
            $table->index('preco');
            
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['nome']);
            $table->dropIndex(['descricao']);
            $table->dropIndex(['categoria_id', 'nome']);
            $table->dropIndex(['preco']);
            $table->dropIndex(['created_at']);
        });
    }
};