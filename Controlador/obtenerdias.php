<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao(); 

$diasOcupados = $daoCitas->leerDiasOcupados();

echo json_encode($diasOcupados);
