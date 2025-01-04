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

    public function leerUsuarioPorNombre($nombre)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE nombre='$nombre'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }

        return $datosArray;
    }


    public function leerUsuarioPorCorreo($correo)
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
        $sql = "INSERT INTO usuarios(nombre, permisos, telefono, contrasena, foto, correo, token, color1, color2) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $nombre = $u->getNombre();
            $permisos = $u->getPermisos();
            $telefono = $u->getTelefono();
            $contrasena = $u->getContrasena();
            $foto = $u->getFoto();
            $correo = $u->getCorreo();
            $token = $u->getToken();
            $color1 = $u->getColor1();
            $color2 = $u->getColor2();

            $consulta->bind_param("sisssssss", $nombre, $permisos, $telefono, $contrasena, $foto, $correo, $token, $color1, $color2);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha registrado el usuario '$correo'.";
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

    public function buscarToken($token, $correo)
    {
        $consulta = mysqli_query($this->conexion->getConexion(), "SELECT * FROM usuarios WHERE token='$token' AND correo='$correo'") or die("Error en consulta: " . mysqli_error($this->conexion->getConexion()));
        $datosArray = array();
        while ($reg = mysqli_fetch_array($consulta)) {
            $datosArray[] = $reg;
        }

        return $datosArray;
    }


    public function eliminarUsuario($correo)
    {
        $sql = "DELETE FROM usuarios WHERE correo=?";
        $consulta = $this->conexion->getConexion()->prepare($sql);
        if ($consulta) {
            $consulta->bind_param("s", $correo);

            $resultado = $consulta->execute();  // Verificar si la ejecución tuvo éxito
            if ($resultado) {
                return "Se ha eliminado el usuario.";
            } else {
                return "Error al eliminar.";
            }
        } else {
            // Si la preparación falla, devolver un mensaje de error
            return "Error al preparar la consulta";
        }
    }
}
