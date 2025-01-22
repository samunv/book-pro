<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="js/pagar.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/pago.css?v=<?php echo time() ?>">

    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
</head>

<body>
    <h1>Pago con tarjeta</h1>
    <form id="payment-form">
        <div id="card-element"></div>
        <button id="submit">Pagar</button>
    </form>
    <br>
    <p>Los datos de la tarjeta están completamente protegidos. Se utiliza Stripe para manejar las transacciones y pagos. <a href="https://stripe.com/es" target="_blank">Stripe</a></p>
</body>

</html>