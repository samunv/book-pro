<?php
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Sesion.php";


$nombre = $_GET["nombre"];
$telefono = $_GET["telefono"];
$idUsuario = $_GET["idUsuario"];

$daoUs = new UsuariosDao();
$sesion = new Sesion();




$resultado = $daoUs->actualizarUsuario($nombre, $telefono, $idUsuario);
$sesion->setUsuario($nombre);

echo json_encode($resultado);


