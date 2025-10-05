<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'email|required',
            'password' => 'string|required'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid request.'];
        }

        $valid = $validator->valid();

        if (Auth::attempt($valid)) {
            $user = User::where('email', $valid['email'])->first();
            $token = $user->createToken('castoware-admin')->plainTextToken;
            return ['status' => 'success', 'token' => $token];
        }

        return ['status' => 'error', 'message' => 'Invalid credentials.'];
    }

    public function validateToken()
    {
        return ['status' => 'success'];
    }
}
