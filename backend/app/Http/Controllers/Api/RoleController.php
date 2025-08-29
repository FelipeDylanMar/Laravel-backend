<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $roles = Role::with('permissions')->get();
        
        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'description' => 'nullable|string|max:500',
            'level' => 'required|integer|min:1|max:10',
            'is_active' => 'boolean',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        $role = Role::create($validated);
        
        if (isset($validated['permissions'])) {
            $role->permissions()->sync($validated['permissions']);
        }
        
        $role->load('permissions');
        
        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => $role
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $role = Role::with('permissions')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles')->ignore($role->id)],
            'description' => 'nullable|string|max:500',
            'level' => 'required|integer|min:1|max:10',
            'is_active' => 'boolean',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        $role->update($validated);
        
        if (isset($validated['permissions'])) {
            $role->permissions()->sync($validated['permissions']);
        }
        
        $role->load('permissions');
        
        return response()->json([
            'success' => true,
            'message' => 'Role updated successfully',
            'data' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        
        // Check if role has users
        if ($role->users()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete role that has assigned users'
            ], 422);
        }
        
        $role->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ]);
    }
    
    /**
     * Assign permissions to role.
     */
    public function assignPermissions(Request $request, string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        
        $validated = $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);
        
        $role->permissions()->sync($validated['permissions']);
        $role->load('permissions');
        
        return response()->json([
            'success' => true,
            'message' => 'Permissions assigned successfully',
            'data' => $role
        ]);
    }
    
    /**
     * Remove permissions from role.
     */
    public function removePermissions(Request $request, string $id): JsonResponse
    {
        $role = Role::findOrFail($id);
        
        $validated = $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,id'
        ]);
        
        $role->permissions()->detach($validated['permissions']);
        $role->load('permissions');
        
        return response()->json([
            'success' => true,
            'message' => 'Permissions removed successfully',
            'data' => $role
        ]);
    }
}
