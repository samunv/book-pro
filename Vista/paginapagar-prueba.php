<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="js/pagar.js?v=<?php echo time() ?>"></script>
</head>

<body>
    <form id="payment-form">
        <div id="card-element">
        </div>

        <!-- Un botón para enviar el formulario -->
        <button id="submit">Pagar</button>
    </form>
</body>

</html>