window.addEventListener("DOMContentLoaded", function () {
  obtenerUsuario();
  comprobarSesion();



  // Obtener información del usuario
  function obtenerUsuario() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          guardarDatoTemporal("nombre", data.sesion);
          obtenerIdUsuario(data.sesion);
          
          
        }
      });
  }

  function obtenerIdUsuario(nombreUsuario) {
    fetch("./../Controlador/obteneridusuario.php?nombre=" + nombreUsuario)
      .then((response) => response.json())
      .then((data) => {
        if (data.idUsuario) {
          let idUsuario = data.idUsuario; // Asegúrate de que 'data' tiene la propiedad 'idUsuario'
          guardarDatoTemporal("idUsuario", idUsuario);
          obtenerTelefono(idUsuario);

        } else if (data.error) {
          alert(data.error); // Muestra el error si no se encuentra el usuario
        }
      });
  }

  function obtenerTelefono(idUsuario){
    fetch("./../Controlador/obtenerusuario.php?idUsuario="+idUsuario)
    .then((response)=>response.json())
    .then((data)=>{
      if(data.telefono){
        guardarDatoTemporal("telefono", data.telefono);
      }
    })

  }


  // Comprobar sesión
  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.php";
        }
      });
  }

  // Función para almacenar un dato en localStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

});
