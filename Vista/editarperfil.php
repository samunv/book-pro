<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil</title>
    <script type="module" src="js/editarperfil.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/estiloeditarperfil.css?v=<?php echo time() ?>">
    <link rel="stylesheet" href="css/global.css?v=<?php echo time() ?>">
</head>

<body>
    <?php
    include "header.php"
    ?>

    <section class="seccion-principal">


        <form class="formulario" id="formularioEditar">

            <div class="contendor-foto">
                <div class="contenedor-editar">
                    <img src="img/edit_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="" width="20" height="20">
                </div>

                <img src="" alt="" width="100" height="100" id="fotoDePerfil">
            </div>

            <br>

            <label for="nombreEditar">Nombre</label>
            <div class="contenedores-actualizar">
                <input type="text" id="nombreEditar" pattern="[^ ]*" value="" name="nombreEditar" maxlength="15" minlength="5" /><br />
                <button type="button" id="btnActualizar-nombre">Actualizar</button>
            </div>


            <label for="telefonoEditar">Teléfono</label>
            <div class="contenedores-actualizar">

                <input type="tel" id="telefonoEditar" name="telefonoEditar" maxlength="9" minlength="9" value="" />
                <button type="button" id="btnActualizar-telefono">Actualizar</button>
            </div>

        </form>

        <div class="botones">
            <button type="submit" id="btn-cerrar-sesion">Cerrar Sesión</button>
            <button type="submit" id="btn-eliminar">Eliminar Cuenta</button>
        </div>


    </section>
    <div id="ventana-editarfoto-oculta">
        <h3>Cargar nueva foto</h3>

        <input type="file" id="archivo-foto" name="file">

        <div class="botones-editar-foto">
            <button type="button" id="btn-cancelar">Cancelar</button>
            <button type="button" id="btn-confirmar">Confirmar</button>
        </div>


    </div>
    <div id="overlay" class="overlay"></div>
</body>

</html>