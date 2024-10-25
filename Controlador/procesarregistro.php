<?php
require_once "./../Modelo/Usuarios.php";
require_once "../Modelo/UsuariosDao.php";


// Crear una instancia de UsuarioDAO
$usuarioDAO = new UsuariosDao();

$inputNombre = $_POST["nombre"];
$inputContrasena = $_POST["contrasena"];
$inputTelefono = $_POST["telefono"];

// Verificar si el teléfono ya está en uso
$verificarTelefono = $usuarioDAO->leerUsuarioPorTelefono($inputTelefono);
$verificarNombre = $usuarioDAO->leerUsuarioPorNombre($inputNombre); 

$array = array();

if (!empty($verificarTelefono)) {
    // Si se encuentra el usuario con el mismo teléfono, se añade un mensaje de error al array
    $array["error"] = "El teléfono introducido no está disponible o ya está en uso.";
} else if(!empty($verificarNombre)){
    // Crear un nuevo usuario
    $array["error"] = "El nombre introducido no está disponible o ya está en uso."; 
}else{
    $nuevoUsuario = new Usuarios($inputNombre, 0, $inputTelefono, $inputContrasena);
    $resultado = $usuarioDAO->crearUsuario($nuevoUsuario);
}

// Devolver el resultado como JSON
echo json_encode($array);
?>