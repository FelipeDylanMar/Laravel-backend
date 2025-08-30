<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CacheInvalidation
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('DELETE')) {
            $this->invalidateRelevantCache($request);
        }
        
        return $response;
    }
    
    /**
     * Invalidate relevant cache based on the request
     */
    private function invalidateRelevantCache(Request $request): void
    {
        $route = $request->route()->getName() ?? $request->path();
        
        if (str_contains($route, 'categories') || str_contains($route, 'category')) {
            Cache::forget('categories.all');
        }
        
        if (str_contains($route, 'roles') || str_contains($route, 'permissions') || str_contains($route, 'users')) {
            $this->clearUserPermissionCaches();
        }
    }
    
    /**
     * Clear all user permission caches
     */
    private function clearUserPermissionCaches(): void
    {
        $cacheKeys = Cache::getRedis()->keys('*user.*.permissions*');
        
        if (!empty($cacheKeys)) {
            Cache::getRedis()->del($cacheKeys);
        }
    }
}