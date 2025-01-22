<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao();
$citas = $daoCitas->obtenerTodasLasCitas();
echo json_encode($citas);