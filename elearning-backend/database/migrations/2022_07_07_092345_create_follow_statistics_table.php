<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('follow_statistics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('follower_user_id');
            $table->unsignedBigInteger('followee_user_id');
            $table->timestamps();

            $table->foreign('follower_user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('followee_user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('follow_statistics');
    }
}
