<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(PortfolioController::class)
    ->group(function () {
        Route::get('/portfolio', 'index');
    });


Route::controller(ContactController::class)
    ->group(function () {
        Route::post('/contact', 'store');
    });
