<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Services\ScreenshotService;
use Illuminate\Http\Request;
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

    public function store(Request $request, ScreenshotService $screenshots)
    {
        $validator = Validator::make($request->all(), [
            'site_name' => 'string|required',
            'url' => 'string|required|url'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $valid = $validator->valid();

        // Make sure the screenshot API is up before creating anything
        if ($error = $screenshots->status()) {
            return ['status' => 'error', 'message' => $error];
        }

        $sortOrder = Portfolio::max('sort_order') ?? -1;

        $rec = Portfolio::create([
            'site_name' => $valid['site_name'],
            'url' => $valid['url'],
            'image' => '', // Resolved from storage by the model accessor
            'sort_order' => $sortOrder + 1
        ]);

        $warning = $this->captureScreenshot($screenshots, $rec);

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success', 'data' => $rec, 'warning' => $warning];
    }

    /**
     * Returns null on success, or a warning message if the screenshot failed.
     */
    private function captureScreenshot(ScreenshotService $screenshots, Portfolio $rec): ?string
    {
        set_time_limit(ScreenshotService::CONNECT_TIMEOUT + ScreenshotService::CAPTURE_TIMEOUT + 15);

        $error = $screenshots->capture($rec->id, $rec->url);

        if ($error) {
            logger()->warning("Portfolio {$rec->id} screenshot failed: {$error}");
            return "Site saved, but the screenshot could not be captured: {$error}";
        }

        $rec->refresh();

        return null;
    }

    public function update(int $id, Request $request, ScreenshotService $screenshots)
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
        $warning = null;

        // If URL changed, regenerate screenshot
        if ($rec->url !== $valid['url']) {
            if ($error = $screenshots->status()) {
                return ['status' => 'error', 'message' => $error];
            }

            $rec->url = $valid['url'];
            $rec->save();

            $warning = $this->captureScreenshot($screenshots, $rec);
        } else {
            $rec->save();
        }

        // Clear cache
        Cache::forget('castoware-portfolio');

        return ['status' => 'success', 'data' => $rec, 'warning' => $warning];
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
