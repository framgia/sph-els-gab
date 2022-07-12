<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFieldPostRequest;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $validator = UserFieldPostRequest::createFrom($request);
        $validator->module = 'register';
        $avatarfile = "";

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $extension = $file->getClientOriginalExtension();
            $filename = $request->input("username") . '.' . $extension;
            $file->move('uploads/', $filename);

            $avatarfile = $filename;
        }

        $user = User::create([
            "username" => $validator->input("username"),
            "password" => $validator->input("password"),
            "email" => $validator->input("email")
        ]);

        Userprofile::create([
            'user_id' => $user->id,
            'avatar' => $avatarfile,
            'firstname' => $validator->input('firstname'),
            'middlename' => $validator->input('middlename'),
            'lastname' => $validator->input('lastname'),
            'sex' => $validator->input('sex'),
            'phone' => $validator->input('phone'),
            'address' => $validator->input('address'),
            'birthdate' => $validator->input('birthdate'),
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;
        auth()->login($user);

        return response()->json([
            'token'=> $token,
        ]);
    }
    
    public function update(Request $request)
    {
        $validator = UserFieldPostRequest::createFrom($request);
        $validator->module = 'update_profile';

        $user = PersonalAccessToken::findToken($validator->input('token'))->tokenable()->with('profile')->get()->first();

        UserProfile::where("user_id", $user->id)->update([
            'firstname' => $validator->input('firstname'),
            'middlename' => $validator->input('middlename'),
            'lastname' => $validator->input('lastname'),
            'sex' => $validator->input('sex'),
            'phone' => $validator->input('phone'),
            'address' => $validator->input('address'),
            'birthdate' => $validator->input('birthdate'),
        ]);
    }

    public function delete(Request $request)
    {
        User::where("id", $request->input("id"))->delete();
    }
}
