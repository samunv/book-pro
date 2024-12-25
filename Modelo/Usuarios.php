<?php

/**
 * Class Usuarios
 *
 * Representa un usuario en el sistema.
 */
class Usuarios
{
    /**
     * @var int
     */
    private $idUsuario;

    /**
     * @var string
     */
    private $nombre;

    /**
     * @var string
     */
    private $permisos;

    /**
     * @var string
     */
    private $telefono;

    /**
     * @var string
     */
    private $contrasena;

    /**
     * @var string
     */
    private $foto;

    /**
     * @var string
     */
    private $correo;

    /**
     * Constructor de la clase Usuarios.
     *
     * @param int $idUsuario
     * @param string $nombre
     * @param string $permisos
     * @param string $telefono
     * @param string $contrasena
     */
    public function __construct($nombre, $permisos, $telefono, $contrasena, $foto, $correo)
    {
        $this->nombre = $nombre;
        $this->permisos = $permisos;
        $this->telefono = $telefono;
        $this->contrasena = $contrasena;
        $this->foto = $foto;
        $this->correo = $correo;
    }

    /**
     * Obtiene el id del usuario.
     *
     * @return int
     */
    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    /**
     * Establece el id del usuario.
     *
     * @param int $idUsuario
     */
    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    /**
     * Obtiene el nombre del usuario.
     *
     * @return string
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Establece el nombre del usuario.
     *
     * @param string $nombre
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    /**
     * Obtiene los permisos del usuario.
     *
     * @return string
     */
    public function getPermisos()
    {
        return $this->permisos;
    }

    /**
     * Establece los permisos del usuario.
     *
     * @param string $permisos
     */
    public function setPermisos($permisos)
    {
        $this->permisos = $permisos;
    }

    /**
     * Obtiene el teléfono del usuario.
     *
     * @return string
     */
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * Establece el teléfono del usuario.
     *
     * @param string $telefono
     */
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;
    }

    /**
     * Obtiene la contraseña del usuario.
     *
     * @return string
     */
    public function getContrasena()
    {
        return $this->contrasena;
    }

    /**
     * Establece la contraseña del usuario.
     *
     * @param string $contrasena
     */
    public function setContrasena($contrasena)
    {
        $this->contrasena = $contrasena;
    }

    /**
     * Get the value of foto
     */
    public function getFoto()
    {
        return $this->foto;
    }

    /**
     * Set the value of foto
     *
     * @return  self
     */
    public function setFoto($foto)
    {
        $this->foto = $foto;

        return $this;
    }

    /**
     * Get the value of correo
     *
     * @return  string
     */ 
    public function getCorreo()
    {
        return $this->correo;
    }

    /**
     * Set the value of correo
     *
     * @param  string  $correo
     *
     * @return  self
     */ 
    public function setCorreo(string $correo)
    {
        $this->correo = $correo;

        return $this;
    }
}
