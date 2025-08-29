<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class FixMissingExtensionsServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        if (!function_exists('mb_split')) {
            eval('
                function mb_split($pattern, $string, $limit = -1) {
                    return preg_split("/" . preg_quote($pattern, "/") . "/", $string, $limit);
                }
            ');
        }
        

        if (!function_exists('Illuminate\\Support\\mb_split')) {
            eval('
                namespace Illuminate\\Support;
                if (!function_exists("Illuminate\\Support\\mb_split")) {
                    function mb_split($pattern, $string, $limit = -1) {
                        return preg_split("/" . preg_quote($pattern, "/") . "/", $string, $limit);
                    }
                }
            ');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

    }
}