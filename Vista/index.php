<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <script type="module" src="js/index.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/estiloindex.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php"
    ?>

    <section class="seccion-principal">

        <section class="contenedor-enlaces">
            <a href="elegirservicio.php" class="enlaces">
                <div class="contenedor-img"><img src="img/calendar_month_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Reservar Cita</p>
                </div>
            </a>
            <a href="vercitas.php" class="enlaces">
                <div class="contenedor-img"><img src="img/event_note_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Ver mis Citas</p>
                </div>
            </a>
            <a href="editarperfil.php" class="enlaces">
                <div class="contenedor-img"><img src="img/account_circle_24dp_006BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Editar Perfil</p>
                </div>
            </a>
            <a href="" class="enlaces" id="enlace-instagram">
                <div class="contenedor-img"><img src="img/instagram (1).png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Instagram</p>
                </div>
            </a>
            <a href="empresa.php" class="enlaces">
                <div class="contenedor-img"><img src="img/apartment_24dp_016BFF_FILL0_wght400_GRAD0_opsz24.png" alt="" /></div>
                <div class="contenedor-txt">
                    <p>Empresa</p>
                </div>
            </a>
            
    

        </section>


    </section>

</body>

</html>