<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Role;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Primeiro chama o ACLSeeder para criar roles
        $this->call(ACLSeeder::class);
        
        // Depois cria os usuários com roles
        $adminRole = Role::where('name', 'Admin')->first();
        
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        User::create([
            'name' => 'Usuário Principal',
            'email' => 'teste@exemplo.com',
            'password' => bcrypt('123456'),
            'role_id' => $adminRole->id,
            'email_verified_at' => now()
        ]);
        
        Category::create(['nome' => 'Eletrônicos']);
        Category::create(['nome' => 'Roupas']);
        Category::create(['nome' => 'Livros']);
        Category::create(['nome' => 'Casa e Jardim']);
        Category::create(['nome' => 'Esportes']);
        Category::create(['nome' => 'Brinquedos']);
        Category::create(['nome' => 'Outros']);
        
        $this->call(ProductSeeder::class);
    }
}
