<?php
require_once "Correo.php";

class Notificacion
{
    private $titulo;
    private $mensaje;
    private $destinatario;
    private $imagen_notificacion;
    private Correo $correo;

    function __construct($titulo, $mensaje, $destinatario)
    {
        $this->titulo = $titulo;
        $this->mensaje = $mensaje;
        $this->destinatario = $destinatario;
    }

    /**
     * Get the value of titulo
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set the value of titulo
     *
     * @return  self
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get the value of mensaje
     */
    public function getMensaje()
    {
        return $this->mensaje;
    }

    /**
     * Set the value of mensaje
     *
     * @return  self
     */
    public function setMensaje($mensaje)
    {
        $this->mensaje = $mensaje;

        return $this;
    }

    /**
     * Get the value of destinatario
     */
    public function getDestinatario()
    {
        return $this->destinatario;
    }

    /**
     * Set the value of destinatario
     *
     * @return  self
     */
    public function setDestinatario($destinatario)
    {
        $this->destinatario = $destinatario;

        return $this;
    }

    /**
     * Get the value of imagen_notificacion
     */
    public function getImagen_notificacion()
    {
        return $this->imagen_notificacion;
    }

    /**
     * Set the value of imagen_notificacion
     *
     * @return  self
     */
    public function setImagen_notificacion($imagen_notificacion)
    {
        $this->imagen_notificacion = $imagen_notificacion;

        return $this;
    }

    public function enviarNotificacionCorreo(Notificacion $n)
    {
        $this->correo = new Correo($n->getDestinatario(), $n->getTitulo(), $n->getMensaje());
        $resultadoEnviar = $this->correo->enviarCorreo();
        if (!$resultadoEnviar) {
            return "No se ha podido enviar el correo de notificación.";
        }
        return "Correo de notificación enviado correctamente";
    }
}

class Recordatorio extends Notificacion
{
    private $fechaRecordatorio;

    function __construct($titulo, $mensaje, $destinatario, $fechaRecordatorio)
    {
        parent::__construct($titulo, $mensaje, $destinatario);
        $this->fechaRecordatorio = $fechaRecordatorio;
    }

    /**
     * Get the value of fechaRecordatorio
     */
    public function getFechaRecordatorio()
    {
        return $this->fechaRecordatorio;
    }

    /**
     * Set the value of fechaRecordatorio
     *
     * @return  self
     */
    public function setFechaRecordatorio($fechaRecordatorio)
    {
        $this->fechaRecordatorio = $fechaRecordatorio;

        return $this;
    }

    public function enviarRecordatorio()
    {
        $mensajeCompleto = $this->getMensaje() . "\n\nRecordatorio para: " . $this->getFechaRecordatorio();
        $this->setMensaje($mensajeCompleto);
        return $this->enviarNotificacionCorreo($this);
    }
}