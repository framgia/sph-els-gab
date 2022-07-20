<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginPostRequest;
use App\Models\User;

class SessionsController extends Controller
{
    public function login(UserLoginPostRequest $request)
    {
        if(auth()->attempt([
            "email" => $request->email,
            "password" => $request->password,
        ])) {
            session()->regenerate();

            $user = User::with('profile')->find(auth()->user()->id);
            $token = $user->createToken('myapptoken')->plainTextToken;

            return response()->json([
                "user" => $user,
                "token" => $token,
            ]);
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        auth('web')->logout();
    }
}
