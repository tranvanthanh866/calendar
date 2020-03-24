<?php
namespace Package\ResetsPassword\Providers;

use Illuminate\Support\ServiceProvider;

class ResetsPasswordProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->loadRoutesFrom(__DIR__ . '/../../routes/web.php');
        $this->loadViewsFrom(__DIR__ . '/../../resources/views', 'resetPassword');
        //$this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
