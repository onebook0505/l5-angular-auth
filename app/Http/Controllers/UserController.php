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
	public function index()
	{
		$user = User::where('userurl', $userurl)->first();

		return response()->json($user);
	}

	public function upload()
	{
		// return Request::all();
	    $file = Request::file('user_file'); // 取得檔案相關資料存在$file
	    $extension = $file->getClientOriginalExtension(); // 取得副檔名
	    $file_name = strval(time()).str_random(5).'.'.$extension; // 產生新的檔案名稱

	    $destination_path = public_path().'/user-upload/'; // 上傳的檔案要存在伺服器哪個資料夾

	    if (Request::hasFile('user_file')) { // hasFile確認是否有上傳
	    	Storage::disk('local')->put($file->getFilename().'.'.$extension,  File::get($file));
	        //$upload_success = $file->move($destination_path, $file_name); // 上傳成功就把檔案移至$destination_path、用$file_name重新命名
	        return response()->json(array('success' => true));
	    } else {
	        return response()->json(array('success' => false));
	    }

	    // $user_obj = \Auth::user(); // 現在登入的user存在$user_obj
	    // $user_obj->avatar = $file_name; // user的user_icon欄位存入$file_name
	    // $user_obj->save();

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
	public function edit($id)
	{
		//
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
