<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Portfolio extends Model
{
    protected $fillable = [
        'site_name',
        'url',
        'image',
        'sort_order'
    ];

    public function getImageAttribute($value)
    {
        // Try to find the file with common extensions
        $extensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
        foreach ($extensions as $ext) {
            if (Storage::disk('public')->exists("portfolio/{$this->id}.{$ext}")) {
                return "/storage/portfolio/{$this->id}.{$ext}";
            }
        }

        // Fallback to stored value or ID only if no file found
        return $value ?: "/storage/portfolio/{$this->id}";
    }

    protected static function booted()
    {
        static::deleting(function ($model) {
            // Delete the associated file from storage
            if ($model->id) {
                Storage::disk('public')->delete("portfolio/{$model->id}");
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
