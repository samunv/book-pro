<?php
class Servicio {
    private $idServicio;
    private $nombreServicio;
    private $precioServicio;
    private $duracion;
    
    // Constructor
    public function __construct($nombreServicio, $precioServicio, $duracion) {
        $this->nombreServicio = $nombreServicio;
        $this->precioServicio = $precioServicio;
        $this->duracion = $duracion;
    }

    // Getter para idServicio
    public function getIdServicio() {
        return $this->idServicio;
    }

    // Setter para idServicio
    public function setIdServicio($idServicio) {
        $this->idServicio = $idServicio;
    }

    // Getter para nombreServicio
    public function getNombreServicio() {
        return $this->nombreServicio;
    }

    // Setter para nombreServicio
    public function setNombreServicio($nombreServicio) {
        $this->nombreServicio = $nombreServicio;
    }

    // Getter para precioServicio
    public function getPrecioServicio() {
        return $this->precioServicio;
    }

    // Setter para precioServicio
    public function setPrecioServicio($precioServicio) {
        $this->precioServicio = $precioServicio;
    }

    // Método __toString para una representación en cadena del objeto
    public function __toString() {
        return "Servicio [idServicio: " . $this->idServicio . ", nombreServicio: " . $this->nombreServicio . ", precioServicio: " . $this->precioServicio . "]";
    }

    /**
     * Get the value of duracion
     */ 
    public function getDuracion()
    {
        return $this->duracion;
    }

    /**
     * Set the value of duracion
     *
     * @return  self
     */ 
    public function setDuracion($duracion)
    {
        $this->duracion = $duracion;

        return $this;
    }
}
?>
