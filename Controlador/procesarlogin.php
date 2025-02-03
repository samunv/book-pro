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
        $contrasenaFinal = obtenerContraseñaEncriptada($inputContrasena, $inputCorreo);
        $usuarioVerificado = $usuarioDAO->leerUsuario($inputCorreo, $contrasenaFinal);

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

function obtenerContraseñaEncriptada($contrasenaRecibida, $correoRecibido)
{
    $usuarioDAO = new UsuariosDao();
    // Recuperamos el hash almacenado en la base de datos
    $encriptado = $usuarioDAO->leerContraseñaPorCorreo($correoRecibido);

    // Verificar la contraseña ingresada con el hash almacenado
    if (password_verify($contrasenaRecibida, $encriptado)) {
        return $encriptado;
        // Continuar con el proceso de autenticación
    } else {
        return null;
    }
}

if (isset($_GET["correoRecuperar"])) {
    $sesion->setUsuarioProvisional($_GET["correoRecuperar"]);
    $destinatario = $_GET["correoRecuperar"];
    $correo = new Correo($destinatario, "Recuperar mi Cuenta", "Haz click en este enlace para recuperar tu cuenta http://localhost/barbershopWebApp/Vista/recuperarcuenta.php?correo=$destinatario");
    $correo->enviarCorreo();
    echo json_encode("Correo enviado a $destinatario");
}
