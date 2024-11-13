<?php
require_once "./../Modelo/Usuarios.php";
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Sesion.php";

$usuarioDAO = new UsuariosDao();
$sesion = new Sesion();

// Validar que el parámetro 'correo' esté presente en la URL
if (isset($_GET['correo'])) {
    $nombreSesion = $_GET['correo']; // Accede al parámetro 'correo'
    $sesion->setUsuario($nombreSesion);
    $array['exito'] = "Correo recibido correctamente: $nombreSesion";
} else {
    $array['error'] = "No se ha proporcionado un correo válido.";
}

echo json_encode($array);
