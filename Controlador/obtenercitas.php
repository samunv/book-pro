<?php
require_once "./../Modelo/CitaDao.php";
$daoCitas = new CitaDao(); 
$resultado = $daoCitas->leerCitas(); 
echo $resultado;