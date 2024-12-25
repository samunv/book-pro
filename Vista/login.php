<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="css/estilologin.css?v=<?php echo time() ?>">
    <script type="module" src="js/login.js?v=<?php echo time() ?>"></script>
</head>

<body>
    <h1>BarberPro</h1>
    <form class="formulario" id="formularioLogin">

        <label for="correo">Correo</label>
        <input type="email" name="correo" id="correo" required maxlength="40" >


        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" name="contrasenaLogin" required maxlength="15" /><br />


        </div>
        <button type="submit" class="btn-registrarse">Continuar</button>
    </form>

    <a href="registro.php" id="enlace-registro">¿No tienes una cuenta? Registrate aquí.</a>
    <p id="texto-autor">Desarrollado por <span id="texto-morado">Samuel Navasardyan</span></p>
</body>

</html>