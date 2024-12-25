<?php
require_once "../Modelo/UsuariosDao.php";
$daoUs = new UsuariosDao();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Verificar si se envió el ID del usuario
    $idUsuario = $_POST['idUsuario'];

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {

        $nombreArchivo = $_FILES['file']['name'];  // Nombre original del archivo

        $directorio = './../Vista/img/';  // Directorio donde se guardará la imagen

        // Obtener la extensión del archivo
        $fileExtension = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));

        // Comprobar si la extensión es válida
        if ($fileExtension !== 'jpg' && $fileExtension !== 'jpeg' && $fileExtension !== 'png') {
            echo json_encode("Solo se permiten archivos JPG, JPEG o PNG.");
        } else {
            // Establecer la ruta completa de destino (sin renombrar el archivo)
            $srcArchivoSubido = $directorio . $nombreArchivo;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $srcArchivoSubido)) {

                $respuesta = $daoUs->actualizarFoto($srcArchivoSubido, $idUsuario);
                echo json_encode($respuesta);
                // Aquí podrías guardar el nombre del archivo en la base de datos si lo necesitas
            } else {
                echo json_encode("Error al mover el archivo.");
            }

           
        }
    } else {
        echo json_encode("No se ha enviado ningún archivo o hay un error en la carga.");
    }
}
