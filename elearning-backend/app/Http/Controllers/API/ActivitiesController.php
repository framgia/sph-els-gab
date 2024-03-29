<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\FollowStatistic;
use App\Models\User;
use App\Models\UserActivity;
use App\Models\UserProfile;
use App\Models\WordsLearned;
use Illuminate\Http\Request;

class ActivitiesController extends Controller
{
    public function index()
    {
        $activities = UserActivity::with('user.profile')->orderBy('created_at', 'DESC')->get();
        return response()->json($this->setActivityInfo($activities));
    }

    public function show($id)
    {
        $activities = UserActivity::with('user.profile')->where('user_id', $id)->get();
        return response()->json($this->setActivityInfo($activities));
    }

    public function storeActivity($data, $user)
    {
        UserActivity::create([
            'activity_id' => $data->id,
            'activity_type_type' => get_class($data),
            'activity_type_id' => $data->id,
            'user_id' => $user
        ]);
    }

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
        
        $this->storeActivity($followActivity, $user);
    }

    public function storeQuizActivity(Request $request)
    {
        $user = auth()->user()->id;
        $category_id = Category::where('slug', $request->input('slug'))->first()->id;

        $countWordActivity = WordsLearned::where('user_id', auth()->user()->id)->where('category_id', $category_id)->count();
        
        if ($countWordActivity > 0) {
            return;
        }
        else {
            $quizActivity = WordsLearned::create([
                'user_id' => $user,
                'category_id' => $category_id
            ]);
            
            $this->storeActivity($quizActivity, $user);
        }
    }

    public function deleteFollowActivity($id)
    {
        $followActivity = FollowStatistic::where('follower_user_id', auth()->user()->id)->where('followee_user_id', $id)->first();
        $followActivity->delete();
        UserActivity::find($followActivity->activity->id)->delete();
    }

    public function setActivityInfo($activities)
    {
        $data = collect($activities)->map(function($activity) {
            $activity = $activity->activity_type;
            $activity->user = auth()->user()->id;
            
            if (get_class($activity) === FollowStatistic::class) {
                $activity->type = 'follow';
                $activity->follower = UserProfile::where('user_id', $activity->follower_user_id)->first();
                $activity->followee = UserProfile::where('user_id', $activity->followee_user_id)->first();
            }
            else if (get_class($activity) === WordsLearned::class) {
                $activity->type = 'words';
                $activity->category_info = Category::find($activity->category_id);
                $activity->user_profile = User::with('profile')->find($activity->user_id);
            }

            return $activity;
        });

        return $data;
    }
}
