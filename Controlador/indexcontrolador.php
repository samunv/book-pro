<?php
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/NotificacionDao.php";

if(isset($_GET["sesion"])){
    $sesion= $_GET["sesion"];
    $daoUs = new UsuariosDao();
    $resultado = $daoUs->leerUsuarioPorCorreo($sesion);
    echo json_encode($resultado[0]);
}

if (isset($_GET["correoNotificaciones"])) {
    $daoNot = new NotificacionDAO();
    $correo = $_GET["correoNotificaciones"];
    $resultado = $daoNot->leerNotificacionesPorDestinatario($correo);
    echo json_encode($resultado);
}