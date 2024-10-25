<?php 
require_once "../Modelo/ProfesionalesDao.php";
$daoProf = new ProfesionalesDao();

$idServicio = $_GET['idServicio'];
$resultado = $daoProf->leerProfesionalPorServicio($idServicio);

echo json_encode($resultado);