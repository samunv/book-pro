<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrarse</title>
    <link rel="stylesheet" href="css/estilologin.css?v=<?php echo time() ?>">
    <script src="js/registro.js?v=<?php echo time() ?>"></script>
</head>

<body>
    <h1>Crea tu cuenta</h1>
    <form class="formulario" id="formularioRegistro">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" required maxlength="15" minlength="5" placeholder="Ej: Rodrigo" />
        <label for="contrasena">Contraseña (8 caracteres mínimo)</label>
        <input type="password" id="contrasena" name="contrasena" required maxlength="15" minlength="8" />
        <label for="correo">Correo</label>
        <input type="email" name="correo" id="correo" required maxlength="40" placeholder="usuario@email.com">
        <label for="telefono">Teléfono</label>
        <div id="caja-telefono">
            <img src="img/Bandera_de_España_(sin_escudo).svg.png" alt="" id='bandera'>
            <input type="tel" id="telefono" name="telefono" required maxlength="9" minlength="9" placeholder="Ej: 611 234 512" />
        </div>
        <button type="submit" class="btn-registrarse">Registrarse</button>
    </form>
    <p id="texto-autor">Desarrollado por <span id="texto-morado">Samuel Navasardyan</span></p>

    <div id="seccion-confirmacion">
        <h2>Introduce el código de verificación que hemos enviado a <span id="span-correo"></span></h2>
        <form id="formulario-verificar" method="POST">
            <label for="token">Código:</label>
            <input type="text" name="token" id="token" required maxlength="8">

            <div id="botones">
                <button type="submit">Verificar</button>
                <button id="btn-cancelar">Cancelar</button>
            </div>

        </form>
    </div>

    <div id="overlay" class="overlay"></div>

</body>

</html>