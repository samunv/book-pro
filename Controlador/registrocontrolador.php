<?php
require_once "./../Modelo/Usuarios.php";
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Correo.php";


session_start();

// Crear una instancia de UsuarioDAO
$usuarioDAO = new UsuariosDao();

$array = array();


// Variable para almacenar temporalmente los datos del usuario provisional
$usuarioProvisional = null;

// Comprobar si los datos han sido enviados
if (isset($_POST["nombre"]) && isset($_POST["contrasena"]) && isset($_POST["telefono"]) && isset($_POST["correo"])) {
    $inputNombre = $_POST["nombre"];
    $inputContrasena = $_POST["contrasena"];
    $inputTelefono = $_POST["telefono"];
    $inputCorreo = $_POST["correo"];

    // Verificar si el teléfono o el correo ya están en uso
    $verificarTelefono = $usuarioDAO->leerUsuarioPorTelefono($inputTelefono);
    $verificarCorreo = $usuarioDAO->leerUsuarioPorCorreo($inputCorreo);

    // Si el teléfono ya está en uso
    if (!empty($verificarTelefono)) {
        $array["error"] = "El teléfono introducido no está disponible o ya está en uso.";
    }
    // Si el correo ya está en uso
    else if (!empty($verificarCorreo)) {
        $array["error"] = "El correo introducido no está disponible o ya está en uso.";
    }
    // Si todo está correcto, crear el usuario provisional
    else {
        // Crear un token único para confirmar el correo electrónico
        $token = substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 0, 8);

        // Crear el objeto de usuario provisional
        $usuarioProvisional = new Usuarios(
            $inputNombre,
            0,
            $inputTelefono,
            $inputContrasena,
            "./img/perfil-default.png",
            $inputCorreo,
            $token
        );

        if (!empty($token)) {
            $_SESSION['usuarioProvisional'] = serialize($usuarioProvisional);
        }

        // Enviar correo con el token
        if (enviarCorreo($inputCorreo, $token)) {
            $array["mensaje"] = "Correo de verificación enviado. Confirma tu correo para completar el registro.";
            $array["provisional"] = true; // Indicador de usuario provisional
        } else {
            $array["error"] = "Hubo un problema al enviar el correo de verificación.";
        }
    }
    // Devolver el resultado como JSON
    echo json_encode($array);
}

// Verificación del token de correo
if (isset($_GET["token"]) && isset($_GET["correoToken"])) {
    if (isset($_SESSION['usuarioProvisional'])) {
        $usuarioProvisional = unserialize($_SESSION['usuarioProvisional']);
        if (
            $usuarioProvisional->getCorreo() === $_GET["correoToken"] &&
            $usuarioProvisional->getToken() === $_GET["token"]
        ) {
            // Crear el usuario en la base de datos
            $resultado = $usuarioDAO->crearUsuario($usuarioProvisional);
            unset($_SESSION['usuarioProvisional']); // Eliminar el usuario provisional tras guardarlo
            echo json_encode(["mensaje" => "Usuario verificado y registrado con éxito."]);
        } else {
            echo json_encode(["mensaje" => "Token inválido o no coincide con el usuario provisional."]);
        }
    } else {
        echo json_encode(["mensaje" => "No hay un usuario provisional almacenado."]);
    }
}


// Eliminación manual del usuario provisional
if (isset($_GET["correoEliminar"])) {
    // No se necesita interacción con la base de datos ya que el usuario no se crea aún.
    $usuarioProvisional = null;
    $array["mensaje"] = "Usuario provisional eliminado.";
    echo json_encode($array);
}

// Función para enviar correo
function enviarCorreo($correo, $token)
{
    // Crear el objeto de correo
    $c = new Correo(
        $correo,
        "Registro en BarberPro - Confirma que eres tú",
        "Tu código de verificación es: $token. Si no eres tú, ignora este correo."
    );
    return $c->enviarCorreo();
}
