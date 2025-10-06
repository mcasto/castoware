<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        if (!$request->hasFile('uploadedFile')) {
            return ['status' => 'error', 'message' => 'No file submitted.'];
        }

        $file_id = uniqid();
        $filename = "{$file_id}.{$request->uploadedFile->extension()}";

        $request->uploadedFile->storeAs('uploaded-images', $filename);

        return ['status' => 'success', 'filename' => $filename];
    }
}
