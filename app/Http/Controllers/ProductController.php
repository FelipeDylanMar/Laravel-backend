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
        
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%")
                  ->orWhere('descricao', 'like', "%{$search}%");
            });
        }
        
        $products = $query->paginate(10);
        
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
        
        return response()->json($product, 201);
    }

    public function show(string $id): JsonResponse
    {
        $product = Product::with('category')->findOrFail($id);
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
