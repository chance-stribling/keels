<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GenreController extends Controller
{
    public function getGenres()
    {
        try {
            $response = Http::get('https://api.themoviedb.org/3/genre/movie/list', [
                'api_key' => env('TMDB_API_KEY'), // Store your TMDB API key in .env
                'language' => 'en-US',
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch genres'], 500);
        }
    }
}

