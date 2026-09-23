<?php

namespace App\Console\Commands;

use App\Models\Portfolio;
use App\Services\ScreenshotService;
use Illuminate\Console\Command;
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
    public function handle(ScreenshotService $screenshots)
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

        $results = [];

        if ($error = $screenshots->status()) {
            $results[] = ['status' => 'error', 'message' => $error];
            $recs = [];
        }

        // update screenshot for each portfolio
        foreach ($recs as $rec) {
            $error = $screenshots->capture($rec->id, $rec->url);

            $results[] = $error
                ? ['status' => 'error', 'id' => $rec->id, 'url' => $rec->url, 'message' => $error]
                : ['status' => 'success', 'id' => $rec->id, 'url' => $rec->url];
        }

        $timestamp = now()->timestamp;
        Storage::disk('local')
            ->put("logs/portfolio-image-update-{$timestamp}.log", print_r($results, true));
    }
}
