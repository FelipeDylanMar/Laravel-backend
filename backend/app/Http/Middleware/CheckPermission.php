<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $permission
     * @param  string  $type (optional: 'any' or 'all')
     */
    public function handle(Request $request, Closure $next, string $permission, string $type = 'single'): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse('User not authenticated');
        }

        // Load role relationship if not already loaded
        if (!$user->relationLoaded('role')) {
            $user->load('role.permissions');
        }

        $hasPermission = false;

        switch ($type) {
            case 'any':
                $permissions = explode('|', $permission);
                $hasPermission = $user->hasAnyPermission($permissions);
                break;
            case 'all':
                $permissions = explode('|', $permission);
                $hasPermission = $user->hasAllPermissions($permissions);
                break;
            default:
                $hasPermission = $user->hasPermission($permission);
                break;
        }

        if (!$hasPermission) {
            return $this->unauthorizedResponse('Insufficient permissions');
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
