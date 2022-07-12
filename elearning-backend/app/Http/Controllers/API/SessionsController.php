<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFieldPostRequest;
use App\Models\User;
use Illuminate\Http\Request;

class SessionsController extends Controller
{
    public function login(Request $request)
    {
        $validator = UserFieldPostRequest::createFrom($request);
        $validator->module = "login";

        if(auth()->attempt([
            "email" => $validator->input('email'),
            "password" => $validator->input('password')
        ])) {
            session()->regenerate();

            $data = [];
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
