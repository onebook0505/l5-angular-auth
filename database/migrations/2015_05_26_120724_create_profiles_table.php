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
