<?php
require_once "Cita.php";
require_once "Conexion.php";
class CitaDao
{

    /**
     * @var Conexion $conexion almacenar la conexion con la base de datos
     */

    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function leerCitas()
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM citas ORDER BY 
  año,
  CASE 
    WHEN mes = 'enero' THEN 1
    WHEN mes = 'febrero' THEN 2
    WHEN mes = 'marzo' THEN 3
    WHEN mes = 'abril' THEN 4
    WHEN mes = 'mayo' THEN 5
    WHEN mes = 'junio' THEN 6
    WHEN mes = 'julio' THEN 7
    WHEN mes = 'agosto' THEN 8
    WHEN mes = 'septiembre' THEN 9
    WHEN mes = 'octubre' THEN 10
    WHEN mes = 'noviembre' THEN 11
    WHEN mes = 'diciembre' THEN 12
  END,
  fecha, hora") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return json_encode($datosArray);
    }


    public function leerCitaPorId($id)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM citas WHERE idCita='$id'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerCitasPorIdUsuario($idUsuario)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT 
        citas.*, /*Seleccionar todo de citas*/ 
        profesionales.nombre AS nombreProfesional,
        servicios.* 
    FROM 
        citas
    JOIN 
        profesionales ON citas.idProfesional = profesionales.idProfesional
    JOIN 
        servicios ON citas.idServicio = servicios.idServicio
    WHERE 
        citas.idUsuario = '$idUsuario'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }


    public function verificarHoraYDia($hora, $dia)
    {
        $sql = "SELECT * FROM citas WHERE hora = ? AND fecha=?";
        $stmt = $this->conexion->getConexion()->prepare($sql);

        if ($stmt) {
            // Bind de parámetro y ejecución de la consulta
            $stmt->bind_param("ss", $hora, $dia);
            $stmt->execute();

            // Obtener resultados
            $result = $stmt->get_result();

            // Contar el número de filas encontradas
            $numRows = $result->num_rows;

            // Si hay alguna fila, la hora está ocupada
            if ($numRows > 0) {
                return false; // Hora ocupada
            } else {
                return true; // Hora disponible
            }
        }
    }

    public function crearCita(Cita $c)
    {
        $sql = "INSERT INTO citas(idUsuario, fecha, hora, idProfesional, mes, año, idServicio) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $fecha = $c->getFecha();
            $hora = $c->getHora();
            $idUsuario = $c->getIdUsuario();
            $idProfesional = $c->getIdProfesional();
            $año = $c->getAño();
            $mes = $c->getMes();
            $idServicio = $c->getIdServicio();
            $consulta->bind_param("issisii", $idUsuario, $fecha, $hora, $idProfesional, $mes, $año, $idServicio);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                // Recuperar el ID generado automáticamente por la base de datos
                $idCita = $consulta->insert_id;
                return $idCita;
            } else {
                return "Error al crear la cita";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }

    public function leerDiasOcupados()
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT fecha
FROM citas
GROUP BY fecha
HAVING COUNT(DISTINCT hora) = (SELECT COUNT(*) FROM horarios)") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function eliminarCita($id) {
        // Realizar la consulta de eliminación
        $consulta = mysqli_query($this->conexion->getConexion(), "DELETE FROM citas WHERE idCita='$id'");
    
        // Verificar si la consulta fue exitosa
        if ($consulta) {
            // Devolver un array con un mensaje de éxito
            return  "Cita eliminada correctamente.";
        } else {
            // Devolver un array con el error si la consulta falló
            return "Error al eliminar la cita: " . mysqli_error($this->conexion->getConexion());
        }
    }
}
