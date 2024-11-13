window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();


  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Editar Perfil";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });


  let formularioEditar = document.getElementById("formularioEditar");

  let nombre = document.getElementById("nombreEditar");
  let telefono = document.getElementById("telefonoEditar");

  let idUsuario = obtenerDatoTemporal("idUsuario");

  let nombreSesion = obtenerDatoTemporal("nombre");
  let telefonoSesion = obtenerDatoTemporal("telefono");

  nombre.value = nombreSesion;
  telefono.value = telefonoSesion;

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  formularioEditar.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Enviar los datos al controlador mediante Get
    fetch(
      "./../Controlador/actualizarusuario.php?nombre=" +
        nombre.value +
        "&telefono=" +
        telefono.value +
        "&idUsuario=" +
        idUsuario
    )
      .then((respuesta) => respuesta.json())
      .then((data) => {
        alert(data);
      });
  });

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.php";
        }
      });
  }

  // Cerrar sesión
  let botonCerrarSesion = document.getElementById("btn-cerrar-sesion");
  botonCerrarSesion.addEventListener("click", function(){
    if(confirm("¿Estás seguro de que quieres cerrar sesión con esta cuenta?")){
        cerrarSesion();
    }
  });

  function cerrarSesion() {
    fetch("./../Controlador/cerrarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert(data.exito);
          window.location.href = "login.php";
        } else if (data.error) {
          alert(data.error);
        }
      });
  }
});
