window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Empresa";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
  let correo = obtenerDatoTemporal("correo");
  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

  obtenerDatos();
  function obtenerDatos() {
    fetch("./../Recursos/datos-empresa.json")
      .then((response) => response.json())
      .then((data) => {
        imprimirDatos(data);
      });
  }

  let contenedorDatos = document.getElementById("contenedor-datos");

  function imprimirDatos(datos) {
    let html = "";
    html +=
      "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5873.147325365556!2d-3.7214247688618047!3d40.4339116828858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228419e251741%3A0xa8098098a3b356a7!2sMoncloa!5e0!3m2!1ses!2ses!4v1731363395647!5m2!1ses!2ses' width='600' height='450' style='border:0;' allowfullscreen='' loading='lazy' referrerpolicy='no-referrer-when-downgrade'></iframe>";
    html += "<div id='contenedor-info'>";

    // Logo y Nombre
    html += "<img src='" + datos.logo + "' width='100' height='100'/>";
    html += "<h3>" + datos.nombre + "</h3>";

    // Dirección
    html +=
      "<li class='lista'><img src='img/location_on_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png' width='20' height='20'/><p>" +
      datos.direccion +
      "</p></li>";

    // Horario
    html +=
      "<li class='lista'><img src='img/pending_actions_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png' width='20' height='20'/><p> De " +
      datos.hora_apertura +
      " a " +
      datos.hora_cierre +
      "</p></li>";

    // Teléfono
    html +=
      "<li class='lista'><img src='img/call_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png' width='20' height='20'/><p> " +
      datos.contacto[0].telefono +
      "</p></li>";

    // Correo
    html +=
      "<li class='lista'><img src='img/mail_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png' width='20' height='20'/><p> " +
      datos.contacto[0].correo +
      "</p></li>";

    // Sitio Web
    html +=
      "<li class='lista'><img src='img/link_24dp_4E4E4E_FILL0_wght400_GRAD0_opsz24.png' width='20' height='20'/><p> <a href='" +
      datos.web +
      "' target='_blank'>" +
      datos.web +
      "</a></p></li>";

    html += "</div>";
    contenedorDatos.innerHTML = html;
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

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }
});
