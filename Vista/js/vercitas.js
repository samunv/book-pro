window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let listaCitas = document.getElementById("lista-citas");
  let idUsuario = obtenerDatoTemporal("idUsuario");

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
    if (citas.length > 0) {  // Mejor verificación
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

      // Llamar a eliminarCita después de generar el HTML, para que los elementos existan en el DOM
      let papeleras = document.getElementsByClassName("papelera");
      for (let j = 0; j < papeleras.length; j++) {
        eliminarCita(papeleras[j].id);  // Llama a eliminarCita con cada id de cita
      }
    } else {
      html = "No has reservado ninguna cita.";
      listaCitas.innerHTML = html;
    }
  }

  function eliminarCita(idCita) {
    let papelera = document.getElementById(idCita);
    papelera.addEventListener("click", function () {
      if (confirm("¿Deseas eliminar esta cita con id " + idCita + "?")) {
        fetch("./../Controlador/eliminarcita.php?idCita=" + idCita)
          .then((response) => response.json())
          .then((data) => {
            alert(data);
            window.location.reload()// Opcional: refrescar la lista de citas después de eliminar
            obtenerCitas(idUsuario);
          })
          
      }
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
