<?php
require_once "./../Modelo/HorariosDao.php";
require_once "../Modelo/ProfesionalesDao.php";


if (isset($_GET['diaParaHorario']) && isset($_GET['idProfesionalParaHorario']) && isset($_GET['añoParaHorario']) && isset($_GET['mesParaHorario']) && isset($_GET['idServicioParaHorario'])) {

    // Si se reciben esos parámetros, obtener los horarios disponibles

    $daoHorario = new HorariosDao();

    $diaParaHorario = $_GET['diaParaHorario'];
    $idProfesionalParaHorario = $_GET['idProfesionalParaHorario'];
    $añoParaHorario = $_GET['añoParaHorario'];
    $mesParaHorario = $_GET['mesParaHorario'];
    $idServicioParaHorario = $_GET['idServicioParaHorario'];

    $horasDisponibles = $daoHorario->leerHorasLibres($diaParaHorario, $mesParaHorario, $añoParaHorario, $idProfesionalParaHorario, $idServicioParaHorario);

    echo $horasDisponibles;
}


if (isset($_GET['idServicioParaProfesionales'])) {

    // obtener los profesionales que estén relacionados con el servicio con idServicioParaProfesionales

    $daoProf = new ProfesionalesDao();

    $idServicioParaProfesionales = $_GET['idServicioParaProfesionales'];
    $profesionales = $daoProf->leerProfesionalPorServicio($idServicioParaProfesionales);

    echo json_encode($profesionales);
}

//idServicioParaProfesionales
