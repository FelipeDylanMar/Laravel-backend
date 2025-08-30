<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
   
    public function handle(Request $request, Closure $next, string $permission, string $type = 'single'): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse('User not authenticated');
        }

        $cacheKey = "user.{$user->id}.permissions.check";
        $userPermissions = Cache::remember($cacheKey, 1800, function () use ($user) {
            if (!$user->relationLoaded('role') || !$user->role?->relationLoaded('permissions')) {
                $user->load('role.permissions');
            }
            return $user->role?->permissions->pluck('name')->toArray() ?? [];
        });

        $hasPermission = false;

        switch ($type) {
            case 'any':
                $permissions = explode('|', $permission);
                $hasPermission = !empty(array_intersect($permissions, $userPermissions));
                break;
            case 'all':
                $permissions = explode('|', $permission);
                $hasPermission = empty(array_diff($permissions, $userPermissions));
                break;
            default:
                $hasPermission = in_array($permission, $userPermissions);
                break;
        }

        if (!$hasPermission) {
            return $this->unauthorizedResponse('Insufficient permissions');
        }

        return $next($request);
    }

    private function unauthorizedResponse(string $message): JsonResponse
    {
        return response()->json([
            'error' => 'Unauthorized',
            'message' => $message
        ], 403);
    }
}
