<?php 
require_once "../Modelo/UsuariosDao.php";
$idUsuario = $_GET["idUsuario"];
$daoUs = new UsuariosDao();
$resultado = $daoUs->leerUsuarioPorId($idUsuario);
echo json_encode($resultado[0]);