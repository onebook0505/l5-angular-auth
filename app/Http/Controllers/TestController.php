<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades;

class TestController extends Controller {

	/**
	 * 
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{

		//dd(\Auth::user()->id);
		//dd(\Auth::check());
		//dd(\Auth::viaRemember());
		return $request->all();
	}

	public function test(Request $request)
	{
		return '123';
	}

}
