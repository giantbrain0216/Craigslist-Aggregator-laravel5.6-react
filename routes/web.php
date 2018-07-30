<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/site/init',  'Controller@initConf');
Route::post('/sites/fetch', 'Controller@postSiteFetch');
Route::get('/sites/conf',  'Controller@getSiteConf');

Route::get('/{all}', [
    'as' => 'catch.all',
    'uses' => 'Controller@indexWildCard'
])->where(['all' => '.*']);