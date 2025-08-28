<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        
        if ($categories->isEmpty()) {
            $this->command->info('Nenhuma categoria encontrada. Execute o CategorySeeder primeiro.');
            return;
        }

        $products = [
            [
                'nome' => 'Smartphone Samsung Galaxy',
                'descricao' => 'Smartphone com tela de 6.1 polegadas, 128GB de armazenamento e câmera tripla.',
                'preco' => 1299.99,
                'categoria_id' => $categories->where('nome', 'Eletrônicos')->first()->id,
                'data_validade' => now()->addYears(2),
            ],
            [
                'nome' => 'Notebook Dell Inspiron',
                'descricao' => 'Notebook com processador Intel i5, 8GB RAM e SSD 256GB.',
                'preco' => 2499.99,
                'categoria_id' => $categories->where('nome', 'Eletrônicos')->first()->id,
                'data_validade' => now()->addYears(3),
            ],
            [
                'nome' => 'Camiseta Polo',
                'descricao' => 'Camiseta polo masculina 100% algodão, disponível em várias cores.',
                'preco' => 89.90,
                'categoria_id' => $categories->where('nome', 'Roupas')->first()->id,
                'data_validade' => now()->addYears(5),
            ],
            [
                'nome' => 'Livro: Clean Code',
                'descricao' => 'Livro sobre boas práticas de programação por Robert C. Martin.',
                'preco' => 79.90,
                'categoria_id' => $categories->where('nome', 'Livros')->first()->id,
                'data_validade' => now()->addYears(10),
            ],
            [
                'nome' => 'Cafeteira Elétrica',
                'descricao' => 'Cafeteira elétrica com capacidade para 12 xícaras e timer programável.',
                'preco' => 199.99,
                'categoria_id' => $categories->where('nome', 'Casa e Jardim')->first()->id,
                'data_validade' => now()->addYears(2),
            ],
            [
                'nome' => 'Tênis de Corrida Nike',
                'descricao' => 'Tênis de corrida com tecnologia de amortecimento e design moderno.',
                'preco' => 299.99,
                'categoria_id' => $categories->where('nome', 'Esportes')->first()->id,
                'data_validade' => now()->addYears(3),
            ],
            [
                'nome' => 'Boneca Barbie',
                'descricao' => 'Boneca Barbie com roupas e acessórios inclusos.',
                'preco' => 49.99,
                'categoria_id' => $categories->where('nome', 'Brinquedos')->first()->id,
                'data_validade' => now()->addYears(5),
            ],
            [
                'nome' => 'Fone de Ouvido Bluetooth',
                'descricao' => 'Fone de ouvido sem fio com cancelamento de ruído e bateria de longa duração.',
                'preco' => 159.99,
                'categoria_id' => $categories->where('nome', 'Eletrônicos')->first()->id,
                'data_validade' => now()->addYears(2),
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        $this->command->info('Produtos criados com sucesso!');
    }
}