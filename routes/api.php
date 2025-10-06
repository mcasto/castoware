<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\UploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AboutController::class)
    ->group(function () {
        Route::get('/about-us', 'index');
    });

Route::controller(AuthController::class)
    ->group(function () {
        Route::post('/login', 'login');
        Route::get('/validate-token', 'validateToken');
        Route::get('/logout', 'logout')
            ->middleware('auth:sanctum');
    });

Route::controller(ContactController::class)
    ->group(function () {
        Route::post('/contact', 'store');
        Route::get('/contacts', 'index')
            ->middleware('auth:sanctum');
        Route::delete('/contacts/{id}', 'destroy')
            ->middleware('auth:sanctum');
    });


Route::controller(PortfolioController::class)
    ->group(function () {
        Route::get('/portfolio', 'index');
        Route::post('/portfolio', 'store')
            ->middleware('auth:sanctum');
        Route::put('/portfolio/{id}', 'update')
            ->middleware('auth:sanctum');
        Route::delete('/portfolio/{id}', 'destroy')
            ->middleware('auth:sanctum');
    });

Route::post('/handle-upload', [UploadController::class, 'store'])
    ->middleware('auth:sanctum');
