<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
    });
