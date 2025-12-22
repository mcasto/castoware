<div>
    <h2>Payment Received</h2>

    <div style="margin: 20px 0;">
        <div style="margin: 10px 0;">
            <strong>Invoice Number:</strong> {{ $invoiceNumber }}
        </div>
        <div style="margin: 10px 0;">
            <strong>Amount:</strong> {{ $currency }} ${{ $amount }}
        </div>
        <div style="margin: 10px 0;">
            <strong>Payment Date:</strong> {{ $paidAt }}
        </div>
    </div>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
        This payment was processed through PayPal.
    </p>
</div>
