<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Login do usuário
     */
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

        // Prepare user data with role and permissions
        $userData = $user->toArray();
        $userData['role'] = $user->role?->name;
        $userData['permissions'] = $user->role?->permissions->pluck('name')->toArray() ?? [];

        return response()->json([
            'user' => $userData,
            'token' => $token,
            'message' => 'Login realizado com sucesso'
        ]);
    }

    /**
     * Logout do usuário
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso'
        ]);
    }

    /**
     * Obter dados do usuário autenticado
     */
    public function user(Request $request)
    {
        $user = $request->user()->load('role.permissions');
        
        // Prepare user data with role and permissions
        $userData = $user->toArray();
        $userData['role'] = $user->role?->name;
        $userData['permissions'] = $user->role?->permissions->pluck('name')->toArray() ?? [];
        
        return response()->json($userData);
    }

    /**
     * Registrar novo usuário
     */
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