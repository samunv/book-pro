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

    public function cerrarSesion()
    {
        session_unset();
        session_destroy();
    }
}
