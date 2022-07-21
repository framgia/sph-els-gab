<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function quizzes()
    {
        return $this->hasMany(Word::class, 'categpry_id', 'id');
    }
}
