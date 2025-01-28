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

if(isset($_SESSION["usuario_provisional"])){
    $usuario_provisional = $sesion->getUsuarioProvisional(); 
    $array['usuario_provisional'] = $usuario_provisional;
} else{
    $array['error'] = "No existe un usuario provisional";
}

echo json_encode($array);



