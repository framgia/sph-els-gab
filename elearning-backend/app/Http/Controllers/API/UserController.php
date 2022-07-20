<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserProfileInformationPostRequest;
use App\Http\Requests\UserRegisterPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where("id", auth()->user()->id)->with('profile')->get()->first();

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
            "username" => $request->username,
            "password" => $request->password,
            "email" => $request->email,
        ]);

        Userprofile::create([
            'user_id' => $user->id,
            'avatar' => $avatarfile,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'sex' => $request->sex,
            'phone' => $request->phone,
            'address' => $request->address,
            'birthdate' => $request->birthdate,
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        auth()->login($user);

        return response()->json([
            'token'=> $token,
        ]);
    }
    
    public function update(UserProfileInformationPostRequest $request)
    {
        $currentUser = auth()->user()->id;
        $user = User::where("id", $currentUser)->with('profile')->get()->first();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $user->username . '.' . $extension;
            $file->move(public_path() . '\\uploads\\avatar\\', $filename);

            UserProfile::where("user_id", $currentUser)->update(['avatar' => $filename]);
        }

        if ($request->input('hasAvatar') == 'false') {
            $filepath = public_path() . '\\uploads\\avatar\\' . $user->username . '.*';

            if ($result = glob($filepath)) {
                File::delete($result[0]);
            }

            UserProfile::where("user_id", $currentUser)->update(['avatar' => ""]);
        }

        UserProfile::where("user_id", $currentUser)->update([  
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'sex' => $request->sex,
            'phone' => $request->phone,
            'address' => $request->address,
            'birthdate' => $request->birthdate,
        ]);
    }
}
