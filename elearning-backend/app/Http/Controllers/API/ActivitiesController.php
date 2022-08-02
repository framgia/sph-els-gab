<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FollowStatistic;
use App\Models\UserActivity;

class ActivitiesController extends Controller
{
    public function storeFollowActivity($id)
    {
        $user = auth()->user()->id;

        $countFollowActivity = FollowStatistic::where('follower_user_id', auth()->user()->id)->where('followee_user_id', $id)->count();
        
        if ($countFollowActivity > 0) {
            throw new \ErrorException('You already followed this user!');
            return;
        }

        $followActivity = FollowStatistic::create([
            'follower_user_id' => $user,
            'followee_user_id' => $id
        ]);

        UserActivity::create([
            'activity_id' => $followActivity->id,
            'activity_type_type' => get_class($followActivity),
            'activity_type_id' => $followActivity->id,
            'user_id' => $user
        ]);
    }

    public function deleteFollowActivity($id)
    {
        $followActivity = FollowStatistic::where('follower_user_id', auth()->user()->id)->where('followee_user_id', $id)->first();
        $followActivity->delete();
        UserActivity::find($followActivity->activity->id)->delete();
    }
}
