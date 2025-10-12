<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function index()
    {
        return Cache::rememberForever('castoware-about', function () {
            return ['status' => 'success', 'data' => json_decode(Storage::disk('local')
                ->get('about-us.json'))];
        });
    }
}
