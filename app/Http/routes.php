<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', function() {
	return view('spa');
});

// Route::get('/signin', function(){
// 	return redirect('/#!/signin');
// });

//測試用 Route
//Route::get('/test', 'TestController@index');
Route::post('/test', 'TestController@index');
Route::get('/test', 'TestController@test');
Route::get('/user', 'TestController@user');


// API ROUTES ==================================  
Route::group(array('prefix' => 'api'), function() {
		Route::controllers([
		'auth' => 'Auth\AuthController',
		'password' => 'Auth\PasswordController',
	]);

	Route::get('/resendEmail', 'Auth\AuthController@resendEmail');

	Route::get('/activate/{code}', 'Auth\AuthController@activateAccount');

	Route::get('/login/{provider}', 'Auth\AuthController@login');

	Route::get('/user/{userurl}', 'ProfileController@index');
  
});

Route::any('{path}', function() {     
	return view('spa');
});









