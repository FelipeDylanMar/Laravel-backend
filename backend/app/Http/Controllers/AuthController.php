<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::with('role.permissions')->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais fornecidas estão incorretas.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;
        
        $userData = $user->toArray();
        $userData['role'] = $user->role?->name;
        $userData['permissions'] = $user->role?->permissions->pluck('name')->toArray() ?? [];
        $userData['role_level'] = $user->role?->level ?? 0;

        return response()->json([
            'user' => $userData,
            'token' => $token,
            'message' => 'Login realizado com sucesso'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        
        $cacheKey = "user.{$user->id}.permissions";
        $userData = Cache::remember($cacheKey, 1800, function () use ($user) {
            if (!$user->relationLoaded('role') || !$user->role?->relationLoaded('permissions')) {
                $user->load('role.permissions');
            }
            
            $userData = $user->toArray();
            $userData['role'] = $user->role?->name;
            $userData['permissions'] = $user->role?->permissions->pluck('name')->toArray() ?? [];
            $userData['role_level'] = $user->role?->level ?? 0;
            
            return $userData;
        });
        
        return response()->json($userData);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Usuário registrado com sucesso'
        ], 201);
    }
}