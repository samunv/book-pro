<?php
require_once "../Modelo/UsuariosDao.php";

$daoUsuarios = new UsuariosDao();
$nombreUsuario = $_GET['nombre'];
$idUsuario = $daoUsuarios->obtenerId($nombreUsuario);

if (!empty($idUsuario)) {
    echo json_encode($idUsuario[0]); // Enviar solo el primer resultado, que contiene idUsuario
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}
