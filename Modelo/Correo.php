<?php
require_once "./../Recursos/PHPMailer-master/src/PHPMailer.php";
require_once "./../Recursos/PHPMailer-master/src/SMTP.php";
require_once "./../Recursos/PHPMailer-master/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Correo
{
    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
    }

    public function enviarCorreo($destinatario, $asunto, $mensaje)
    {
        try {
            $mail = $this->mail;

            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Servidor SMTP
            $mail->SMTPAuth = true;
            $mail->Username = 'sur00044@gmail.com'; 
            $mail->Password = 'arnn welh rjbv uads'; 
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Configuración del correo
            $mail->setFrom('sur00044@gmail.com', 'BarberPro');
            $mail->addAddress($destinatario);
            $mail->Subject = $asunto;
            $mail->Body = $mensaje;

            // Enviar el correo
            $mail->send();
            return true;
        } catch (Exception $e) {
            // Registrar el error en el log
            error_log("Error al enviar el correo: " . $mail->ErrorInfo . " --------- " . $e->getMessage());
            return false;
        }
    }
}
