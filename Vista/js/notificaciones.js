window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let url = "./../Controlador/notificacionescontrolador.php";
  let sesion = "./../Controlador/procesarsesion.php";

  let notificacionesCont = document.getElementById("notificaciones");

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Notificaciones";

  let imgFoto = document.getElementById("img-foto");
  let nombreUsuario = document.getElementById("nombre-usuario");

  let correoUsuario = document.getElementById("correo-usuario");

  const params = new URLSearchParams(window.location.search);
  const correo = params.get("correo");

  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

    verificarCorreo(correo);

    function verificarCorreo(correo) {
      fetch(sesion)
        .then((response) => response.json())
        .then((data) => {
          if (data.sesion != correo) {
            alert("No puedes ver la información de otro usuario");
            window.location.href = "index.php";
          }
        });
    }

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";

  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let cajaRecuento = this.document.getElementById("caja-recuento");

  let btnBorrar = this.document.getElementById("btn-borrar-notificaciones");

  btnBorrar.addEventListener("click", function () {
    borrarNotificaciones(correo);
  });

  obtenerUsuario(correo);

  function obtenerUsuario(correo) {
    fetch(url + "?correoUsuario=" + correo)
      .then((response) => response.json())
      .then((usuario) => {
        imprimirDatosDelUsuario(usuario[0]);
      });
  }
  function imprimirDatosDelUsuario(usuario) {
    imgFoto.src = usuario.foto;
    nombreUsuario.innerHTML = usuario.nombre;
    obtenerNotificaciones(usuario.correo);
  }

  function obtenerNotificaciones(correo) {
    fetch(url + "?correo=" + correo)
      .then((response) => response.json())
      .then((notificaciones) => {
        imprimirNotificaciones(notificaciones);
      });
  }

  function imprimirNotificaciones(notificaciones) {
    let html = "";

    if (notificaciones.length === 0) {
      btnBorrar.style.display = "none";
      html = "<p id='no-notificaciones'>No tienes notificaciones aún. Aquí aparecerán todas tus notificaciones.</p>";
    } else {
      btnBorrar.style.display = "block";
      for (let i = notificaciones.length - 1; i >= 0; i--) {
        html += `<div class='caja-notificacion'><img src='${notificaciones[i].imagen_notificacion}' class='imagen-notificacion'><div class='texto-notificacion'><p>${notificaciones[i].titulo}</p><p>${notificaciones[i].mensaje}</p></div></div><br>`;
      }
      cajaRecuento.innerHTML = " (" + notificaciones.length + ")";
    }

    notificacionesCont.innerHTML = html;
  }

  function borrarNotificaciones(correo) {
      // Si es la última, llama al backend para borrar notificaciones
      fetch(url + "?borrarNotificaciones=true&correoBorrar=" + correo)
        .then((response) => response.json())
        .then((mensaje) => {
          console.log(mensaje);
          window.location.reload();
        });
    
  }

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (!data.sesion) {
          alert("No hay sesión");
          window.location.href="login.php";
        }
      });
  }
});
