<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class UserProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = PersonalAccessToken::findToken($request->input('token'))->tokenable()->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    public function delete(Request $request)
    {
        User::where("id", $request->input("id"))->delete();
    }
}
