window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/vercitascontrolador.php";

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Mis Citas";

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
  correoUsuario.innerHTML = "" + obtenerDatoTemporal("correo");

  let listaCitas = document.getElementById("lista-citas");
  let idUsuario = obtenerDatoTemporal("idUsuario");
  let ventanaEliminar = document.getElementById("ventana-eliminar");
  let overlay = document.getElementById("overlay");

  ventanaEliminar.style.display = "none";
  overlay.style.display = "none";

  obtenerCitas(idUsuario);

  function obtenerCitas(idUsuario) {
    fetch(url + "?idUsuario=" + idUsuario)
      .then((response) => response.json())
      .then((data) => {
        imprimirCitas(data);
      });
  }

  obtenerProfesionales();
  function obtenerProfesionales() {
    fetch(url + "?obtenerProfesional=true")
      .then((response) => response.json())
      .then((profesionales) => {
        imprimirNombreProfesional(profesionales); // Envía el array completo
      });
  }


  function imprimirNombreProfesional(profesionales) {
    let selectProfesional = document.getElementById("profesional");
    let option = "";

    // Verifica si el array no está vacío antes de procesarlo
    if (profesionales && profesionales.length > 0) {
      for (let i = 0; i < profesionales.length; i++) {
        option +=
          "<option value='" +
          profesionales[i].nombreProfesional + 
          "'>" +
          profesionales[i].nombreProfesional +
          "</option>";
      }
    } else {
      console.error("No se encontraron profesionales.");
    }

    selectProfesional.innerHTML = option;
  }



  obtenerServicios();
  function obtenerServicios() {
    fetch(url + "?obtenerServicio=true")
      .then((response) => response.json())
      .then((servicios) => {
        imprimirNombreServicio(servicios); // Envía el array completo
      });
  }


  function imprimirNombreServicio(servicios) {
    let selectServicio = document.getElementById("servicios");
    let option = "";

    // Verifica si el array no está vacío antes de procesarlo
    if (servicios && servicios.length > 0) {
      for (let i = 0; i < servicios.length; i++) {
        option +=
          "<option value='" +
          servicios[i].nombreServicio + 
          "'>" +
          servicios[i].nombreServicio +
          "</option>";
      }
    } else {
      console.error("No se encontraron servicios.");
    }

    selectServicio.innerHTML = option;
  }

  function imprimirCitas(citas) {
    let html = "";
    if (citas.length > 0) {
      // Mejor verificación
      for (let i = 0; i < citas.length; i++) {
        if (
          comprobarFechaActual(
            citas[i].fecha,
            citas[i].mes,
            citas[i].año,
            citas[i].hora
          )
        ) {
          html += "<div class='contenedor-cita'>";

          html += "<div class='conjunto-foto-texto'>";
          html += "<img src='" + citas[i].imagen + "' class='foto-servicio'>";

          html += "<div class='apartado-texto'>";
          html +=
            "<h3>" +
            citas[i].nombreServicio +
            " - " +
            citas[i].fecha +
            " de " +
            citas[i].mes +
            " de " +
            citas[i].año +
            "</h3>";

          html += "<p> Hora: " + citas[i].hora.substring(0, 5) + "</p>";
          html +=
            "<p> Detalles: " +
            "<span id='span-precio'>" +
            citas[i].precio +
            "€</span>" +
            " - " +
            citas[i].duracion +
            "min.</p>";
          html += "<p> Profesional: " + citas[i].nombreProfesional + "</p>";
          html += "</div>";
          html += "</div>";
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
      const response = await fetch(url + "?idCita=" + idCita);
      const data = await response.json();
      return `${data[0].fecha} de ${data[0].mes} de ${data[0].año} a las ${data[0].hora}`;
    } catch (error) {
      console.error("Error al obtener la fecha:", error);
    }
  }

  function eliminarCita(idCita) {
    fetch(url + "?idCitaEliminar=" + idCita)
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.reload();
        obtenerCitas(idUsuario);
      });
  }

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

  function comprobarFechaActual(dia, mes, año, horaCita) {
    let fechaCita = new Date(año, meses.indexOf(mes), dia);
    let fechaActual = new Date();

    // Comparar fechas
    if (fechaCita > fechaActual) {
      return true; // Fecha futura
    }

    // Si es el mismo día, comprobar la hora
    if (
      fechaCita.getDate() === fechaActual.getDate() &&
      fechaCita.getMonth() === fechaActual.getMonth() &&
      fechaCita.getFullYear() === fechaActual.getFullYear()
    ) {
      let [horas, minutos] = horaCita.split(":").map(Number);
      let horaCompletaCita = new Date(
        año,
        meses.indexOf(mes),
        dia,
        horas,
        minutos
      );
      return horaCompletaCita >= fechaActual;
    }

    return false; // Fecha pasada
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
