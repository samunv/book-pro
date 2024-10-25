<?php 
class Horarios{
    private $idHorario;
    private $hora;

    public function __construct($hora)
    {
        $this->hora = $hora; 
    }

    /**
     * Get the value of hora
     */ 
    public function getHora()
    {
        return $this->hora;
    }

    /**
     * Set the value of hora
     *
     * @return  self
     */ 
    public function setHora($hora)
    {
        $this->hora = $hora;

        return $this;
    }

    /**
     * Get the value of idHorario
     */ 
    public function getIdHorario()
    {
        return $this->idHorario;
    }

    /**
     * Set the value of idHorario
     *
     * @return  self
     */ 
    public function setIdHorario($idHorario)
    {
        $this->idHorario = $idHorario;

        return $this;
    }
}