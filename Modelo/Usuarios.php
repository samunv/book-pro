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
     * @var string
     */
    private $token;

    /**
     * @var string
     */
    private $color1;

    /**
     * @var string
     */
    private $color2;

    /**
     * Constructor de la clase Usuarios.
     *
     * @param int $idUsuario
     * @param string $nombre
     * @param string $permisos
     * @param string $telefono
     * @param string $contrasena
     * @param String $foto
     * @param String $correo
     * @param String $token
     */
    public function __construct($nombre, $permisos, $telefono, $contrasena, $foto, $correo, $token)
    {
        $this->nombre = $nombre;
        $this->permisos = $permisos;
        $this->telefono = $telefono;
        $this->contrasena = $contrasena;
        $this->foto = $foto;
        $this->correo = $correo;
        $this->token = $token;
        $this->setColors();
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

    /**
     * Get the value of token
     *
     * @return  string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Set the value of token
     *
     * @param  string  $token
     *
     * @return  self
     */
    public function setToken(string $token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Get the value of color1
     *
     * @return  string
     */
    public function getColor1()
    {
        return $this->color1;
    }

    /**
     * Get the value of color2
     *
     * @return  string
     */
    public function getColor2()
    {
        return $this->color2;
    }

    public function setColors()
    {
        $colores1 = ["#BFE8FF", "#d5ffdb", "#ffd4fe", "#ffeeda", "#ffe8e8", "#e3ffe6", "#f0f4ff", "#fff5e3", "#fde4ff", "#e7fff8"];
        $colores2 = ["#006bff", "#00a317", "#d600d3", "#ff8a00", "#ff0000", "#009933", "#001eff", "#ff9100", "#cc00cc", "#00c8a0"];

        // Asegurar que el índice sea válido para ambos arrays
        $indice = array_rand($colores1);
        $this->color1 = $colores1[$indice];
        $this->color2 = $colores2[$indice];
    }
}
