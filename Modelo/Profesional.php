<?php

class Profesional
{
    // Propiedades privadas
    private $idProfesional;
    private $nombre;

    // Constructor
    public function __construct($nombre)
    {
        $this->nombre = $nombre;
    }

    // Getter para idProfesional
    public function getIdProfesional()
    {
        return $this->idProfesional;
    }

    // Setter para idProfesional
    public function setIdProfesional($idProfesional)
    {
        $this->idProfesional = $idProfesional;
    }

    // Getter para nombre
    public function getNombre()
    {
        return $this->nombre;
    }

    // Setter para nombre
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }
}
