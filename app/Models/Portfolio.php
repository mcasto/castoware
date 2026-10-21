<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    protected $fillable = [
        'site_name',
        'url',
        'image',
        'sort_order'
    ];

    /**
     * Public URL for a screenshot stored on the public disk.
     */
    public static function imageUrl(string $path): string
    {
        return "/storage/{$path}";
    }

    public function getImageAttribute($value)
    {
        // Set by ScreenshotService::capture; fall back to the ID-based path
        // for records whose screenshot hasn't been captured yet
        return $value ?: static::imageUrl("portfolio/{$this->id}.jpeg");
    }

    protected static function booted()
    {
        static::deleting(function ($model) {
            // Delete the associated file from storage
            if ($image = $model->getRawOriginal('image')) {
                Storage::disk('public')->delete(Str::after($image, '/storage/'));
            }
        });

        static::saved(function () {
            Cache::forget('castoware-portfolio');
        });

        static::deleted(function () {
            Cache::forget('castoware-portfolio');
        });
    }
}
