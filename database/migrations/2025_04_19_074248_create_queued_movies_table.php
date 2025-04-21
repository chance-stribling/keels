<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('queued_movies', function (Blueprint $table) {
        $table->id();
        $table->string('tmdb_id');
        $table->string('title');
        $table->text('overview')->nullable();
        $table->string('poster_path')->nullable();
        $table->string('release_date')->nullable();
        $table->boolean('watched')->nullable();
        $table->decimal('rating', 3, 1)->nullable();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queued_movies');
    }
    


};
