<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UpdatePortfolioImage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-portfolio-image {--id=} {--url=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update portfolio image';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->option('id');
        $url = $this->option('url');
        $key = config('app.apiflash_key');

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

            return 0;
        } catch (\Exception $e) {
            $this->error("Error: " . $e->getMessage());
            return 1;
        }
    }
}
