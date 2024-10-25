<?php
require_once "./../Modelo/CitaDao.php";
require_once "./../Modelo/Cita.php";

$fecha = $_GET['dia'];
$hora = $_GET['hora'];
$idUsuario = $_GET['idUsuario'];
$idProfesional = $_GET['idProfesional'];
$mes = $_GET['mes'];
$año = $_GET['año'];
$idServicio  = $_GET['idServicio'];

$daoCita = new CitaDao();
$cita = new Cita($idUsuario, $fecha, $hora, $idProfesional, $mes, $año, $idServicio);

$resultado = $daoCita->crearCita($cita);

echo json_encode($resultado);
