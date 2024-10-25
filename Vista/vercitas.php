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
    <header>
        <div class="elementos-header1">
            <a href="index.php"><img src="img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="AtrasCita" height="45" width="45"></a>
            <h1>Ver Mis Citas</h1>
        </div>
        <div class="elementos-header2">
            <img src="img/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="" height="45" width="45">
        </div>
    </header>
    <section class="seccion-principal">
        <div id="lista-citas"></div>
    </section>

    <div id="ventana-eliminar">
        <h1>¿Estás seguro de que quieres eliminar la cita?</h1>
        <div class="caja-botones">
        <button id="btn-cancelar" type="button">Cancelar</button>
        <button id="btn-eliminar" type="button">Eliminar</button>
        </div>
        

    </div>

    <div id="overlay" class="overlay"></div>

</body>

</html>