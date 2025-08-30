<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 15);
        $perPage = min($perPage, 100);
        
        $query = User::query();
        
        if ($request->has('role_id')) {
            $query->where('role_id', $request->role_id);
        }
        
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }
        
        $users = $query->with('role')->paginate($perPage);
        
        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'from' => $users->firstItem(),
                'to' => $users->lastItem()
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'nullable|exists:roles,id'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        $user = User::create($validated);
        $user->load('role');
        
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $user = User::with('role')->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'nullable|exists:roles,id'
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }
        
        $user->update($validated);
        $user->load('role');
        
        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }
    
    public function assignRole(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);
        
        $user->update(['role_id' => $validated['role_id']]);
        $user->load('role');
        
        return response()->json([
            'success' => true,
            'message' => 'Role assigned successfully',
            'data' => $user
        ]);
    }
    
    public function removeRole(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        
        $user->update(['role_id' => null]);
        $user->load('role');
        
        return response()->json([
            'success' => true,
            'message' => 'Role removed successfully',
            'data' => $user
        ]);
    }
    
    public function getPermissions(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $permissions = $user->getPermissions();
        
        return response()->json([
            'success' => true,
            'data' => $permissions
        ]);
    }
}
