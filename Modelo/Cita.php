<?php

/**
 * Class Cita
 *
 * Representa una cita en la peluquería.
 */
class Cita
{
    /**
     * @var int
     */
    private $idCita;

    /**
     * @var int
     */
    private $idUsuario;

    /**
     * @var string
     */
    private $fecha;

    /**
     * @var string
     */
    private $hora;

    /**
     * @var int
     */
    private $idProfesional;

    /**
     * @var string
     */
    private $mes;

    /**
     * @var int
     */
    private $año;

     /**
     * @var int
     */
    private $idServicio;


    /**
     * Constructor de la clase Cita.
     *
     * @param int $idUsuario
     * @param string $fecha
     * @param string $hora
     * @param int $idProfesional
     * @param string $mes
     * @param int $año
     */
    public function __construct($idUsuario, $fecha, $hora, $idProfesional, $mes, $año, $idServicio)
    {
        $this->idUsuario = $idUsuario;
        $this->fecha = $fecha;
        $this->hora = $hora;
        $this->idProfesional = $idProfesional;
        $this->mes = $mes;
        $this->año = $año;
        $this->idServicio = $idServicio;
    }

    /**
     * Obtiene el id de la cita.
     *
     * @return int
     */
    public function getIdCita()
    {
        return $this->idCita;
    }

    /**
     * Establece el id de la cita.
     *
     * @param int $idCita
     */
    public function setIdCita($idCita)
    {
        $this->idCita = $idCita;
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
     * Obtiene la fecha de la cita.
     *
     * @return string
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Establece la fecha de la cita.
     *
     * @param string $fecha
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;
    }

    /**
     * Obtiene la hora de la cita.
     *
     * @return string
     */
    public function getHora()
    {
        return $this->hora;
    }

    /**
     * Establece la hora de la cita.
     *
     * @param string $hora
     */
    public function setHora($hora)
    {
        $this->hora = $hora;
    }

    /**
     * Obtiene el id del profesional.
     *
     * @return int
     */
    public function getIdProfesional()
    {
        return $this->idProfesional;
    }

    /**
     * Establece el id del profesional.
     *
     * @param int $idProfesional
     */
    public function setIdProfesional($idProfesional)
    {
        $this->idProfesional = $idProfesional;
    }

    /**
     * Obtiene el mes de la cita.
     *
     * @return string
     */
    public function getMes()
    {
        return $this->mes;
    }

    /**
     * Establece el mes de la cita.
     *
     * @param string $mes
     */
    public function setMes($mes)
    {
        $this->mes = $mes;
    }

    /**
     * Obtiene el año de la cita.
     *
     * @return int
     */
    public function getAño()
    {
        return $this->año;
    }

    /**
     * Establece el año de la cita.
     *
     * @param int $año
     */
    public function setAño($año)
    {
        $this->año = $año;
    }

    /**
     * Representación en cadena de la cita.
     *
     * @return string
     */
    public function toString()
    {
        return "Día: " . $this->getFecha() . ", Hora: " . $this->getHora() . ", Id Usuario: " . $this->getIdUsuario();
    }

    /**
     * Get the value of idServicio
     *
     * @return  int
     */ 
    public function getIdServicio()
    {
        return $this->idServicio;
    }

    /**
     * Set the value of idServicio
     *
     * @param  int  $idServicio
     *
     * @return  self
     */ 
    public function setIdServicio(int $idServicio)
    {
        $this->idServicio = $idServicio;

        return $this;
    }
}
