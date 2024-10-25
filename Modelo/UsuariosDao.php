<?php
require_once "Usuarios.php";
require_once "Conexion.php";
class UsuariosDao
{
    private $conexion;

    public function __construct()
    {
        return $this->conexion = new Conexion();
    }

    public function leerUsuario($nombre, $contrasena)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE nombre='$nombre' AND contrasena='$contrasena'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerUsuarioPorId($id){
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE idUsuario='$id'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerUsuarioPorTelefono($telefono)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE telefono='$telefono'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }

        return $datosArray;
    }

    public function leerUsuarioPorNombre($nombre)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE nombre='$nombre'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }

        return $datosArray;
    }


    public function obtenerId($nombre)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT idUsuario FROM usuarios WHERE nombre='$nombre'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }

        return $datosArray;
    }



    public function crearUsuario(Usuarios $u)
    {
        $sql = "INSERT INTO usuarios(nombre, permisos, telefono, contrasena) VALUES(?, ?, ?, ?)";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $nombre = $u->getNombre();
            $permisos = $u->getPermisos();
            $telefono = $u->getTelefono();
            $contrasena = $u->getContrasena();

            $consulta->bind_param("siss", $nombre, $permisos, $telefono, $contrasena);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha registrado el usuario '$nombre'.";
            } else {
                return "Error al registrarse.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }

    public function actualizarUsuario($nombre, $telefono, $id){
        $sql = "UPDATE usuarios SET nombre=?, telefono=? WHERE idUsuario=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("ssi", $nombre, $telefono, $id);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha actualizado el usuario '$nombre'.";
            } else {
                return "Error al actualizar.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }
}
