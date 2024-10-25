<?php
require_once "./../Modelo/HorariosDao.php";
$daoHorario = new HorariosDao(); 

$dia = $_GET['dia'];
$idProfesional = $_GET['idProfesional']; 
$año = $_GET['año'];
$mes = $_GET['mes'];



$horas = $daoHorario->leerHorasLibres($dia, $mes, $año, $idProfesional);

echo $horas; 