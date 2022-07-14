<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminFieldPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Laravel\Sanctum\PersonalAccessToken;

class AdminUsersController extends Controller
{
    public function index(Request $request)
    {
        // Exculde current user
        $currentUser = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();
        $users = User::where("id", "!=", $currentUser->id)->with('profile')->get();

        return response()->json([
            'users'=> $users,
        ]);
    }

    public function store(Request $request)
    {
        $user = User::where("id", $request->input('user'))->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    public function update(Request $request)
    {
        $validator = AdminFieldPostRequest::createFrom($request);
        $validator->module = 'update_profile';

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
            'firstname' => $validator->input('firstname'),
            'middlename' => $validator->input('middlename'),
            'lastname' => $validator->input('lastname'),
            'sex' => $validator->input('sex'),
            'phone' => $validator->input('phone'),
            'address' => $validator->input('address'),
            'birthdate' => $validator->input('birthdate'),
        ]);
        
        return response()->json([
            'users'=> $user->username,
        ]);
    }

    public function delete(Request $request)
    {
        $user = User::where("id", $request->input("user"))->with('profile')->get()->first();

        File::delete(public_path() . '\\uploads\\avatar\\' . $user->profile['avatar']);
        User::where("id", $request->input("user"))->delete();
    }
}
