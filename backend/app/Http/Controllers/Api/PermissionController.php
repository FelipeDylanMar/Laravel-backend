<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class PermissionController extends Controller
{
   
    public function index(Request $request): JsonResponse
    {
        $query = Permission::query();
        
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }
        
        if ($request->has('active')) {
            if ($request->boolean('active')) {
                $query->active();
            } else {
                $query->where('is_active', false);
            }
        }
        
        $permissions = $query->get();
        
        return response()->json([
            'success' => true,
            'data' => $permissions
        ]);
    }

    
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions',
            'description' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:100',
            'is_active' => 'boolean'
        ]);

        $permission = Permission::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Permission created successfully',
            'data' => $permission
        ], 201);
    }

    
    public function show(string $id): JsonResponse
    {
        $permission = Permission::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $permission
        ]);
    }

    
    public function update(Request $request, string $id): JsonResponse
    {
        $permission = Permission::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('permissions')->ignore($permission->id)],
            'description' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:100',
            'is_active' => 'boolean'
        ]);

        $permission->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Permission updated successfully',
            'data' => $permission
        ]);
    }

    
    public function destroy(string $id): JsonResponse
    {
        $permission = Permission::findOrFail($id);
        
        if ($permission->roles()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete permission that is assigned to roles'
            ], 422);
        }
        
        $permission->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Permission deleted successfully'
        ]);
    }
    
    
    public function getByCategory(): JsonResponse
    {
        $permissions = Permission::active()->get()->groupBy('category');
        
        return response()->json([
            'success' => true,
            'data' => $permissions
        ]);
    }
    
    
    public function getCategories(): JsonResponse
    {
        $categories = Permission::whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();
        
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }
}
