<?php

Route::prefix('api')->group(function () {
    Route::group(['namespace' => 'Package\Calendar\Http\Controllers', 'middleware' => ['api']], function () {
        Route::get('testpassword', function (){
            echo 1;
        });
        Route::post('reset-password', 'ResetPasswordController@sendMail');
        Route::put('reset-password/{token}', 'ResetPasswordController@reset');
    });

});