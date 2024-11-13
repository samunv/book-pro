<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis citas</title>
    <link rel="stylesheet" href="css/estilocitas.css?v=<?php echo time() ?>">
    <script src="js/vercitas.js?v=<?php echo time() ?>"></script>
</head>

<body>
    <?php
    include "header.php"
    ?>
    <section class="seccion-principal">
        <div id="lista-citas"></div>
    </section>

    <div id="ventana-eliminar">
        <h2>¿Estás seguro de que quieres eliminar la cita del <span id="span-fecha"></span>?</h2>
        <div class="caja-botones">
            <button id="btn-cancelar" type="button">Cancelar</button>
            <button id="btn-eliminar" type="button">Eliminar</button>
        </div>


    </div>

    <div id="overlay" class="overlay"></div>

</body>

</html>