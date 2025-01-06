<?php
require_once "Notificacion.php";
require_once "Conexion.php";

class NotificacionDAO
{
    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function crearNotificacion(Notificacion $n)
    {
        $sql = "INSERT INTO notificaciones(titulo, mensaje, destinatario, imagen_notificacion) VALUES(?, ?, ?, ?)";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $titulo = $n->getTitulo();
            $mensaje = $n->getMensaje();
            $destinatario = trim($n->getDestinatario());
            $imagen = $n->getImagen_notificacion();
            $consulta->bind_param("ssss", $titulo, $mensaje, $destinatario, $imagen);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha creado una notificación.";
            } else {
                return "Error al crear notificación.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }

    public function leerNotificacionesPorDestinatario($destinatario)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM notificaciones WHERE destinatario='$destinatario'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function borrarNotificacionesPorCorreo($correo)
    {
        $sql = "DELETE FROM notificaciones where destinatario=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("s", $correo);
            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se han eliminado las notificaciones.";
            } else {
                return "Error al eliminar notificaciones.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }
}
