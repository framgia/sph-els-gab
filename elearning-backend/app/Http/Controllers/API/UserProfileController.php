<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class UserProfileController extends Controller
{
    public function index()
    {
        $user = auth()->user()->profile;

        return response()->json($user);
    }
}
