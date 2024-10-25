<?php
require_once "Conexion.php";
class ServicioDao
{
    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function leerServicios()
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM servicios") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }
   
}
