<div>
    <h2>Payment Cancelled/Failed</h2>

    <div style="margin: 20px 0;">
        <div style="margin: 10px 0;">
            <strong>Reason:</strong> {{ $reason }}
        </div>
        @if($invoiceNumber)
        <div style="margin: 10px 0;">
            <strong>Invoice Number:</strong> {{ $invoiceNumber }}
        </div>
        @endif
        @if($orderId)
        <div style="margin: 10px 0;">
            <strong>PayPal Order ID:</strong> {{ $orderId }}
        </div>
        @endif
        <div style="margin: 10px 0;">
            <strong>Occurred At:</strong> {{ $occurredAt }}
        </div>
    </div>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
        This notification was triggered by a cancelled or failed payment attempt.
    </p>
</div>
