window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Mis Citas";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });


  let listaCitas = document.getElementById("lista-citas");
  let idUsuario = obtenerDatoTemporal("idUsuario");
  let ventanaEliminar = document.getElementById("ventana-eliminar");
  let overlay = document.getElementById("overlay");

  ventanaEliminar.style.display = "none";
  overlay.style.display = "none";

  obtenerCitas(idUsuario);

  function obtenerCitas(idUsuario) {
    fetch("./../Controlador/obtenercitasusuario.php?idUsuario=" + idUsuario)
      .then((response) => response.json())
      .then((data) => {
        imprimirCitas(data);
      });
  }

  function imprimirCitas(citas) {
    let html = "";
    if (citas.length > 0) {
      // Mejor verificación
      for (let i = 0; i < citas.length; i++) {
        if (comprobarFechaActual(citas[i].fecha, citas[i].mes, citas[i].año)) {
          html += "<div class='contenedor-cita'>";
          html +=
            "<p class='fecha-negrita'> Día: " +
            citas[i].fecha +
            " de " +
            citas[i].mes +
            " de " +
            citas[i].año +
            "</p>";

          html += "<p> Hora: " + citas[i].hora.substring(0, 5) + "</p>";
          html +=
            "<p> Servicio: " +
            citas[i].nombreServicio +
            " / " +
            citas[i].precio +
            "€ / " +
            citas[i].duracion +
            "min.</p>";
          html += "<p> Profesional: " + citas[i].nombreProfesional + "</p>";
          html += "<div class='contenedor-papelera'>";
          html +=
            "<img src='img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png' width='30' height='30' id='" +
            citas[i].idCita +
            "' class='papelera'>";
          html += "</div>";
          html += "</div>";
        }
      }
      listaCitas.innerHTML = html;

      let papeleras = document.getElementsByClassName("papelera");
      for (let j = 0; j < papeleras.length; j++) {
        abrirVentanaEliminar(papeleras[j].id);
      }
    } else {
      html = "No has reservado ninguna cita.";
      listaCitas.innerHTML = html;
    }
  }

  async function abrirVentanaEliminar(idCita) {
    let spanFecha = document.getElementById("span-fecha");
    let papelera = document.getElementById(idCita);
    let btnEliminar = document.getElementById("btn-eliminar");
    let btnCancelar = document.getElementById("btn-cancelar");

    papelera.addEventListener("click", async function () {
      ventanaEliminar.style.display = "block";
      overlay.style.display = "block";

      // Asigna el texto de la fecha directamente al elemento span
      spanFecha.textContent = await obtenerFechaPorIdCita(idCita);

      btnEliminar.addEventListener("click", function () {
        eliminarCita(idCita);
      });

      btnCancelar.addEventListener("click", function () {
        ventanaEliminar.style.display = "none";
        overlay.style.display = "none";
      });
    });
  }

  async function obtenerFechaPorIdCita(idCita) {
    try {
      const response = await fetch(
        "./../Controlador/obtenercita.php?idCita=" + idCita
      );
      const data = await response.json();
      return `${data[0].fecha} de ${data[0].mes} de ${data[0].año} a las ${data[0].hora}`;
    } catch (error) {
      console.error("Error al obtener la fecha:", error);
    }
  }

  function eliminarCita(idCita) {
    fetch("./../Controlador/eliminarcita.php?idCita=" + idCita)
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.reload();
        obtenerCitas(idUsuario);
      });
  }

  let fechaActual = new Date();

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  function comprobarFechaActual(dia, mes, año) {
    let fechaCita = new Date(año, meses.indexOf(mes), dia);
    return fechaCita >= fechaActual;
  }

  // Función para recuperar un dato de sessionStorage
  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
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
