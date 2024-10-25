<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao(); 
$idUsuario = $_GET['idUsuario']; 

$citas = $daoCitas->leerCitasPorIdUsuario($idUsuario); 
echo json_encode($citas);