<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function index()
    {
        $user = User::where("id", auth()->user()->id)->with('profile')->get()->first();

        return response()->json([
            'user'=> $user,
        ]);
    }

    public function delete(Request $request)
    {
        User::where("id", $request->input("id"))->delete();
    }
}
