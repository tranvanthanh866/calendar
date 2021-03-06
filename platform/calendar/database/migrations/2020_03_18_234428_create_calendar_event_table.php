<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarEventTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('calendar_event', function(Blueprint $table) {
            $table->increments('calendar_event_id');
            $table->softDeletes();
            $table->string('title');
            $table->text('description');

            //$table->dateTime('start');
            //$table->dateTime('end');

            $table->time('time_start')->nullable();
            $table->time('time_end')->nullable();


            $table->string('background_color')->nullable();
            $table->string('background_color_name')->nullable();
            $table->string('text_color')->nullable();
            $table->string('text_color_name')->nullable();
            $table->string('border_color')->nullable();
            $table->timestamps();

        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('calendar_event');
	}

}
