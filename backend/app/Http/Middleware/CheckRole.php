<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
   
    public function handle(Request $request, Closure $next, string $role, string $type = 'single'): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse('User not authenticated');
        }

        if (!$user->relationLoaded('role')) {
            $user->load('role');
        }

        $hasRole = false;

        switch ($type) {
            case 'any':
                $roles = explode('|', $role);
                $hasRole = in_array($user->role?->name, $roles);
                break;
            case 'level':
                $minLevel = (int) $role;
                $hasRole = $user->hasRoleLevel($minLevel);
                break;
            default:
                $hasRole = $user->hasRole($role);
                break;
        }

        if (!$hasRole) {
            return $this->unauthorizedResponse('Insufficient role level');
        }

        return $next($request);
    }

    /**
     * Return unauthorized response.
     */
    private function unauthorizedResponse(string $message): JsonResponse
    {
        return response()->json([
            'error' => 'Unauthorized',
            'message' => $message
        ], 403);
    }
}
