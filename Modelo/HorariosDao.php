<?php
require_once "Conexion.php";
class HorariosDao
{
    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function leerHorarios()
    {
        $consulta = mysqli_query(
            $this->conexion->getConexion(),
            "SELECT hora FROM horarios"
        ) or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerHorasLibres($fecha, $mes, $año, $idProfesional)
    {
        $consulta = mysqli_query(
            $this->conexion->getConexion(),
            " SELECT 
        h.hora
    FROM 
        horarios h
    LEFT JOIN 
        citas c
    ON 
        h.hora = c.hora
        AND c.fecha = '$fecha'
        AND c.mes = '$mes'
        AND c.idProfesional = '$idProfesional'
        AND c.año = '$año'
    WHERE 
        c.hora IS NULL
    ORDER BY 
        h.hora"
        )
            or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));

        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return json_encode($datosArray);
    }
}
