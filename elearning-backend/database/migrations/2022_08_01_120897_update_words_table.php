<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateWordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('words_learned', function(Blueprint $table) {
            $table->dropForeign('words_learned_word_id_foreign');
            $table->dropColumn('word_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('words_learned', function(Blueprint $table) {
            $table->dropForeign('words_learned_category_id_foreign');
            $table->dropColumn('category_id');
            $table->unsignedBigInteger('word_id');
            $table->foreign('word_id')->references('id')->on('words')->cascadeOnDelete();
        });
    }
}
