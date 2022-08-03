<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordsLearned extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'words_learned';

    public function activity()
    {
        return $this->morphOne(UserActivity::class, 'activity_type');
    }
}
