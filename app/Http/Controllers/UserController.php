<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;

use Illuminate\Http\Response;

// use Illuminate\Http\Request;
use Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class UserController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($userurl)
	{
		$user = User::where('userurl', $userurl)->first();

		return response()->json($user);
	}

	public function upload()
	{
	    $file = Request::file('file');
	    $extension = $file->getClientOriginalExtension();

	    if (Request::hasFile('file')) {

	    	Storage::disk('local')->put($file->getFilename().'.'.$extension,  File::get($file));
	        return response()->json(array('success' => true));
	    } else {
	        return response()->json(array('success' => false));
	    }

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit()
	{
		$file = Request::file('file'); // 取得檔案相關資料存在$file
	    $extension = $file->getClientOriginalExtension(); // 取得副檔名

	    if (Request::hasFile('file')) { // hasFile確認是否有上傳

	    	$user_obj = \Auth::user(); // 現在登入的user存在$user_obj
	    	if($user_obj->avatar == '250x250.gif'){ //如果使用者原本的頭像不是 250x250.gif
	    	} else {
	    		Storage::delete($user_obj->avatar); //從檔案庫裡刪除原本的圖檔
	    	}
	    	$user_obj->avatar = $file->getFilename().'.'.$extension; //把圖檔名稱存在資料庫裡
	    	$user_obj->save();
	    	
	    	Storage::disk('local')->put($file->getFilename().'.'.$extension,  File::get($file));
	        return response()->json(array('success' => true));
	    } else {
	        return response()->json(array('success' => false));
	    }
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
