<?php
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Correo.php";

if (isset($_GET["contrasenaNueva"]) && isset($_GET["correo"])) {
    $correo = $_GET["correo"];
    $contrasenaNueva = $_GET["contrasenaNueva"];
    $daoUs = new UsuariosDao();
    $resultado = $daoUs->actualizarContrasena($contrasenaNueva, $correo);
    echo json_encode($resultado);
}
