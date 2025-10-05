<?php

namespace App\Http\Controllers;

use App\Mail\ContactMailer;
use App\Models\Contact;
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
        Mail::to(config('mail.to.mike'))
            ->send(new ContactMailer($contact));

        /**
         * Line 31 threw:
         * List should have at least 1 elements, but has 0 elements. {"exception":"[object] (MailerSend\\Exceptions\\MailerSendAssertException(code: 0): List should have at least 1 elements, but has 0 elements. at /home/u466389499/domains/castoware.com/public_html/preview/vendor/mailersend/mailersend/src/Helpers/GeneralHelpers.php:22)
         */

        Mail::to(config('mail.to.margaret'))
            ->send(new ContactMailer($contact));


        return ['status' => 'success'];
    }

    public function index()
    {
        return Contact::orderBy('created_at', 'desc')
            ->get();
    }

    public function destroy(int $id)
    {
        $deleted = Contact::find($id)->delete();
        return ['status' => $deleted ? 'success' : 'error'];
    }
}
