<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AboutController extends Controller
{
    public function index()
    {
        return Cache::rememberForever('castoware-about', function () {
            return ['status' => 'success', 'data' => json_decode(Storage::disk('local')
                ->get('about-us.json'))];
        });
    }


    public function update(Request $request)
    {
        try {
            // Validate the incoming request
            $validator = Validator::make($request->all(), [
                'colors' => 'required|array',
                'colors.primary' => 'required|string',
                'colors.secondary' => 'required|string',
                'colors.accent' => 'required|string',
                'teamMembers' => 'required|array',
                'teamMembers.*.name' => 'required|string',
                'teamMembers.*.role' => 'required|string',
                'teamMembers.*.bio' => 'required|array',
                'teamMembers.*.bio.*' => 'required|string',
                'together' => 'required|array',
                'together.label' => 'required|string',
                'together.text' => 'required|string',
                'goal' => 'required|string',
            ]);

            if ($validator->fails()) {
                return [
                    'status' => 'error',
                    'message' => 'Validation failed: ' . $validator->errors()->first()
                ];
            }

            // Prepare the data structure
            $aboutData = [
                'colors' => $request->input('colors'),
                'teamMembers' => $request->input('teamMembers'),
                'together' => $request->input('together'),
                'goal' => $request->input('goal')
            ];

            // Save to storage
            Storage::disk('local')->put(
                'about-us.json',
                json_encode($aboutData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
            );

            // Clear the cache
            Cache::forget('castoware-about');

            return ['status' => 'success'];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Failed to update about page: ' . $e->getMessage()
            ];
        }
    }
}
