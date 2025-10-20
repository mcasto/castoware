<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

// mc-todo: update to use `php artisan app:update-portfolio-image --id={id} --url={url}`

class PortfolioController extends Controller
{
    public function index()
    {
        return Cache::rememberForever('castoware-portfolio', function () {
            return ['status' => 'success', 'data' => Portfolio::orderBy('sort_order')
                ->get()];
        });
    }

    public function count()
    {
        return Portfolio::count();
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'site_name' => 'string|required',
            'url' => 'string|required',
            'filename' => 'string|required'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $valid = $validator->valid();

        $filename = $request->filename;
        $contents = Storage::disk('local')
            ->get("uploaded-images/{$filename}");
        Storage::disk('public')
            ->put("portfolio/{$filename}", $contents);
        Storage::disk('local')
            ->delete("uploaded-images/{$filename}");

        $sortOrder = Portfolio::max('sort_order');

        $rec = [
            'site_name' => $valid['site_name'],
            'url' => $valid['url'],
            'image' => "/storage/portfolio/{$filename}",
            'sort_order' => $sortOrder + 1
        ];

        $stored = Portfolio::create($rec);

        return ['status' => 'success', 'rec' => $stored];
    }

    public function update(int $id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'site_name' => 'string|required',
            'url' => 'string|required'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $rec = Portfolio::find($id);
        if (!$rec) {
            return ['status' => 'error', 'message' => 'Profile record not found.'];
        }

        $valid = $validator->valid();

        if ($valid['replaceImage']) {
            $filename = $request->filename;
            $contents = Storage::disk('local')
                ->get("uploaded-images/{$filename}");
            Storage::disk('public')
                ->put("portfolio/{$filename}", $contents);
            Storage::disk('local')
                ->delete("uploaded-images/{$filename}");

            $rec->image = "/storage/portfolio/{$filename}";
        }

        $rec->site_name = $valid['site_name'];
        $rec->url = $valid['url'];
        $rec->save();

        return ['status' => 'success', 'rec' => $rec];
    }

    public function destroy(int $id)
    {
        $rec = Portfolio::find($id);
        if (!$rec) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $rec->delete();

        return ['status' => 'success'];
    }
}
