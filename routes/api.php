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
Route::get('/expense/list/{roomId}', 'ExpenseController@readExpenses')->name('expenses.read');
Route::get('/expense/{id}', 'ExpenseController@readExpenseDetail')->name('expenses.read.dtail');
Route::post('/expense/delete/{id}', 'ExpenseController@deleteExpense')->name('expenses.delete');
Route::post('/expense/update/{id}', 'ExpenseController@updateExpense')->name('expenses.update');

Route::post('/todo/create', 'TodoController@createTodo')->name('todo.create');
Route::get('/todo/list/{roomId}', 'TodoController@readTodos')->name('todo.read');
Route::get('/todo/{id}', 'TodoController@readTodoDetail')->name('todo.read.detail');
Route::post('/todo/delete/{id}', 'TodoController@deleteTodo')->name('todo.delete');