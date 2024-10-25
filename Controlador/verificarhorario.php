<?php
require_once "./../Modelo/CitaDao.php";

$daoCitas = new CitaDao();

$hora = $_GET['hora'];
$dia = $_GET['fecha'];
$verificar = $daoCitas->verificarHoraYDia($hora, $dia);

if (!$verificar) {
    $respuesta = array('error' => "Hora y día no disponibles, seleccione otra hora u otro día, porfavor.");
} else {
    $respuesta = array('exito' => "Hora libre");
}

echo json_encode($respuesta);