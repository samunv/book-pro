<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resumen</title>
    <link rel="stylesheet" href="css/estiloresumen.css?v=<?php echo time() ?>">
    <script src="js/resumen.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
        include "header.php"; 
    ?>
    <section class="seccion-principal">
        <section id="lista-datos"></section>
        <button id="btn-aceptar">Confirmar <img src="img/check_circle_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="" width="35" height="35"></button>
        <p id="info">Puedes cancelar Tu Reserva pinchando en la X de arriba. También puedes hacerlo en cualquier momento desde Ver Mis Citas.</p>
    </section>


</body>

</html>