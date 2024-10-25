<?php
require_once "Conexion.php";

// Configurar la conexión a la base de datos
$conexion = new Conexion();

// Definir la consulta SQL para eliminar todos los registros de la tabla citas con más de 24 horas de antigüedad
$sql = "DELETE FROM citas WHERE fecha < DATE_SUB(NOW(), INTERVAL 30 DAY)";

// Ejecutar la consulta
if ($conexion->getConexion()->query($sql) === TRUE) {
    echo "Se han eliminado todas las citas antiguas correctamente.";
} else {
    echo "Error al intentar eliminar las citas: " . $conexion->getConexion()->error;
}
?>