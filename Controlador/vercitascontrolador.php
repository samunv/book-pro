<?php
require_once "./../Modelo/CitaDao.php";
require_once "./../Modelo/ProfesionalesDao.php";
require_once "./../Modelo/ServicioDao.php";
require_once "./../Modelo/UsuariosDao.php";
require_once "./../Modelo/Notificacion.php";
require_once "./../Modelo/NotificacionDao.php";

$daoCitas = new CitaDao();

if (isset($_GET["idUsuario"])) {
    $idUsuario = $_GET['idUsuario'];
    $citas = $daoCitas->leerCitasPorIdUsuario($idUsuario);
    echo json_encode($citas);
} else if (isset($_GET["idCita"])) {
    $idCita = $_GET['idCita'];
    $resultado = $daoCitas->leerCitaPorId($idCita);
    echo json_encode($resultado);
} else if (isset($_GET["idCitaEliminar"]) && isset($_GET["datosCita"])) {
    $idCitaEliminar = $_GET['idCitaEliminar'];
    $resultadoEliminar = $daoCitas->eliminarCita($idCitaEliminar);
    $datosCita = json_decode($_GET["datosCita"], true);
    crearNotificacion($datosCita);
    echo json_encode($resultadoEliminar);
}
if (isset($_GET["correoUsuario"])) {
    $correo = $_GET["correoUsuario"];
    $daoUs = new UsuariosDao();
    $resultado = $daoUs->leerUsuarioPorCorreo($correo);
    echo json_encode($resultado);
}
if(isset($_GET["fechaRecordatorio"])&&($_GET["horaRecordatorio"])&&($_GET["datosCita"])){
    $datosCita = json_decode($_GET["datosCita"], true);

}

function crearNotificacion($datos)
{
    $notificacion = new Notificacion("Reserva cancelada", $datos['cliente'] . " ha cancelado la reserva de " . $datos['nombreServicio'] . " con fecha: " . $datos['fecha'] . " de " . $datos['mes'] . " de " . $datos['año'] . " a las " . $datos['hora'], $datos['correoProfesional']);
    $notificacion->setImagen_notificacion("./img/notificacion-eliminar.png");
    $notificacion->enviarNotificacionCorreo($notificacion);

    $daoNot = new NotificacionDao();
    $daoNot->crearNotificacion($notificacion);
}

function crearRecordatorio($datos){

}
