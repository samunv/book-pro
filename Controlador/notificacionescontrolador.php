<?php
require_once "../Modelo/NotificacionDao.php";

$daoNot = new NotificacionDAO();
$correo = $_GET["correo"];
$resultado = $daoNot->leerNotificacionesPorDestinatario($correo);
echo json_encode($resultado);