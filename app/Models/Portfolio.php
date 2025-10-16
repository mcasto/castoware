<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class Portfolio extends Model
{
    protected $fillable = [
        'site_name',
        'image',
        'url',
        'sort_order'
    ];

    protected static function booted()
    {
        static::deleting(function ($model) {
            // Delete the associated file from storage
            if ($model->image) {
                // Remove the '/storage/' prefix to get the actual path in storage
                $filePath = str_replace('/storage/', '', $model->image);
                Storage::disk('public')->delete($filePath);
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
