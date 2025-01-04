<?php
class Conexion
{
    /**
     * @var mysqli $conexion objeto de la clase mysqli para crear una conexión con la base de datos
     * @var string $servidor servidor en el que se encuentra la base de datos
     * @var string $usuario usuario con los permisos de la base de datos
     * @var string $contrasena_bd contraseña del usuario con acceso a la base de datos
     * @var string $nombre_bd nombre de la base de datos
     */

    private $conexion;
    private $servidor = "localhost";
    private $usuario = "root";
    private $contrasena_bd = "";
    private $nombre_bd = "barbershop";

    public function __construct()
    {
        // Establecer conexión con la base de datos
        $this->conexion = new mysqli($this->servidor, $this->usuario, $this->contrasena_bd, $this->nombre_bd);

        // Verificar la conexión
        if ($this->conexion->connect_error) {
            die("Error de conexión con la base de datos.");
        }
    }
    public function getConexion()
    {
        return $this->conexion;
    }
}
