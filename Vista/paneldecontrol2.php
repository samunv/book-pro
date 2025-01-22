<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Agenda</title>
    <script src="js/paneldecontrol2.js?v=<?php echo time() ?>"></script>
    <script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/paneldecontrol.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php";
    ?>

    <section class="seccion-principal">
        <div class="fecha">
            <div id="fecha-citas">
                <input type="text" id="input-dia" placeholder="Día" maxlength="2"/>
                <select name="mes" id="input-mes"></select>
                <input type="text" id="input-año" value="" placeholder="Año" maxlength="4"/>
            </div>

            <div class="contenedor-flechas">
                <div class="circulo-flechas"><img src="img/arrow_forward_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" id="dia-anterior" class="flechas" /></div>
                <div class="circulo-flechas"><img src="img/arrow_forward_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" id="dia-siguiente" class="flechas" /></div>

            </div>
        </div>


        <table id="tabla-citas"></table>
    </section>
    <div id="overlay" class="overlay"></div>
</body>

</html>