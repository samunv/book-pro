<?php
require_once "./../Modelo/CitaDao.php";
require_once "./../Modelo/ProfesionalesDao.php";
require_once "./../Modelo/ServicioDao.php";
require_once "./../Modelo/UsuariosDao.php";

$daoCitas = new CitaDao();

if (isset($_GET["idUsuario"])) {
    $idUsuario = $_GET['idUsuario'];
    $citas = $daoCitas->leerCitasPorIdUsuario($idUsuario);
    echo json_encode($citas);
} else if (isset($_GET["idCita"])) {
    $idCita = $_GET['idCita'];
    $resultado = $daoCitas->leerCitaPorId($idCita);
    echo json_encode($resultado);
} else if (isset($_GET["idCitaEliminar"])) {
    $idCitaEliminar = $_GET['idCitaEliminar'];
    $resultadoEliminar = $daoCitas->eliminarCita($idCitaEliminar);
    echo json_encode($resultadoEliminar);
}if(isset($_GET["correoUsuario"])){
    $correo = $_GET["correoUsuario"];
    $daoUs = new UsuariosDao();
    $resultado = $daoUs->leerUsuarioPorCorreo($correo);
    echo json_encode($resultado);
}
