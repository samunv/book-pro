<?php
require_once "../Modelo/ProfesionalesDao.php";
require_once "./../Modelo/CitaDao.php";
require_once "./../Modelo/Cita.php";
require_once "./../Modelo/Correo.php";

if (isset($_GET["idProfesionalParaNombre"])) {
    $daoProf = new ProfesionalesDao();
    $idProfesionaParaNombre = $_GET["idProfesionalParaNombre"];
    $nombreProfesional = $daoProf->leerNombre($idProfesionaParaNombre);
    echo json_encode($nombreProfesional);
} else if (isset($_GET['dia']) && isset($_GET['hora']) && isset($_GET['idUsuario']) && isset($_GET['idProfesional']) && isset($_GET['mes']) && isset($_GET['año']) && isset($_GET['idServicio']) && isset($_GET["correo"])) {

    $fecha = $_GET['dia'];
    $hora = $_GET['hora'];
    $idUsuario = $_GET['idUsuario'];
    $idProfesional = $_GET['idProfesional'];
    $mes = $_GET['mes'];
    $año = $_GET['año'];
    $idServicio  = $_GET['idServicio'];
    $correo = $_GET['correo'];

    $daoCita = new CitaDao();
    $cita = new Cita($idUsuario, $fecha, $hora, $idProfesional, $mes, $año, $idServicio);

    $reservaCompletada = $daoCita->crearCita($cita);

    $fechaCita = $fecha . " de " .  $mes . " de " . $año . " a las " . $hora;

    enviarCorreo($correo, $fechaCita);

    echo json_encode($reservaCompletada);
} 

// Función para enviar correo
function enviarCorreo($correo, $fecha)
{
    $c = new Correo();
    $c->enviarCorreo($correo, "Cita Reservada", "Tu cita de $fecha ha sido reservada con éxito. Para más información mira la página de Mis citas en la aplicación.");
}

