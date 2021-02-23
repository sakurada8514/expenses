<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', 'Auth\RegisterController@register')->name('register');
Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/room.create', 'RoomController@create')->name('room.create');
Route::get('/user', 'UserController@userCheck')->name('user.check');

Route::post('/expense/create', 'ExpenseController@create')->name('expenses.create');
Route::get('/expense/categories', 'ExpenseController@readCategory')->name('expenses.categories.read');