<?php
require_once "../Modelo/Sesion.php"; 

$sesion = new Sesion(); 
$array = array(); 

if(isset($_SESSION["nombre"])){
    $cerrar = $sesion->cerrarSesion();
    $array['exito'] = "Sesión cerrada"; 

} else{
    $array['error'] = "No existe una sesión";
}

echo json_encode($array);



