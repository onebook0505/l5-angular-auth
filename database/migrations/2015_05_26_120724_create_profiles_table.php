<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('profile', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('profilePic')->default('http://b2.com/Images/Anony.jpg');
            $table->string('about', 255);
            //如果要加入讓使用者客製化 userurl ，同時又有第三方服務的話複雜度將會提高不少
			$table->string('userurl')->unique()->nullable();
            $table->integer('userid')->unsigned();
            $table->timestamps();

            $table->foreign('userid')->references('id')->on('users')->onDelete('cascade');
        	
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('profile');
	}

}
