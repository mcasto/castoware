<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Resolve each portfolio screenshot's file once and store its URL, instead
     * of probing the filesystem on every request.
     */
    public function up(): void
    {
        $extensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

        foreach (DB::table('portfolios')->get(['id', 'image']) as $rec) {
            foreach ($extensions as $ext) {
                if (Storage::disk('public')->exists("portfolio/{$rec->id}.{$ext}")) {
                    DB::table('portfolios')
                        ->where('id', $rec->id)
                        ->update(['image' => "/storage/portfolio/{$rec->id}.{$ext}"]);
                    break;
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
