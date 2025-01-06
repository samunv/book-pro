<?php
require_once "../Modelo/NotificacionDao.php";
require_once "./../Modelo/UsuariosDao.php";

$daoNot = new NotificacionDAO();

if (isset($_GET["correo"])) {
    $correo = $_GET["correo"];
    $resultado = $daoNot->leerNotificacionesPorDestinatario($correo);
    echo json_encode($resultado);
}
if (isset($_GET["correoUsuario"])) {
    $correo = $_GET["correoUsuario"];
    $daoUs = new UsuariosDao();
    $resultado = $daoUs->leerUsuarioPorCorreo($correo);
    echo json_encode($resultado);
}
if ((isset($_GET["borrarNotificaciones"]) && $_GET["borrarNotificaciones"] === "true") && isset($_GET["correoBorrar"])) {
    $correo = $_GET["correoBorrar"];
    $resultado = $daoNot->borrarNotificacionesPorCorreo($correo);
    echo json_encode($resultado);
}
