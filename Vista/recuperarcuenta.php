<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar cuenta</title>
    <link rel="stylesheet" href="css/estilologin.css?v=<?php echo time() ?>">
    <script src="js/recuperar.js?v=<?php echo time() ?>"></script>
</head>

<body>
    <h1>Recuperar mi cuenta</h1>
    <div id="contenedor-recuperar">
        <label for="contraseña-nueva">Contraseña nueva</label>
        <input type="password" required maxlength="15" minlength="8" id="contraseña-nueva">
        <p class="texto-info">Debe tener entre 8 y 15 caracteres</p>
        <button type="button" id="btn-confirmar">Confirmar</button>
    </div>

</body>

</html>