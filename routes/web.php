<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TMDBController;
use App\Http\Controllers\GenreController;

// TMDb
Route::get('tmdb/search', [TMDBController::class, 'fetchAllMovies']);
Route::get('tmdb/genres', [TMDBController::class, 'getGenres']);

Route::middleware('auth')->group(function () {
    Route::post('/queue', [TMDBController::class, 'addToQueue']);
    Route::get('/queue', [TMDBController::class, 'getQueuedMovies']);
    Route::delete('/queue/{tmdb_id}', [TMDBController::class, 'destroy']);
    Route::post('/queue/{id}/watched', [TMDBController::class, 'markAsWatched']);
    Route::patch('/queue/{id}/watched', [TMDBController::class, 'markAsWatched']);
});
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/compliments', function () {
    return Inertia::render('Interactives/Compliments');
})->middleware(['auth', 'verified'])->name('compliments');

Route::get('/movies', function () {
    return Inertia::render('Interactives/Movies');
})->middleware(['auth', 'verified'])->name('movies');

Route::get('/shows', function () {
    return Inertia::render('Interactives/Shows');
})->middleware(['auth', 'verified'])->name('shows');

Route::get('/food', function () {
    return Inertia::render('Interactives/Food');
})->middleware(['auth', 'verified'])->name('food');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
