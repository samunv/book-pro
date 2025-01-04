<?php
require_once "../Modelo/UsuariosDao.php";
require_once "../Modelo/Sesion.php";

if (isset($_GET["idUsuario"])) {
    $daoUs = new UsuariosDao();
    $sesion = new Sesion();

    if (isset($_GET["nombre"]) && $_GET["nombre"] != "") {
        // Comprobar si la longitud está entre 5 y 15 caracteres
        if (strlen($_GET["nombre"]) >= 5 && strlen($_GET["nombre"]) <= 15) {
            $verificarNombre = $daoUs->leerUsuarioPorNombre($_GET["nombre"]);
            if (empty($verificarNombre)) {
                $mensaje = $daoUs->actualizarNombre($_GET["nombre"], $_GET["idUsuario"]);
                // Actualizar el nombre de la sesión al nombre actualizado
                echo json_encode($mensaje);
            } else {
                echo json_encode("No se puede actualizar el nombre a " . $_GET["nombre"] . ", porque ya está en uso.");
            }
        } else {
            echo json_encode("El nombre debe tener entre 5 y 15 caracteres.");
        }
    } elseif (isset($_GET["telefono"]) && $_GET["telefono"] != "") {
        // Verificar que la longitud sea 9 caracteres
        if (strlen($_GET["telefono"]) == 9) {
            $verificarTelefono = $daoUs->leerUsuarioPorTelefono($_GET["telefono"]);
            if (empty($verificarTelefono)) {
                $mensaje = $daoUs->actualizarTelefono($_GET["telefono"], $_GET["idUsuario"]);
                echo json_encode($mensaje);
            } else {
                echo json_encode("No se puede actualizar el teléfono a " . $_GET["telefono"] . ", porque ya está en uso.");
            }
        } else {
            echo json_encode("El teléfono debe tener 9 caracteres.");
        }
    } else {
        echo json_encode("Algo está mal");
    }
} elseif (isset($_GET['cerrarSesionBoolean']) && $_GET['cerrarSesionBoolean'] === 'true') {
    // Si se recibe el parámetro de cerrarSesionBoolean como true:
    $sesion = new Sesion();
    $array = array();

    if (isset($_SESSION["nombre"])) {
        $cerrar = $sesion->cerrarSesion();
        $array['exito'] = "Sesión cerrada";
    } else {
        $array['error'] = "No existe una sesión";
    }

    echo json_encode($array);
} 