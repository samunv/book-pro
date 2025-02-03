<?php
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Correo.php";

if (isset($_GET["contrasenaNueva"]) && isset($_GET["correo"])) {
	$correo = $_GET["correo"];
	$contrasenaNueva = $_GET["contrasenaNueva"];
	// Encriptar la constraseña del usuario para que no pueda ser vista desde la BBDD por protección de datos del usuario
	$contrasena_encriptada = password_hash($contrasenaNueva, PASSWORD_BCRYPT);

	$daoUs = new UsuariosDao();
	$resultado = $daoUs->actualizarContrasena($contrasena_encriptada, $correo);
	echo json_encode($resultado);
}
