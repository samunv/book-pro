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

    public function leerUsuario($correo, $contrasena)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE correo='$correo' AND contrasena='$contrasena'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }
        return $datosArray;
    }

    public function leerUsuarioPorId($id)
    {
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

    public function leerUsuarioPorNombre($correo)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE correo='$correo'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
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
        $sql = "INSERT INTO usuarios(nombre, permisos, telefono, contrasena, foto, correo) VALUES(?, ?, ?, ?, ?, ?)";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $nombre = $u->getNombre();
            $permisos = $u->getPermisos();
            $telefono = $u->getTelefono();
            $contrasena = $u->getContrasena();
            $foto = $u->getFoto();
            $correo = $u->getCorreo();

            $consulta->bind_param("sissss", $nombre, $permisos, $telefono, $contrasena, $foto, $correo);

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

    public function actualizarUsuario($nombre, $telefono, $id)
    {
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
    public function actualizarNombre($nombre, $id)
    {
        $sql = "UPDATE usuarios SET nombre=? WHERE idUsuario=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("si", $nombre, $id);

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

    public function actualizarTelefono($telefono, $id)
    {
        $sql = "UPDATE usuarios SET telefono=? WHERE idUsuario=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("si", $telefono, $id);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha actualizado el teléfono.";
            } else {
                return "Error al actualizar.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }

    public function actualizarFoto($foto, $id)
    {
        $sql = "UPDATE usuarios SET foto=? WHERE idUsuario=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("si", $foto, $id);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha actualizado la foto de perfil.";
            } else {
                return "Error al actualizar.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }
}
