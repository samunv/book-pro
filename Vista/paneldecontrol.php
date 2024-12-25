<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Agenda</title>
    <script src="js/paneldecontrol.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/paneldecontrol.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php";
    ?>

    <section class="seccion-principal">
        <section class="seccion-filtros">

        </section>
        <table id="tabla-citas"></table>
    </section>


    <a href="editarperfil.php">Editar Perfil</a>
</body>

</html>