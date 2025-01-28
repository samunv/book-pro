<?php
require_once "./../Modelo/ProfesionalesDao.php";
require_once "./../Modelo/CitaDao.php";
require_once "./../Modelo/Cita.php";
require_once "./../Modelo/Correo.php";
require_once "./../Modelo/Notificacion.php";
require_once "./../Modelo/NotificacionDao.php";


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
    $fechaCita = $fecha . " de " .  $mes . " de " . $año . " a las " . $hora;

    $notificacion = new Notificacion("Reserva de Cita", "Has reservado una cita el $fechaCita.", $correo);
    $notificacion->setImagen_notificacion("./img/notificacion-reserva.png");
    enviarNotificacion($notificacion);

    $reservaCompletada = $daoCita->crearCita($cita);


    echo json_encode($reservaCompletada);
} else if (isset($_GET["correoDestinatario"]) && isset($_GET["cliente"]) && isset($_GET["hora"]) && isset($_GET["fecha"]) && isset($_GET["mes"]) && isset($_GET["año"]) && isset($_GET["servicio"])) {

    $destinatario = $_GET["correoDestinatario"];
    $cliente = $_GET["cliente"];
    $servicio = $_GET["servicio"];
    $hora = $_GET["hora"];
    $fecha = $_GET["fecha"];
    $mes = $_GET["mes"];
    $año = $_GET["año"];

    $fechaCita = $fecha . " de " .  $mes . " de " . $año . " a las " . $hora;

    $notificacion = new Notificacion("Reserva de Cita", "$cliente ha reservado una cita de $servicio el $fechaCita.", $destinatario);
    $notificacion->setImagen_notificacion("./img/notificacion-reserva.png");
    enviarNotificacion($notificacion);
    echo json_encode("Notificación enviada al destinatario.");
}

// Función para enviar notificación
function enviarNotificacion($notificacion)
{
    $daoNotificacion = new NotificacionDAO();
    $daoNotificacion->crearNotificacion($notificacion);
    $notificacion->enviarNotificacionCorreo($notificacion);
}

// Función para enviar correo
function enviarCorreo($correo, $fecha)
{
    $c = new Correo($correo, "Cita Reservada", "Tu cita de $fecha ha sido reservada con éxito. Para más información mira la página de Mis citas en la aplicación.");
    $c->enviarCorreo();
}
