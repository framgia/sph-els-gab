<?php

use App\Http\Controllers\API\AdminUsersController;
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

Route::post('/login', [SessionsController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    // Authenticated Routes
    Route::post('/user', [UserProfileController::class, 'index']);
    Route::post('/update-user', [UserController::class, 'update']);
    Route::post('/logout', [SessionsController::class, 'logout']);

    // Admin Routes
    Route::post('/admin/all-users', [AdminUsersController::class, 'index']);
    Route::post('/admin/single-user', [AdminUsersController::class, 'getUser']);
    Route::post('/admin/update-user', [AdminUsersController::class, 'update']);
    Route::post('/admin/delete-user', [AdminUsersController::class, 'delete']);
});
