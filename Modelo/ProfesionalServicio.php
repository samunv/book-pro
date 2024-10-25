<?php
class ProfesionalServicio {
    private $profesional;
    private $servicio;

    public function __construct(Profesional $profesional, Servicio $servicio) {
        $this->profesional = $profesional;
        $this->servicio = $servicio;
    }

    public function getProfesional() {
        return $this->profesional;
    }

    public function setProfesional(Profesional $profesional) {
        $this->profesional = $profesional;
    }

    public function getServicio() {
        return $this->servicio;
    }

    public function setServicio(Servicio $servicio) {
        $this->servicio = $servicio;
    }

    public function __toString() {
        return "ProfesionalServicio [Profesional: " . $this->profesional . ", Servicio: " . $this->servicio . "]";
    }
}
?>
