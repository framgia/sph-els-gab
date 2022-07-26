<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminUsersPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AdminUsersController extends Controller
{
    public function index()
    {
        // Exculde current user
        $currentUser = auth()->user()->id;
        $users = User::where("id", "!=", $currentUser)->with('profile')->get();

        return response()->json([
            'users'=> $users,
        ]);
    }

    public function getUser($id)
    {
        $user = User::where("id", $id)->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    public function update($id, AdminUsersPostRequest $request)
    {
        $user = User::where("id", $id)->with('profile')->get()->first();

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
    
    public function delete(Request $request)
    {
        $user = User::where("id", $request->id)->with('profile')->get()->first();
        File::delete(public_path() . '\\uploads\\avatar\\' . $user->profile['avatar']);
        User::where("id", $request->id)->delete();
    }
}
