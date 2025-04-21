<?php

namespace App\Models;
use App\Models\User;

use Illuminate\Database\Eloquent\Model;

class QueuedMovie extends Model
{
    protected $fillable = [
        'tmdb_id',
        'title',
        'poster_path',
        'release_date',
        'rating',
        'overview',
        'watched',
        'user_id'
    ];
    public function user()
{
    return $this->belongsTo(User::class);
}

}
