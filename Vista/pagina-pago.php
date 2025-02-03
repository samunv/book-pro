<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pago</title>
    <script src="https://js.stripe.com/v3/"></script>
    <script src="js/pagar.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/pago.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
</head>

<body>
    <div class="titulo-pagina-pago">
        <img src="img/credit_card_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="">
        <h1>Pago Online</h1>
    </div>

    <form id="titular-form" class="form">
        <h2>Datos del Titular de la Tarjeta</h2>
        <label for="nombre-titular">Nombre</label>
        <input type="text" id="nombre-titular" class="input" required placeholder="Ejemplo: Daniel" name="nombre" maxlength="30">

        <label for="apellidos-titular">Apellidos</label>
        <input type="text" id="apellidos-titular" class="input" required placeholder="Ejemplo: Martínez" name="apellido" maxlength="200">

        <label for="direccion-facturacion-titular">Dirección de facturación (Opcional)</label>
        <input type="text" id="direccion-facturacion-titular" class="input" placeholder="C/Sol, 1, Bajo A, Madrid, España" maxlength="200">

        <label for="correo-input">Correo para recibir info.</label>
        <input type="mail" id="correo-input" required class="input" value="">
    </form>

    <form id="payment-form" class="form">
        <h2>Datos de la tarjeta</h2>
        <div id="card-element" required></div>
        <button id="submit">Enviar y Pagar Ahora</button>
    </form>
    <br>
    <p>BookPro no guardará ni recopilará información de tu tarjeta de crédito o débito. Nuestro procesador de pagos: <a href="https://stripe.com/es" target="_blank">Stripe</a></p>
</body>

</html>