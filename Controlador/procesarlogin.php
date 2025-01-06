<?php
require_once "./../Modelo/Usuarios.php";
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Sesion.php";
require_once "../Modelo/Correo.php";


$usuarioDAO = new UsuariosDao();
$sesion = new Sesion();

if (isset($_POST["contrasenaLogin"]) && isset($_POST["correo"])) {
    $inputContrasena = $_POST["contrasenaLogin"];
    $inputCorreo = $_POST["correo"];

    $response = [];  // Estructura de respuesta unificada


    // Validación de correo
    if (!filter_var($inputCorreo, FILTER_VALIDATE_EMAIL)) {
        $response["error"] = "Correo inválido";
        echo json_encode($response);
        exit;
    }

    // Si la sesión ya está iniciada, devolver el nombre del usuario
    if (isset($_SESSION["nombre"])) {
        $usuario = $sesion->getUsuario();
        $response["nombre"] = $usuario;
    } else {
        // Verificar si el usuario existe
        $usuarioVerificado = $usuarioDAO->leerUsuario($inputCorreo, $inputContrasena);

        if (!empty($usuarioVerificado)) {
            // Iniciar sesión y enviar correo
            $sesion->setUsuario($inputCorreo);
            // Devolver los datos del usuario
            $response["usuario"] = $usuarioVerificado[0];
        } else {
            $response["error"] = "Lo sentimos. No existe ese usuario.";
        }
    }
    echo json_encode($response);  // Enviar una única respuesta JSON
}


if (isset($_GET["correoRecuperar"])) {
    $destinatario = $_GET["correoRecuperar"];
    $correo = new Correo($destinatario, "Recuperar mi Cuenta", "Haz click en este enlace para recuperar tu cuenta http://localhost/barbershopWebApp/Vista/recuperarcuenta.php?correo=$destinatario");
    $correo->enviarCorreo();
    echo json_encode("Correo enviado a $destinatario");
}
