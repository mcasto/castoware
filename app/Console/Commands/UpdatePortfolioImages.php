<?php

namespace App\Console\Commands;

use App\Models\Portfolio;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class UpdatePortfolioImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-portfolio-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // cleanup logs older than 2 months
        $disk = Storage::disk('local');
        $files = $disk->files('logs');

        $oneMonthAgo = now()->subMonths(2)->timestamp;

        foreach ($files as $file) {
            // Extract timestamp from filename
            if (preg_match('/portfolio-image-update-(\d+)\.log/', $file, $matches)) {
                $fileTimestamp = (int) $matches[1];

                // Check if file is older than 1 month
                if ($fileTimestamp < $oneMonthAgo) {
                    $disk->delete($file);
                }
            }
        }

        // get portfolio recs
        $recs = Portfolio::all();
        $key = config('app.apiflash_key');

        $results = [];

        // update screenshot for each portfolio
        foreach ($recs as $rec) {
            $id = $rec->id;
            $url = $rec->url;

            $endpoint = "https://api.apiflash.com/v1/urltoimage?access_key={$key}&url={$url}&format=jpeg&width=1366&height=653&fresh=true&response_type=image";

            try {
                // Make the API request
                $response = Http::timeout(60)->get($endpoint);

                if (!$response->successful()) {
                    $this->error("API request failed with status: " . $response->status());
                    $this->error("Response: " . $response->body());
                    return 1;
                }

                // Get the image content
                $imageContent = $response->body();

                if (empty($imageContent)) {
                    $this->error('Received empty response from API');
                    return 1;
                }

                // Generate a filename
                $filename = "portfolio-{$id}.jpeg";
                $storagePath = 'portfolio/' . $filename;

                // Save to storage
                Storage::disk('public')->put($storagePath, $imageContent);

                $results[] = ['status' => 'success', 'id' => $id, 'url' => $url];
            } catch (\Exception $e) {
                $results[] = ['status' => 'error', 'id' => $id, 'url' => $url, 'message' => $e->getMessage()];
            }
        }

        $timestamp = now()->timestamp;
        Storage::disk('local')
            ->put("logs/portfolio-image-update-{$timestamp}.log", print_r($results, true));
    }
}
