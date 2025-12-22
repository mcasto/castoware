<?php

namespace App\Http\Controllers;

use App\Mail\PaymentCancelledMailer;
use App\Mail\PaymentMailer;
use App\Models\Ninja;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentController extends Controller
{
    /**
     * Create PayPal order and redirect to PayPal
     *
     * GET /api/payment/create/{invoice}
     */
    public function create(string $invoice)
    {
        // get invoice from Invoice Ninja database
        $invoiceRec = Ninja::where('number', $invoice)
            ->first();

        if (!$invoiceRec) {
            logger()->error("No invoice found for {$invoice}");

            // Send email notification to Mike
            try {
                Mail::to(config('mail.to.mike'))
                    ->send(new PaymentCancelledMailer(
                        $invoice,
                        null,
                        'Invalid invoice number - invoice does not exist',
                        now()->toDateTimeString()
                    ));
            } catch (Exception $e) {
                logger()->error('Failed to send invalid invoice email', [
                    'invoice' => $invoice,
                    'exception' => $e->getMessage()
                ]);
            }

            return view('payment-error')->render();
        }

        // set amount to the amount of the invoice
        $amount = number_format($invoiceRec->amount, 2, '.', '');

        try {


            // Validate invoice number format (basic sanitization)
            // Allow alphanumeric, hyphens, underscores, and dots
            $validator = Validator::make(
                ['invoice' => $invoice],
                ['invoice' => 'required|string|max:255|regex:/^[a-zA-Z0-9\-_.]+$/']
            );

            if ($validator->fails()) {
                // Send email notification to Mike
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentCancelledMailer(
                            $invoice,
                            null,
                            'Invalid invoice number format',
                            now()->toDateTimeString()
                        ));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment error email', [
                        'invoice' => $invoice,
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid invoice number format'
                ], 400);
            }

            // Initialize PayPal client
            $mode = config('services.paypal.mode');

            $config = [
                'mode' => $mode,
                'payment_action' => 'Sale',
                'currency' => 'USD',
                'notify_url' => '',
                'locale' => 'en_US',
                'validate_ssl' => true,
                $mode => [
                    'client_id' => config('services.paypal.client_id'),
                    'client_secret' => config('services.paypal.secret'),
                    'app_id' => '',
                ],
            ];

            $provider = new PayPalClient($config);
            $provider->getAccessToken();

            // Define return URLs (use frontend URL for dev, backend URL for production)
            $frontendUrl = env('FRONTEND_URL', config('app.url'));
            $returnUrl = $frontendUrl . '/payment/complete';
            $cancelUrl = $frontendUrl . '/payment/cancelled';

            // Create PayPal order with invoice metadata
            $order = $provider->createOrder([
                'intent' => 'CAPTURE',
                'application_context' => [
                    'return_url' => $returnUrl,
                    'cancel_url' => $cancelUrl,
                    'brand_name' => config('app.name'),
                    'shipping_preference' => 'NO_SHIPPING',
                ],
                'purchase_units' => [
                    [
                        'reference_id' => $invoice,
                        'custom_id' => $invoice, // Pass invoice through PayPal flow
                        // Note: invoice_id removed to allow same invoice to be paid multiple times
                        'amount' => [
                            'currency_code' => 'USD',
                            'value' => $amount,
                        ],
                        'description' => "Payment for Invoice #{$invoice}",
                    ]
                ]
            ]);

            // Check for errors
            if (isset($order['error'])) {
                logger()->error('PayPal order creation failed', [
                    'invoice' => $invoice,
                    'error' => $order
                ]);

                // Send email notification to Mike
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentCancelledMailer(
                            $invoice,
                            null,
                            'PayPal order creation failed',
                            now()->toDateTimeString()
                        ));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment error email', [
                        'invoice' => $invoice,
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Unable to create PayPal order'
                ], 500);
            }


            // Find approval URL and redirect
            foreach ($order['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return redirect($link['href']);
                }
            }

            // No approval link found
            logger()->error('No PayPal approval link found', [
                'invoice' => $invoice,
                'order' => $order
            ]);

            // Send email notification to Mike
            try {
                Mail::to(config('mail.to.mike'))
                    ->send(new PaymentCancelledMailer(
                        $invoice,
                        $order['id'] ?? null,
                        'No PayPal approval link found',
                        now()->toDateTimeString()
                    ));
            } catch (Exception $e) {
                logger()->error('Failed to send payment error email', [
                    'invoice' => $invoice,
                    'exception' => $e->getMessage()
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Unable to redirect to PayPal'
            ], 500);
        } catch (Exception $e) {
            logger()->error('Payment creation exception', [
                'invoice' => $invoice,
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Send email notification to Mike
            try {
                Mail::to(config('mail.to.mike'))
                    ->send(new PaymentCancelledMailer(
                        $invoice,
                        null,
                        'Payment creation exception: ' . $e->getMessage(),
                        now()->toDateTimeString()
                    ));
            } catch (Exception $mailException) {
                logger()->error('Failed to send payment error email', [
                    'invoice' => $invoice,
                    'exception' => $mailException->getMessage()
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred processing your request'
            ], 500);
        }
    }

    /**
     * Capture payment after PayPal approval
     *
     * GET /api/payment/capture
     * Query params: token (PayPal order ID), PayerID
     */
    public function capture(Request $request)
    {
        try {
            // Validate required query parameters
            $validator = Validator::make($request->all(), [
                'token' => 'required|string',
                'PayerID' => 'required|string',
            ]);

            if ($validator->fails()) {
                // Send email notification to Mike
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentCancelledMailer(
                            null,
                            $request->input('token'),
                            'Missing required parameters for payment capture',
                            now()->toDateTimeString()
                        ));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment error email', [
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Missing required parameters',
                    'redirect' => '/payment/cancelled'
                ], 400);
            }

            $orderId = $request->input('token');
            $payerId = $request->input('PayerID');


            // Initialize PayPal client
            $mode = config('services.paypal.mode');

            $config = [
                'mode' => $mode,
                'payment_action' => 'Sale',
                'currency' => 'USD',
                'notify_url' => '',
                'locale' => 'en_US',
                'validate_ssl' => true,
                $mode => [
                    'client_id' => config('services.paypal.client_id'),
                    'client_secret' => config('services.paypal.secret'),
                    'app_id' => '',
                ],
            ];

            $provider = new PayPalClient($config);
            $provider->getAccessToken();

            // Get order details first to extract invoice number
            $orderDetails = $provider->showOrderDetails($orderId);
            $invoiceNumber = $orderDetails['purchase_units'][0]['custom_id'] ?? null;

            // Capture the order
            $result = $provider->capturePaymentOrder($orderId);

            // Check for errors
            if (isset($result['error'])) {
                logger()->error('PayPal capture failed', [
                    'order_id' => $orderId,
                    'error' => $result
                ]);

                // Send email notification to Mike
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentCancelledMailer(
                            $invoiceNumber,
                            $orderId,
                            'PayPal capture failed',
                            now()->toDateTimeString()
                        ));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment error email', [
                        'order_id' => $orderId,
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Payment capture failed',
                    'redirect' => '/payment/cancelled'
                ], 400);
            }

            // Verify capture status
            $captureStatus = $result['status'] ?? null;

            if ($captureStatus === 'COMPLETED') {
                // Extract payer information
                $payerEmail = $result['payer']['email_address'] ?? null;
                $payerName = ($result['payer']['name']['given_name'] ?? '') . ' ' .
                    ($result['payer']['name']['surname'] ?? '');

                // Extract payment amount
                $amount = $result['purchase_units'][0]['payments']['captures'][0]['amount']['value'] ?? null;
                $currency = $result['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'] ?? 'USD';
                $paidAt = now()->toDateTimeString();

                // Send email notifications
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentMailer($invoiceNumber, $amount, $currency, $paidAt));

                    Mail::to(config('mail.to.margaret'))
                        ->send(new PaymentMailer($invoiceNumber, $amount, $currency, $paidAt));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment notification email', [
                        'invoice_number' => $invoiceNumber,
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => 'Payment completed successfully',
                    'data' => [
                        'invoice_number' => $invoiceNumber,
                        'amount' => $amount,
                        'currency' => $currency,
                        'paid_at' => $paidAt,
                    ]
                ]);
            } else {
                // Payment not completed
                logger()->warning('Payment not completed', [
                    'order_id' => $orderId,
                    'status' => $captureStatus,
                    'result' => $result
                ]);

                // Send email notification to Mike
                try {
                    Mail::to(config('mail.to.mike'))
                        ->send(new PaymentCancelledMailer(
                            $invoiceNumber,
                            $orderId,
                            "Payment not completed (Status: {$captureStatus})",
                            now()->toDateTimeString()
                        ));
                } catch (Exception $e) {
                    logger()->error('Failed to send payment error email', [
                        'order_id' => $orderId,
                        'exception' => $e->getMessage()
                    ]);
                }

                return response()->json([
                    'status' => 'error',
                    'message' => 'Payment was not completed',
                    'redirect' => '/payment/cancelled'
                ], 400);
            }
        } catch (Exception $e) {
            logger()->error('Payment capture exception', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Send email notification to Mike
            try {
                Mail::to(config('mail.to.mike'))
                    ->send(new PaymentCancelledMailer(
                        $invoiceNumber ?? null,
                        $orderId ?? null,
                        'Payment exception: ' . $e->getMessage(),
                        now()->toDateTimeString()
                    ));
            } catch (Exception $mailException) {
                logger()->error('Failed to send payment error email', [
                    'exception' => $mailException->getMessage()
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred processing your payment',
                'redirect' => '/payment/cancelled'
            ], 500);
        }
    }

    /**
     * Handle user cancellation
     *
     * GET /api/payment/cancel
     */
    public function cancel(Request $request)
    {
        $token = $request->input('token');

        // Send email notification to Mike
        try {
            Mail::to(config('mail.to.mike'))
                ->send(new PaymentCancelledMailer(
                    null, // invoice number not available at cancellation
                    $token,
                    'User cancelled payment',
                    now()->toDateTimeString()
                ));
        } catch (Exception $e) {
            logger()->error('Failed to send payment cancellation email', [
                'order_id' => $token,
                'exception' => $e->getMessage()
            ]);
        }

        return response()->json([
            'status' => 'cancelled',
            'message' => 'Payment was cancelled'
        ]);
    }
}
