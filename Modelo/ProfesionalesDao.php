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
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM profesionales ") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerNombre($id)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT nombre FROM profesionales WHERE idProfesional='$id'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerProfesionalPorServicio($idServicio){
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM profesionales INNER JOIN profesional_servicio ON profesionales.idProfesional = profesional_servicio.idProfesional WHERE profesional_servicio.idServicio = '$idServicio'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }
}
