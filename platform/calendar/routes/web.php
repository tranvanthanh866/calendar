<?php

Route::group(['namespace' => 'Package\Calendar\Http\Controllers', 'middleware' => 'web'], function () {

    //Front
    Route::name('font')->namespace('Admin')->group(function () {
        //Route::get('/', ['as' => '.index', 'uses' => 'CalendarController@index']);
        Route::get('fullcalendar','CalendarController@index');
        Route::get('get_data','CalendarController@get_data');
        Route::post('fullcalendar/create','CalendarController@store');
        Route::post('fullcalendar/update','CalendarController@update');
        Route::post('fullcalendar/delete','CalendarController@destroy');
    });
    

});