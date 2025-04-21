<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use App\Models\QueuedMovie;
use Illuminate\Support\Facades\Auth;

class TMDBController extends Controller
{
    public function getGenres()
    {
        $response = Http::get("https://api.themoviedb.org/3/genre/movie/list", [
            'api_key' => config('services.tmdb.key'),
            'language' => 'en-US',
        ]);

        if ($response->successful()) {
            return response()->json($response->json()['genres']);
        }

        return response()->json(['error' => 'Failed to fetch genres'], 500);
    }

    public function fetchAllMovies(Request $request)
{
    if (!Auth::check()) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $apiKey = config('services.tmdb.key');
    $search = trim($request->input('search', ''));
    $genre = $request->input('genre');
    $minRating = $request->input('min_rating', 1);
    $maxRating = $request->input('max_rating', 10);
    $sort = $request->input('sort', 'title_asc');
    $requestedPage = (int) $request->input('page', 1);
    $perPage = 20;

    $endpoint = $search 
        ? 'https://api.themoviedb.org/3/search/movie'
        : 'https://api.themoviedb.org/3/discover/movie';

        $baseParams = [
            'api_key' => $apiKey,
            'language' => 'en-US',
            'region' => 'US',
            'vote_average.gte' => $minRating,
            'vote_average.lte' => $maxRating,
            'include_adult' => false, // Exclude adult content
        ];

    if ($search) {
        $baseParams['query'] = $search;
    }

    if ($genre) {
        $baseParams['with_genres'] = $genre;
    }

    $allMovies = collect();
    $maxPages = 10; // 🔁 Limit to first 5 pages (100 results max)

    try {
        for ($page = 1; $page <= $maxPages; $page++) {
            $params = array_merge($baseParams, ['page' => $page]);
            $response = Http::get($endpoint, $params);

            if (!$response->successful()) {
                break;
            }

            $data = $response->json();
            $allMovies = $allMovies->merge($data['results']);

            if ($page >= $data['total_pages']) {
                break;
            }
        }

        // Filter out movies without posters
        $allMovies = $allMovies->filter(fn($movie) => isset($movie['poster_path']));

        // Manual sort
        if (str_starts_with($sort, 'title')) {
            $allMovies = $sort === 'title_asc' 
                ? $allMovies->sortBy('title') 
                : $allMovies->sortByDesc('title');
        } elseif (str_starts_with($sort, 'release')) {
            $allMovies = $sort === 'release_asc' 
                ? $allMovies->sortBy('release_date') 
                : $allMovies->sortByDesc('release_date');
        } elseif (str_starts_with($sort, 'rating')) {
            $allMovies = $sort === 'rating_asc' 
                ? $allMovies->sortBy('vote_average') 
                : $allMovies->sortByDesc('vote_average');
        }

        // Format release date and rating
        $allMovies = $allMovies->map(function ($movie) {
            if (!empty($movie['release_date'])) {
                $movie['release_date'] = Carbon::parse($movie['release_date'])->format('M d, Y');
            }
            if (isset($movie['vote_average'])) {
                $movie['vote_average'] = round($movie['vote_average'], 1);
            }
            return $movie;
        })->values();

        // Manual pagination
        $paginated = $allMovies->slice(($requestedPage - 1) * $perPage, $perPage)->values();

        return response()->json([
            'data' => $paginated,
            'total' => $allMovies->count(),
            'current_page' => $requestedPage,
            'total_pages' => ceil($allMovies->count() / $perPage),
        ]);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch movies: ' . $e->getMessage()], 500);
    }
}


public function addToQueue(Request $request)
{

    $validated = $request->validate([
        'tmdb_id' => 'required|integer',
        'title' => 'required|string',
        'poster_path' => 'nullable|string',
        'release_date' => 'nullable|date',
        'overview' => 'nullable|string',
        'rating' => 'nullable|numeric',
    ]);

    // Optional: check if already queued
    $existing = QueuedMovie::where('tmdb_id', $validated['tmdb_id'])->first();
    if ($existing) {
        return response()->json(['message' => 'Movie is already in the queue.'], 200);
    }

    $queuedMovie = QueuedMovie::create([
        'user_id' => auth()->id(),  // Assign the current authenticated user's ID
        'tmdb_id' => $validated['tmdb_id'],
        'title' => $validated['title'],
        'poster_path' => $validated['poster_path'],
        'release_date' => $validated['release_date'],
        'overview' => $validated['overview'],
        'rating' => $validated['rating'],
    ]);

    return response()->json(['message' => 'Movie added to queue!'], 201);
}
public function getQueuedMovies()
{
    return QueuedMovie::orderBy('created_at', 'desc')->get();
}
public function destroy($tmdb_id)
{
    $user = auth()->user();

    $movie = $user->queuedMovies()->where('tmdb_id', $tmdb_id)->first();

    if (!$movie) {
        return response()->json(['message' => 'Movie not found in queue.'], 404);
    }

    $movie->delete();

    return response()->json(['message' => 'Movie removed from queue.'], 200);
}

}
