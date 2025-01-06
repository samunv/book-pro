<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificaciones</title>
    <script type="module" src="js/notificaciones.js?v=<?php echo time() ?>"></script>
    <script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/notificaciones.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php"
    ?>

    <section class="seccion-principal">

        <button id="btn-borrar-notificaciones">Limpiar las notificaciones <span id="caja-recuento"></span></button>
        <div id="notificaciones"></div>


    </section>
</body>

</html>