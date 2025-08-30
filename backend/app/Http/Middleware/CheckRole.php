<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
   
    public function handle(Request $request, Closure $next, string $role, string $type = 'single'): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse('User not authenticated');
        }

        $cacheKey = "user.{$user->id}.role.check";
        $userRoleData = Cache::remember($cacheKey, 1800, function () use ($user) {
            if (!$user->relationLoaded('role')) {
                $user->load('role');
            }
            return [
                'name' => $user->role?->name,
                'level' => $user->role?->level ?? 0
            ];
        });

        $hasRole = false;

        switch ($type) {
            case 'any':
                $roles = explode('|', $role);
                $hasRole = in_array($userRoleData['name'], $roles);
                break;
            case 'level':
                $minLevel = (int) $role;
                $hasRole = $userRoleData['level'] >= $minLevel;
                break;
            default:
                $hasRole = $userRoleData['name'] === $role;
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
