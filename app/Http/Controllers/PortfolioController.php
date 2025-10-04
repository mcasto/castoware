<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class PortfolioController extends Controller
{
    public function index()
    {
        return Cache::remember('portolio', 24 * 60, function () {
            return Portfolio::orderBy('sort_order')
                ->get();
        });
    }
}
