<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

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
            'url' => 'string|required|url'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $valid = $validator->valid();

        $sortOrder = Portfolio::max('sort_order') ?? -1;

        $rec = Portfolio::create([
            'site_name' => $valid['site_name'],
            'url' => $valid['url'],
            'image' => '', // Will be updated by artisan command
            'sort_order' => $sortOrder + 1
        ]);

        // Call artisan command to generate screenshot
        Artisan::call('app:update-portfolio-image', [
            '--id' => $rec->id,
            '--url' => $valid['url']
        ]);

        // Refresh to get updated image path
        $rec->refresh();

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success', 'data' => $rec];
    }

    public function update(int $id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'site_name' => 'string|required',
            'url' => 'string|required|url'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $rec = Portfolio::find($id);
        if (!$rec) {
            return ['status' => 'error', 'message' => 'Portfolio record not found.'];
        }

        $valid = $validator->valid();

        $rec->site_name = $valid['site_name'];

        // If URL changed, regenerate screenshot
        if ($rec->url !== $valid['url']) {
            $rec->url = $valid['url'];
            $rec->save();

            Artisan::call('app:update-portfolio-image', [
                '--id' => $rec->id,
                '--url' => $valid['url']
            ]);

            $rec->refresh();
        } else {
            $rec->save();
        }

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success', 'data' => $rec];
    }

    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:portfolios,id',
            'items.*.sort_order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $items = $request->input('items');

        foreach ($items as $item) {
            Portfolio::where('id', $item['id'])
                ->update(['sort_order' => $item['sort_order']]);
        }

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success', 'message' => 'Order updated successfully.'];
    }

    public function destroy(int $id)
    {
        $rec = Portfolio::find($id);
        if (!$rec) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $rec->delete();

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success'];
    }
}
