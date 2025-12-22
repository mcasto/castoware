<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Error</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .error-container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 500px;
            text-align: center;
        }
        .error-icon {
            font-size: 64px;
            color: #e74c3c;
            margin-bottom: 20px;
        }
        h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 15px;
        }
        p {
            color: #7f8c8d;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        .invoice-number {
            font-weight: bold;
            color: #2c3e50;
        }
        .logo {
            max-width: 200px;
            height: auto;
            margin: 0 auto 30px;
            display: block;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <img src="/storage/images/castoware-logo.jpeg" alt="Castoware Logo" class="logo">
        <div class="error-icon">⚠️</div>
        <h1>Invoice Not Found</h1>
        <p>The invoice number you attempted to pay does not exist.</p>
        @if(isset($invoiceNumber))
        <p>Invoice Number: <span class="invoice-number">{{ $invoiceNumber }}</span></p>
        @endif
        <p>Please verify the invoice number and try again, or contact support for assistance.</p>
    </div>
</body>
</html>
