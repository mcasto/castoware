<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    public function index()
    {
        return [
            'one' => view('home.section-one')->render(),
            'two' => view('home.section-two')->render()
        ];
    }
}
