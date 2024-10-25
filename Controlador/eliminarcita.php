<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao(); 
$idCita = $_GET['idCita'];
$resultado = $daoCitas->eliminarCita($idCita); 
echo json_encode($resultado);