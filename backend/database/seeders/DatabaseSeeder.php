<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        User::create([
            'name' => 'Usuário Principal',
            'email' => 'teste@exemplo.com',
            'password' => bcrypt('123456'),
        ]);
        
        Category::create(['nome' => 'Eletrônicos']);
        Category::create(['nome' => 'Roupas']);
        Category::create(['nome' => 'Livros']);
        Category::create(['nome' => 'Casa e Jardim']);
        Category::create(['nome' => 'Esportes']);
        Category::create(['nome' => 'Brinquedos']);
        Category::create(['nome' => 'Outros']);
        
        $this->call(ProductSeeder::class);
        $this->call(ACLSeeder::class);
    }
}
