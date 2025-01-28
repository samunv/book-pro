<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis citas</title>
    <link rel="stylesheet" href="css/estilocitas.css?v=<?php echo time() ?>">
    <script src="js/vercitas.js?v=<?php echo time() ?>"></script>
    <script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php"
    ?>
    <section class="seccion-principal">
        <div id="lista-citas"></div>
    </section>

    <div id="ventana-eliminar" class="ventanas">
        <h2>¿Estás seguro de que quieres cancelar la cita de <span id="span-fecha"></span>?</h2>
        <p>
           <strong>Cuidado, </strong> No podrás deshacer esta acción. La anulación de tu cita será notificada a <span id="span-profesional"></span>.
        </p>
        <div class="caja-botones">
            <button id="btn-cancelar" type="button">Cerrar</button>
            <button id="btn-eliminar" type="button">Cancelar cita</button>
        </div>


    </div>

    <div id="overlay" class="overlay"></div>

</body>

</html>