<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category');
        
        // Verificar se há parâmetro de busca
        if ($request->has('search') && !empty($request->get('search'))) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%")
                  ->orWhere('descricao', 'like', "%{$search}%");
            });
        }
        
        // Aplicar ordenação se especificada
        if ($request->has('sort_by')) {
            $sortBy = $request->get('sort_by');
            $sortOrder = $request->get('sort_order', 'asc');
            
            // Mapear campos do frontend para o backend
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
        
        $products = $query->paginate(10);
        
        // Adicionar image_url manualmente para cada produto
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
        
        $product = Product::create($validated);
        $product->load('category');
        $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;
        
        return response()->json($product, 201);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::with('category')->findOrFail($id);
        $product->image_url = $product->imagem ? url('images/' . $product->imagem) : null;
        return response()->json($product);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $product = Product::findOrFail($id);
        
        $validated = $request->validate([
            'nome' => 'sometimes|required|string|max:50',
            'descricao' => 'sometimes|required|string|max:200',
            'preco' => 'sometimes|required|numeric|min:0.01',
            'data_validade' => 'sometimes|required|date|after:today',
            'categoria_id' => 'sometimes|required|exists:categories,id',
            'imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        
        if ($request->hasFile('imagem')) {
            if ($product->imagem && file_exists(public_path('images/' . $product->imagem))) {
                unlink(public_path('images/' . $product->imagem));
            }
            
            $imageName = time() . '.' . $request->imagem->extension();
            $request->imagem->move(public_path('images'), $imageName);
            $validated['imagem'] = $imageName;
        }
        
        $product->update($validated);
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
}
