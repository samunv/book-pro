<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao(); 
$idCita = $_GET['idCita'];
$resultado = $daoCitas->leerCitaPorId($idCita); 
echo json_encode($resultado);