<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 10);
        $perPage = min($perPage, 50);
        
        $query = Product::with('category');
        

        if ($request->has('search') && !empty($request->get('search'))) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%")
                  ->orWhere('descricao', 'like', "%{$search}%");
            });
        }
        

        if ($request->has('sort_by')) {
            $sortBy = $request->get('sort_by');
            $sortOrder = $request->get('sort_order', 'asc');
            

            $fieldMap = [
                'name' => 'nome',
                'price' => 'preco',
                'created_at' => 'created_at'
            ];
            
            $dbField = $fieldMap[$sortBy] ?? 'nome';
            $query->orderBy($dbField, $sortOrder);
        } else {
            $query->orderBy('nome', 'asc');
        }
        
        $query->orderBy('id', 'asc');
        
        $products = $query->paginate($perPage);
        

        $products->getCollection()->transform(function ($product) {
            $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;
            return $product;
        });
        
        return response()->json($products);
    }

    public function store(Request $request): JsonResponse
    {


        $validated = $request->validate([
            'nome' => 'required|string|max:50',
            'descricao' => 'required|string|max:200',
            'preco' => 'required|numeric|min:0.01',
            'data_validade' => 'required|date|after:today',
            'categoria_id' => 'required|exists:categories,id',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('imagem')) {
            $imageName = time() . '.' . $request->imagem->extension();
            $request->imagem->move(public_path('images'), $imageName);
            $validated['imagem'] = $imageName;
        }

        // Usar transação para garantir consistência
        $product = \DB::transaction(function () use ($validated) {
            // Forçar charset UTF-8 na conexão dentro da transação
            \DB::statement("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
            \DB::statement("SET CHARACTER SET utf8mb4");

            return Product::create($validated);
        });
        $product->load('category');
        $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;
        
        return response()->json($product, 201);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::with('category')->findOrFail($id);
        $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;
        return response()->json(['data' => $product]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        // Validação simples
        $data = $request->only(['nome', 'descricao', 'preco', 'data_validade', 'categoria_id']);

        if (!empty($data)) {
            $product->update($data);
        }

        $product->load('category');
        $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;

        return response()->json($product);
    }

    public function destroy(string $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        
        if ($product->imagem && file_exists(public_path('images/' . $product->imagem))) {
            unlink(public_path('images/' . $product->imagem));
        }
        
        $product->delete();
        
        return response()->json(['message' => 'Produto deletado com sucesso']);
    }

    public function categories(): JsonResponse
    {
        $categories = Cache::remember('categories.all', 3600, function () {
            return Category::orderBy('nome')->get();
        });
        
        return response()->json($categories);
    }
}
