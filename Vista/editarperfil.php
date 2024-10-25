<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Perfil</title>
    <link rel="stylesheet" href="css/estilologin.css?v=<?php echo time() ?>">
    <script src="js/editarperfil.js?php echo time() ?>"></script>
</head>

<body>
    <a href="index.php" id="enlace-volver"><img src="img/arrow_back_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="" width="45" height="45"></a>
    <h1>Editar Perfil</h1>
    <form class="formulario" id="formularioEditar">
        <label for="nombreEditar">Cambiar Nombre</label>
        <input type="text" id="nombreEditar" value="x" name="nombreEditar" /><br />
        <label for="telefonoEditar">Cambiar teléfono</label>
        <input type="tel" id="telefonoEditar" name="telefonoEditar" maxlength="9" minlength="9" value="x" />

        <button type="submit">Actualizar</button>
    </form>

    <div class="botones">
        <button type="submit" id="btn-cerrar-sesion">Cerrar Sesión</button>
        <button type="sumbit" id="btn-eliminar">Eliminar Cuenta</button>
    </div>

    <p id="texto-autor">Desarrollado por <span id="texto-morado">Navas</span></p>
</body>

</html>