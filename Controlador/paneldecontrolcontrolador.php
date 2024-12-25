<?php
require_once "../Modelo/ProfesionalesDao.php";
require_once "../Modelo/UsuariosDao.php";
require_once "./../Modelo/CitaDao.php";
require_once "../Modelo/ProfesionalesDao.php";
require_once "../Modelo/Sesion.php";
require_once "../Modelo/ServicioDao.php";

if ((isset($_GET['cerrarSesionBoolean']) && $_GET['cerrarSesionBoolean'] === 'true')) {
    // Si se recibe el parámetro de cerrarSesionBoolean (booleano) como true:

    $sesion = new Sesion();
    $array = array();

    if (isset($_SESSION["nombre"])) {
        $cerrar = $sesion->cerrarSesion();
        $array['exito'] = "Sesión cerrada";
    } else {
        $array['error'] = "No existe una sesión";
    }

    echo json_encode($array);
}



if (isset($_GET['idUsuarioParaIdProfesional'])) {
    $daoProf = new ProfesionalesDao();

    $idUsuarioParaIdProfesional = $_GET['idUsuarioParaIdProfesional'];
    $idProfesional = $daoProf->obtenerIdProfesionalPorIdUsuario($idUsuarioParaIdProfesional);

    echo json_encode($idProfesional);
}



if (isset($_GET["idProfesionalParaCitas"])) {
    $daoCitas = new CitaDao();
    $idProfesionalParaCitas = $_GET["idProfesionalParaCitas"];
    $citasDelProfesional = $daoCitas->leerCitas($idProfesionalParaCitas);
    echo json_encode($citasDelProfesional);
}

if (isset($_GET["obtenerServicio"]) && $_GET["obtenerServicio"] === "true" && isset($_GET["idProfesionalParaServicios"])) {
    $daoServ = new ServicioDao();
    $respuesta = $daoServ->leerServiciosDeIdProfesional($_GET["idProfesionalParaServicios"]);
    echo json_encode($respuesta);
}
