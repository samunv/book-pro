<?php 
require_once "../Modelo/ProfesionalesDao.php";
$daoProf = new ProfesionalesDao();

$idProfesional= $_GET['idProfesional'];
$resultado = $daoProf->leerNombre($idProfesional);

echo json_encode($resultado);