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
    <h1>Pago Online</h1>
    <form id="payment-form">
        <label for="card-element" class="label">Datos de la tarjeta:</label>
        <div id="card-element"></div>
        <button id="submit">Pagar Ahora</button>
    </form>
    <br>
    <p>BookPro no guardará ni recopilará información de tu tarjeta de crédito o débito. Nuestro procesador de pagos: <a href="https://stripe.com/es" target="_blank">Stripe</a></p>
</body>

</html>