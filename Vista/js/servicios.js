window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/servicioscontrolador.php";
  let seccionServicios = document.getElementById("seccion-servicios");

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Servicios";

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
      let correo = obtenerDatoTemporal("correo");
    correoUsuario.textContent =
      correo.length > 20 ? correo.substring(0, 20)+"..." : correo;
  

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    borrarDatos();
    alert("Has cancelado tu reserva.");
    window.location.href = "index.php";
  });

  obtenerServicios();
  function obtenerServicios() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        imprimirServicios(data);
        elegirServicio(data);
      });
  }

  function imprimirServicios(servicios) {
    let html = "";
    for (let i = 0; i < servicios.length; i++) {
      html +=
        "<div class='contenedor-servicio' id='servicio-" +
        servicios[i].idServicio +
        "'>";
      html += "<div class='texto-servicios'>";
      html += "<h2>" + servicios[i].nombreServicio + "</h2>";
      html += "<p> Precio: " + servicios[i].precio + " €</p>";
      html += "<p> Duración: " + servicios[i].duracion + " min</p>";
      html += "</div>";
      html +=
        "<img src='img/arrow_circle_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png' width='40' height='40' class='icono-anadir'/>";

      html += "</div>";
    }
    seccionServicios.innerHTML = html;
    for (let i = 0; i < servicios.length; i++) {
      let contenedorServicio = document.getElementById(
        "servicio-" + servicios[i].idServicio
      );
      contenedorServicio.style.backgroundImage =
        "url('" + servicios[i].imagen + "')";
    }
  }

  function elegirServicio(servicios) {
    servicios.forEach((servicio) => {
      let btnServicio = document.getElementById(
        "servicio-" + servicio.idServicio
      );
      if (btnServicio) {
        btnServicio.addEventListener("click", function () {
          guardarDatoTemporal("idServicio", servicio.idServicio);
          guardarDatoTemporal("nombreServicio", servicio.nombreServicio);
          guardarDatoTemporal("precio", servicio.precio);
          guardarDatoTemporal("duracion", servicio.duracion);
          window.location.href = "reservar.php";
        });
      }
    });
  }

  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

  function borrarDatos() {
    // Remover cada dato temporal almacenado en sessionStorage
    removerDatoTemporal("nombreServicio");
    removerDatoTemporal("duracion");
    removerDatoTemporal("precio");
    removerDatoTemporal("idProfesionalSeleccionado");
    removerDatoTemporal("idServicio");
    removerDatoTemporal("hora");
    removerDatoTemporal("dia");
    removerDatoTemporal("mes");
    removerDatoTemporal("año");
    removerDatoTemporal("nombreProfesional");
  }

  function removerDatoTemporal(clave) {
    sessionStorage.removeItem(clave);
  }

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.php";
        }
      });
  }
});
