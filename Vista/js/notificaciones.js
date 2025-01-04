window.addEventListener("DOMContentLoaded", function () {
  let url = "./../Controlador/notificacionescontrolador.php";

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Notificaciones";

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
  let correo = obtenerDatoTemporal("correo");
  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";

  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let notificacionesCont = document.getElementById("notificaciones");

  fetch(url + "?correo=" + correo)
    .then((response) => response.json())
    .then((notificaciones) => {
      imprimirNotificaciones(notificaciones);
    });

  function imprimirNotificaciones(notificaciones) {
    let html = "";

    if (notificaciones.length === 0) {
      html = "No tienes notificaciones aún.";
    } else {
      for (let i = notificaciones.length - 1; i >= 0; i--) {
        html += `<div class='caja-notificacion'><img src='./img/imagen-notificacion.png' class='imagen-notificacion'><div class='texto-notificacion'><p>${notificaciones[i].titulo}</p><p>${notificaciones[i].mensaje}</p></div></div><br>`;
      }
    }

    notificacionesCont.innerHTML = html;
  }

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }
});
