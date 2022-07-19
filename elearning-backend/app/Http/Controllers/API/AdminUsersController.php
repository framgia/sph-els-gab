<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUsersPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Laravel\Sanctum\PersonalAccessToken;

class AdminUsersController extends Controller
{
    // Retrieve all users
    public function index(Request $request)
    {
        // Exculde current user
        $currentUser = auth()->user()->id;
        $users = User::where("id", "!=", $currentUser)->with('profile')->get();

        return response()->json([
            'users'=> $users,
        ]);
    }

    // Get selected user and its profile
    public function getUser(Request $request)
    {
        $user = User::where("id", $request->id)->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    // Update selected user's profile
    public function update(AdminUsersPostRequest $request)
    {
        $user = User::where("id", $request->input("user"))->with('profile')->get()->first();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $user->username . '.' . $extension;
            $file->move(public_path() . '\\uploads\\avatar\\', $filename);

            UserProfile::where("user_id", $user->id)->update(['avatar' => $filename]);
        }

        if ($request->input('hasAvatar') == 'false') {
            $filepath = public_path() . '\\uploads\\avatar\\' . $user->username . '.*';

            if ($result = glob($filepath)) {
                File::delete($result[0]);
            }

            UserProfile::where("user_id", $user->id)->update(['avatar' => ""]);
        }

        UserProfile::where("user_id", $user->id)->update([  
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'sex' => $request->sex,
            'phone' => $request->phone,
            'address' => $request->address,
            'birthdate' => $request->birthdate,
        ]);
    }

    // Delete selected user
    public function delete(Request $request)
    {
        $user = User::where("id", $request->id)->with('profile')->get()->first();
        File::delete(public_path() . '\\uploads\\avatar\\' . $user->profile['avatar']);
        User::where("id", $request->id)->delete();
    }
}
