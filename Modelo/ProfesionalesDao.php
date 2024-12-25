<?php
require_once "Profesional.php";
require_once "Conexion.php";
class ProfesionalesDao
{

    /**
     * @var Conexion $conexion almacenar la conexion con la base de datos
     */

    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function leerProfesionales()
    {
        // Realizar el JOIN entre la tabla 'profesionales' y 'usuarios'
        $consulta = mysqli_query(
            $this->conexion->getConexion(),
            "SELECT p.idProfesional, u.nombre AS nombreProfesional
         FROM profesionales p
         LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario"
        ) or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }


    public function leerNombre($id)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "
            SELECT usuarios.nombre
            FROM profesionales
            INNER JOIN usuarios ON profesionales.idUsuario = usuarios.idUsuario
            WHERE profesionales.idProfesional = '$id'
        ") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerProfesionalPorServicio($idServicio)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "
            SELECT profesionales.*, usuarios.*, profesional_servicio.*
            FROM profesionales
            INNER JOIN profesional_servicio ON profesionales.idProfesional = profesional_servicio.idProfesional
            INNER JOIN usuarios ON profesionales.idUsuario = usuarios.idUsuario
            WHERE profesional_servicio.idServicio = '$idServicio'
        ") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function obtenerIdProfesionalPorIdUsuario($idUsuario)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "
        SELECT idProfesional
        FROM profesionales
        WHERE idUsuario = '$idUsuario'
    ") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        // Solo esperamos un resultado, así que verificamos si hay una fila y la devolvemos
        if ($reg = mysqli_fetch_array($consulta)) {
            return $reg['idProfesional'];
        }
        return null; // Retorna null si no se encuentra un profesional con ese idUsuario
    }
}
