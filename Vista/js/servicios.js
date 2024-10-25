window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let seccionServicios = document.getElementById("seccion-servicios");

  obtenerServicios();
  function obtenerServicios() {
    fetch("./../Controlador/obtenerservicios.php")
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
