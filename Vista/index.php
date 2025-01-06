<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <script type="module" src="js/index.js?v=<?php echo time() ?>"></script>
    <script type="text/javascript" src="js/header.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/estiloindex.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/header.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">

</head>

<body>
    <?php
    include "header.php"
    ?>



    <section class="seccion-principal" id="seccion-principal">

        <div class="contenedor-loader">
            <div id="loader"></div>
        </div>


        <section class="contenedor-enlaces" id="contenido">
            <a href="elegirservicio.php" class="enlaces" id="reservar-cita">
                <div class="contenedor-img"><img src="img/calendar_month_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Reservar Cita</p>
                </div>
            </a>
            <a href="vercitas.php" class="enlaces" id="ver-citas">
                <div class="contenedor-img"><img src="img/event_note_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Mis Citas</p>
                </div>
            </a>
            <a href="paneldecontrol2.php" class="enlaces" id="contenedor-oculto">
                <div class="contenedor-img"><img src="img/event_note_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Mi Agenda</p>
                </div>
            </a>

            <a href="editarperfil.php" class="enlaces" id="editar-perfil">
                <div class="contenedor-img"><img src="img/account_circle_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Editar Perfil</p>
                </div>
            </a>

            <a href="empresa.php" class="enlaces">
                <div class="contenedor-img"><img src="img/location_on_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Empresa</p>
                </div>
            </a>
            <a href="notificaciones.php" class="enlaces" id="notificaciones">
                <div class="contenedor-foto-cuenta">
                    <div class="contenedor-img"><img src="img/notifications_24dp_016BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                    <div id="cuenta-notificaciones"></div>
                </div>

                <div class="contenedor-txt">
                    <p>Notificaciones</p>
                </div>
            </a>




        </section>

    </section>


</body>

</html>