<?php

namespace App\Console\Commands;

use App\Services\ScreenshotService;
use Illuminate\Console\Command;

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
    public function handle(ScreenshotService $screenshots)
    {
        if ($error = $screenshots->status()) {
            $this->error($error);
            return 1;
        }

        if ($error = $screenshots->capture((int) $this->option('id'), $this->option('url'))) {
            $this->error($error);
            return 1;
        }

        return 0;
    }
}
