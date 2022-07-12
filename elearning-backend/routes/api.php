<?php

use App\Http\Controllers\API\SessionsController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UserProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [SessionsController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    // Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);

    // Route::get('/users', [UserController::class, 'index']);
    Route::post('/user', [UserProfileController::class, 'index']);
    Route::post('/update-user', [UserController::class, 'update']);
    Route::post('/logout', [SessionsController::class, 'logout']);
});