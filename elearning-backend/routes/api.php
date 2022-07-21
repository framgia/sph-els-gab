<?php

use App\Http\Controllers\API\AdminWordsController;
use App\Http\Controllers\API\AdminUsersController;
use App\Http\Controllers\API\AdminCategoriesController;
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
    Route::get('/user', [UserProfileController::class, 'index']);
    Route::post('/user', [UserProfileController::class, 'index']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::post('/logout', [SessionsController::class, 'logout']);

    // Admin Routes
    Route::get('/admin/users', [AdminUsersController::class, 'index']);
    Route::get('/admin/user/{id}', [AdminUsersController::class, 'getUser']);
    Route::patch('/admin/user/{id}', [AdminUsersController::class, 'update']);
    Route::delete('/admin/user/{id}', [AdminUsersController::class, 'delete']);
    
    Route::get('/admin/categories', [AdminCategoriesController::class, 'index']);
    Route::get('/admin/category/{id}', [AdminCategoriesController::class, 'getCategory']);
    Route::post('/admin/category', [AdminCategoriesController::class, 'store']);
    Route::put('/admin/category/{id}', [AdminCategoriesController::class, 'update']);
    Route::delete('/admin/category/{id}', [AdminCategoriesController::class, 'delete']);

    Route::get('/admin/category/{id}/quizzes', [AdminWordsController::class, 'index']);
    Route::post('/admin/quizzes', [AdminWordsController::class, 'store']);
});
