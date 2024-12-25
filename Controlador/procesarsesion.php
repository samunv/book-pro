<?php
require_once "../Modelo/Sesion.php"; 

$sesion = new Sesion(); 

$array = array();

if(isset($_SESSION["nombre"])){
    $usuario = $sesion->getUsuario(); 
    $array['sesion'] = $usuario;
} else{
    $array['error'] = "No existe una sesión";
}

echo json_encode($array);



