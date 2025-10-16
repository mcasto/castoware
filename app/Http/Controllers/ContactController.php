<?php

namespace App\Http\Controllers;

use App\Mail\ContactMailer;
use App\Models\Contact;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string|required',
            'email' => 'email|required',
            'subject' => 'string|required',
            'message' => 'string|required'
        ]);

        if ($validator->fails()) {
            return ['status' => 'error', 'message' => 'Invalid contact information'];
        }

        $contact = Contact::create($validator->valid());

        // send email about contact
        try {
            Mail::to(config('mail.to.mike'))
                ->send(new ContactMailer($contact));

            Mail::to(config('mail.to.margaret'))
                ->send(new ContactMailer($contact));
        } catch (Exception $e) {
            logger()->error($e);
        }

        return ['status' => 'success'];
    }

    public function index(Request $request)
    {
        $user = $request->user();

        return [
            'contacts' => Contact::orderBy('created_at', 'desc')
                ->get(),
            'last_viewed' => $user->last_viewed_contacts
        ];
    }

    public function destroy(int $id)
    {
        $deleted = Contact::find($id)->delete();
        return ['status' => $deleted ? 'success' : 'error'];
    }
}
