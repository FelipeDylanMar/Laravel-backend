<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/categories', [CategoryController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    Route::get('products', [ProductController::class, 'index'])->middleware('permission:products.view');
    Route::post('products', [ProductController::class, 'store'])->middleware('permission:products.create');
    Route::get('products/{product}', [ProductController::class, 'show'])->middleware('permission:products.view');
    Route::put('products/{product}', [ProductController::class, 'update'])->middleware('permission:products.edit');
    Route::delete('products/{product}', [ProductController::class, 'destroy'])->middleware('permission:products.delete');
    
    Route::prefix('acl')->middleware('role:Admin')->group(function () {
        Route::apiResource('roles', RoleController::class);
        Route::post('roles/{id}/assign-permissions', [RoleController::class, 'assignPermissions']);
        Route::post('roles/{id}/remove-permissions', [RoleController::class, 'removePermissions']);
        Route::apiResource('permissions', PermissionController::class);
        Route::get('permissions/by-category', [PermissionController::class, 'getByCategory']);
        Route::get('permissions/categories', [PermissionController::class, 'getCategories']);
        Route::apiResource('users', UserController::class);
        Route::post('users/{id}/assign-role', [UserController::class, 'assignRole']);
        Route::delete('users/{id}/remove-role', [UserController::class, 'removeRole']);
        Route::get('users/{id}/permissions', [UserController::class, 'getPermissions']);
    });
});