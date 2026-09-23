<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ScreenshotService
{
    private const BASE_URL = 'https://api.apiflash.com/v1/urltoimage';

    // Keep total time under PHP's default 30s max_execution_time
    public const CONNECT_TIMEOUT = 5;
    public const CAPTURE_TIMEOUT = 25;

    /**
     * Check that the screenshot API is reachable and has quota left.
     * Returns null if OK, otherwise a user-facing error message.
     */
    public function status(): ?string
    {
        try {
            $response = Http::connectTimeout(self::CONNECT_TIMEOUT)
                ->timeout(10)
                ->get(self::BASE_URL . '/quota', ['access_key' => config('app.apiflash_key')]);
        } catch (ConnectionException $e) {
            return 'The screenshot service is not responding. Please try again later.';
        }

        if ($response->status() === 401) {
            return 'The screenshot service rejected the API key.';
        }

        if (!$response->successful()) {
            return "The screenshot service is unavailable (HTTP {$response->status()}).";
        }

        if ($response->json('remaining') === 0) {
            return 'The screenshot service quota has been used up for this month.';
        }

        return null;
    }

    /**
     * Capture a screenshot of $url and save it as the image for portfolio $id.
     * Returns null on success, otherwise an error message.
     */
    public function capture(int $id, string $url): ?string
    {
        try {
            $response = Http::connectTimeout(self::CONNECT_TIMEOUT)
                ->timeout(self::CAPTURE_TIMEOUT)
                ->get(self::BASE_URL, [
                    'access_key' => config('app.apiflash_key'),
                    'url' => $url,
                    'format' => 'jpeg',
                    'width' => 1366,
                    'height' => 653,
                    'fresh' => 'true',
                    'response_type' => 'image',
                ]);
        } catch (ConnectionException $e) {
            return 'The screenshot service timed out.';
        }

        if (!$response->successful()) {
            return "Screenshot request failed with status {$response->status()}: {$response->body()}";
        }

        $imageContent = $response->body();

        if (empty($imageContent)) {
            return 'Received empty response from the screenshot service.';
        }

        // Filename must match what Portfolio::getImageAttribute looks for
        Storage::disk('public')->put("portfolio/{$id}.jpeg", $imageContent);

        return null;
    }
}
