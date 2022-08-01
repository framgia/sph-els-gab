<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowStatistic extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function activity()
    {
        return $this->morphOne(UserActivity::class, 'activity_type');
    }
}
