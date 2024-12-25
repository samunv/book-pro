<?php
require_once "../Modelo/UsuariosDao.php";

$daoUsuarios = new UsuariosDao();
$idUsuario = $_GET['idUsuario'];
$usuarioCliente = $daoUsuarios->leerUsuarioPorId($idUsuario);

if (!empty($idUsuario)) {
    echo json_encode($usuarioCliente); // Enviar solo el primer resultado, que contiene idUsuario
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}
