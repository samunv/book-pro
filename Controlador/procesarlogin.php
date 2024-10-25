<?php
require_once "./../Modelo/Usuarios.php";
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Sesion.php"; 

$usuarioDAO = new UsuariosDao();
$sesion = new Sesion(); 

$inputNombre = $_POST["nombreLogin"];
$inputContrasena = $_POST["contrasenaLogin"];

$array = array();

if(isset($_SESSION["nombre"])){
    $usuario = $sesion->getUsuario(); 
} else{
    $verificarUsuario = $usuarioDAO->leerUsuario($inputNombre, $inputContrasena);

    if (!empty($verificarUsuario)) {
        $array["exito"] = "Verificación exitosa.";
        $sesion->setUsuario($inputNombre); 
    } else {
        // Crear un nuevo usuario
        $array["error"] = "Lo sentimos. No existe ese usuario.";
    }
}

echo json_encode($array);



