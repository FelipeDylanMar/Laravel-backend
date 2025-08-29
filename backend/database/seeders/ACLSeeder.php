<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ACLSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'users.view', 'description' => 'View users', 'category' => 'User Management'],
            ['name' => 'users.create', 'description' => 'Create users', 'category' => 'User Management'],
            ['name' => 'users.edit', 'description' => 'Edit users', 'category' => 'User Management'],
            ['name' => 'users.delete', 'description' => 'Delete users', 'category' => 'User Management'],
            
            ['name' => 'roles.view', 'description' => 'View roles', 'category' => 'Role Management'],
            ['name' => 'roles.create', 'description' => 'Create roles', 'category' => 'Role Management'],
            ['name' => 'roles.edit', 'description' => 'Edit roles', 'category' => 'Role Management'],
            ['name' => 'roles.delete', 'description' => 'Delete roles', 'category' => 'Role Management'],
            
            ['name' => 'permissions.view', 'description' => 'View permissions', 'category' => 'Permission Management'],
            ['name' => 'permissions.create', 'description' => 'Create permissions', 'category' => 'Permission Management'],
            ['name' => 'permissions.edit', 'description' => 'Edit permissions', 'category' => 'Permission Management'],
            ['name' => 'permissions.delete', 'description' => 'Delete permissions', 'category' => 'Permission Management'],
            
            ['name' => 'products.view', 'description' => 'View products', 'category' => 'Product Management'],
            ['name' => 'products.create', 'description' => 'Create products', 'category' => 'Product Management'],
            ['name' => 'products.edit', 'description' => 'Edit products', 'category' => 'Product Management'],
            ['name' => 'products.delete', 'description' => 'Delete products', 'category' => 'Product Management'],
            
            ['name' => 'categories.view', 'description' => 'View categories', 'category' => 'Category Management'],
            ['name' => 'categories.create', 'description' => 'Create categories', 'category' => 'Category Management'],
            ['name' => 'categories.edit', 'description' => 'Edit categories', 'category' => 'Category Management'],
            ['name' => 'categories.delete', 'description' => 'Delete categories', 'category' => 'Category Management'],
            
            ['name' => 'system.settings', 'description' => 'Access system settings', 'category' => 'System'],
            ['name' => 'system.logs', 'description' => 'View system logs', 'category' => 'System'],
        ];
        
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission['name']],
                $permission
            );
        }
        
        $adminRole = Role::firstOrCreate(
            ['name' => 'Admin'],
            [
                'description' => 'Administrator with full access',
                'level' => 10,
                'is_active' => true
            ]
        );
        
        $managerRole = Role::firstOrCreate(
            ['name' => 'Manager'],
            [
                'description' => 'Manager with limited administrative access',
                'level' => 5,
                'is_active' => true
            ]
        );
        
        $userRole = Role::firstOrCreate(
            ['name' => 'User'],
            [
                'description' => 'Regular user with basic access',
                'level' => 1,
                'is_active' => true
            ]
        );
        
        $allPermissions = Permission::all();
        
        $adminRole->permissions()->sync($allPermissions->pluck('id'));
        
        $managerPermissions = $allPermissions->whereNotIn('category', ['System', 'User Management', 'Role Management', 'Permission Management']);
        $managerRole->permissions()->sync($managerPermissions->pluck('id'));
        
        $userPermissions = $allPermissions->filter(function($permission) {
            return str_ends_with($permission->name, '.view');
        });
        $userRole->permissions()->sync($userPermissions->pluck('id'));
        
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id,
                'email_verified_at' => now()
            ]
        );
        
        $managerUser = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name' => 'Manager User',
                'password' => Hash::make('password'),
                'role_id' => $managerRole->id,
                'email_verified_at' => now()
            ]
        );
        
        $regularUser = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => Hash::make('password'),
                'role_id' => $userRole->id,
                'email_verified_at' => now()
            ]
        );
        
        $this->command->info('ACL data seeded successfully!');
        $this->command->info('Admin user: admin@example.com / password');
        $this->command->info('Manager user: manager@example.com / password');
        $this->command->info('Regular user: user@example.com / password');
    }
}
