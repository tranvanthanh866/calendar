<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarDateTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('calendar_date', function(Blueprint $table) {
            $table->increments('calendar_date_id');

            $table->integer('calendar_event_id')->unsigned();
            $table->date('date_start');
            $table->date('date_end');
            $table->string('background_color')->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->boolean('is_all_day')->default(0);

            $table->timestamps();
            $table->softDeletes();
            $table->foreign('calendar_event_id')->references('calendar_event_id')->on('calendar_event');
            $table->foreign('user_id')->references('id')->on('users');



        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('calendar_date');
	}

}
