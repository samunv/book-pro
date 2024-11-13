<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil</title>
    <script type="module" src="js/editarperfil.js?v=<?php echo time() ?>"></script>
    <link rel="stylesheet" href="css/estiloeditarperfil.css?v=<?php echo time() ?>">
    
</head>

<body>
    <?php
    include "header.php"
    ?>

    <section class="seccion-principal">

        <form class="formulario" id="formularioEditar">
            <label for="nombreEditar">Cambiar Nombre</label>
            <input type="text" id="nombreEditar" value="mi nombre" name="nombreEditar" /><br />
            <label for="telefonoEditar">Cambiar Teléfono</label>
            <input type="tel" id="telefonoEditar" name="telefonoEditar" maxlength="9" minlength="9" value="mi telefono" />

            <button type="submit">Actualizar</button>
        </form>

        <div class="botones">
            <button type="submit" id="btn-cerrar-sesion">Cerrar Sesión</button>
            <button type="submit" id="btn-eliminar">Eliminar Cuenta</button>
        </div>
    </section>
</body>

</html>