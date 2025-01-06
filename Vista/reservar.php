<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservar cita</title>
    <script src="js/reservar.js?v=<?php echo time() ?>"></script>
    <script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/reservar.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
    <link rel="icon" href="img/pngtree-barbershop-pole-decoration-png-image_6115703.png">
</head>

<body>
    <?php
    include "header.php";
    ?>

    <section class="seccion-principal">

        <section class="seccion-formularios">
            <div class="profesionales" id="profesionales">
            </div>

            <div class="formularios">
                <div class="navegacion-meses">
                    <img src="img/arrow_back_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" id="mes-anterior" />
                    <div id="mes-año" class="mes-año"></div>
                    <img src="img/arrow_forward_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" id="mes-siguiente" />
                </div>
                <div class="semana">
                    <div class="dia">D</div>
                    <div class="dia">L</div>
                    <div class="dia">M</div>
                    <div class="dia">Mi</div>
                    <div class="dia">J</div>
                    <div class="dia">V</div>
                    <div class="dia">S</div>
                </div>

                <div id="dias" class="dias"></div>
            </div>
            <div id="formulario-hora">
                <ul id="lista-horarios"></ul>
            </div>
        </section>

        <button type="submit" id="btn-continuar-1">Continuar</button>

    </section>

</body>

</html>