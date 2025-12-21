<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

        $user = User::where('email', $valid['email'])->first();

        if ($user && Hash::check($valid['password'], $user->password)) {
            $token = $user->createToken('castoware-admin')->plainTextToken;
            return ['status' => 'success', 'token' => $token];
        }

        return ['status' => 'error', 'message' => 'Invalid credentials.'];
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return ['status' => 'success'];
    }

    public function validateToken()
    {
        return ['status' => 'success'];
    }
}
