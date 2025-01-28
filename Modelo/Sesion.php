<?php
class Sesion
{
    public function __construct()
    {
        session_start();
    }

    public function setUsuario($nombre)
    {
        $_SESSION['nombre'] = $nombre;
    }

    public function getUsuario()
    {
        return $_SESSION['nombre'];
    }


    public function    setUsuarioProvisional($usuario_provisional)
    {
        $_SESSION['usuario_provisional'] = $usuario_provisional;
    }

    public function getUsuarioProvisional()
    {
        return $_SESSION['usuario_provisional'];
    }


    public function cerrarSesion()
    {
        session_unset();
        session_destroy();
    }
}
