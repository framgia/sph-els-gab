<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserProfileInformationPostRequest;
use App\Http\Requests\UserRegisterPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    public function store(UserRegisterPostRequest $request)
    {
        $avatarfile = "";

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $request->input("username") . '.' . $extension;
            $file->move(public_path() . '\\uploads\\avatar\\', $filename);

            $avatarfile = $filename;
        }

        $user = User::create([
            "username" => $request->input("username"),
            "password" => $request->input("password"),
            "email" => $request->input("email"),
        ]);

        Userprofile::create([
            'user_id' => $user->id,
            'avatar' => $avatarfile,
            'firstname' => $request->input('firstname'),
            'middlename' => $request->input('middlename'),
            'lastname' => $request->input('lastname'),
            'sex' => $request->input('sex'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'birthdate' => $request->input('birthdate'),
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        auth()->login($user);

        return response()->json([
            'token'=> $token,
        ]);
    }
    
    public function update(UserProfileInformationPostRequest $request)
    {
        $user = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();

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
            'firstname' => $request->input('firstname'),
            'middlename' => $request->input('middlename'),
            'lastname' => $request->input('lastname'),
            'sex' => $request->input('sex'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'birthdate' => $request->input('birthdate'),
        ]);
    }

    public function delete(Request $request)
    {
        $user = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();
        $file = $user->avatar;

        File::delete(public_path() . '\\uploads\\avatar\\' . $file);
        User::where("id", $request->input("id"))->delete();
    }
}
