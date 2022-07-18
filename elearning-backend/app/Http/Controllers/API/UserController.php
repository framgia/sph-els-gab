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
        $validator = $request->validated();
        $avatarfile = "";

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $request->input("username") . '.' . $extension;
            $file->move(public_path() . '\\uploads\\avatar\\', $filename);

            $avatarfile = $filename;
        }

        $user = User::create([
            "username" => $validator["username"],
            "password" => $validator["password"],
            "email" => $validator["email"]
        ]);

        Userprofile::create([
            'user_id' => $user->id,
            'avatar' => $avatarfile,
            'firstname' => $validator['firstname'],
            'middlename' => $validator['middlename'],
            'lastname' => $validator['lastname'],
            'sex' => $validator['sex'],
            'phone' => $validator['phone'],
            'address' => $validator['address'],
            'birthdate' => $validator['birthdate'],
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        auth()->login($user);

        return response()->json([
            'token'=> $token,
        ]);
    }
    
    public function update(UserProfileInformationPostRequest $request)
    {
        $validator = $request->validated();
        $user = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();
        $avatarfile = "";

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $request->input("username"). '.' . $extension;
            $file->move(public_path() . '\\uploads\\avatar\\', $filename);

            $avatarfile = $filename;
        }
        else {
            $filepath = public_path() . '\\uploads\\avatar\\' . $request->input("username") . '.*';

            if ($result = glob($filepath)) {
                File::delete($result[0]);
            }
        }

        UserProfile::where("user_id", $user->id)->update([  
            'firstname' => $validator['firstname'],
            'avatar' => $avatarfile,
            'middlename' => $validator['middlename'],
            'lastname' => $validator['lastname'],
            'sex' => $validator['sex'],
            'phone' => $validator['phone'],
            'address' => $validator['address'],
            'birthdate' => $validator['birthdate'],
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
