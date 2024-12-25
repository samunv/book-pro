<?php
require_once "../Modelo/ServicioDao.php";
$daoSer = new ServicioDao();
$servicios = $daoSer->leerServicios();
echo json_encode($servicios);