window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/vercitascontrolador.php";

  let listaCitas = document.getElementById("lista-citas");

  // Retrasar la visualización del contenido
  setTimeout(() => {
    // Ocultar el loader y mostrar el contenido
    document.getElementById("loader").style.display = "none";
    listaCitas.style.display = "flex";
  }, 600);

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Mis Citas";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let imgFoto = document.getElementById("img-foto");
  let nombreUsuario = document.getElementById("nombre-usuario");
  let idUsuario = "";

  let correoUsuario = document.getElementById("correo-usuario");

  const params = new URLSearchParams(window.location.search);
  const correo = params.get("correo");

  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

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
    obtenerCitas(usuario.idUsuario);
  }

  let ventanaEliminar = document.getElementById("ventana-eliminar");
  let overlay = document.getElementById("overlay");

  ventanaEliminar.style.display = "none";
  overlay.style.display = "none";

  function obtenerCitas(idUsuario) {
    fetch(url + "?idUsuario=" + idUsuario)
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
        if (
          comprobarFechaActual(
            citas[i].fecha,
            citas[i].mes,
            citas[i].año,
            citas[i].hora
          )
        ) {
          html += "<div class='contenedor-cita' id='contenedor" + citas[i].idCita + "'>";

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
          html += "<div class='contenedor-iconos'>";
          html +=
            "<img src='img/delete_24dp_BLACK_FILL0_wght300_GRAD0_opsz24.png' id='" +
            citas[i].idCita +
            "' class='papelera'>";
          html += `<img src='img/googlecalendar.webp' title='añadir a Google Calendar' id='btn-google-calendar-${
            citas[i].idCita
          }' data-cita='${JSON.stringify(citas[i])}'>`;

          html += "</div>";
          html += "</div>";
        }
      }

      listaCitas.innerHTML = html;

      // Después de crear los botones, asignamos el evento directamente
      for (let i = 0; i < citas.length; i++) {
        let botonCalendario = document.getElementById(
          "btn-google-calendar-" + citas[i].idCita
        );

        if (botonCalendario) {
          botonCalendario.addEventListener("click", function () {
            // Obtener el objeto de cita desde el atributo data-cita
            const cita = JSON.parse(botonCalendario.getAttribute("data-cita"));
            // Llamar a la función para agregar la cita al calendario de Google
            agregarCitaAGoogleCalendar(cita);
          });
        }
      }

      let papeleras = document.getElementsByClassName("papelera");

      for (let j = 0; j < papeleras.length; j++) {
        let papelera = papeleras[j]; // Accede a cada elemento individualmente

        // Agrega evento 'mouseenter' a la papelera
        papelera.addEventListener("mouseenter", () => {
          papelera.src =
            "img/delete_24dp_006BFF_FILL0_wght300_GRAD0_opsz24.png"; // Cambia la imagen
        });

        // Agrega evento 'mouseleave' a la papelera
        papelera.addEventListener("mouseleave", () => {
          // Restablece la imagen original (puedes definir la ruta adecuada)
          papelera.src = "img/delete_24dp_BLACK_FILL0_wght300_GRAD0_opsz24.png";
        });

        // Llama a la función para abrir la ventana de eliminar
        abrirVentanaEliminar(papelera.id);
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
        console.log(data);
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

  function agregarFechaGoogleCalendar(titulo, descripcion, lugar, inicio) {
    const baseUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: titulo,
      details: descripcion,
      location: lugar,
      dates: `${inicio}/${inicio}`, // Fechas en formato ISO 8601
    });
    const url = `${baseUrl}&${params.toString()}`;
    window.open(url, "_blank"); // Abrir en una nueva pestaña
  }

  function agregarCitaAGoogleCalendar(cita) {
    const titulo = cita.nombreServicio;
    const descripcion = `Coste del servicio: ${cita.precio}€, duración: ${cita.duracion} minutos.`;
    const lugar = "Barbershop, Madrid";

    // Calculamos solo la fecha y la hora de inicio
    const inicio = convertirFechaAGoogleCalendar(
      `${cita.fecha} ${cita.mes} ${cita.año}`,
      cita.hora.substring(0, 5),
      0 // No es necesario contar días extra si solo tenemos la hora de inicio
    );

    agregarFechaGoogleCalendar(titulo, descripcion, lugar, inicio);
  }

  function convertirFechaAGoogleCalendar(fecha, hora) {
    let mesIndex = meses.indexOf(fecha.split(" ")[1]);

    // Asegúrate de que el día esté en formato de dos dígitos
    let dia = ("0" + fecha.split(" ")[0]).slice(-2); // El día debe ser siempre de dos dígitos
    let año = fecha.split(" ")[2];

    // Hora también debe estar en formato de dos dígitos
    let horaFormateada = hora.replace(":", ""); // Reemplazar el ':' en la hora

    // Eliminamos los segundos
    let horaSinSegundos = horaFormateada.slice(0, 4) + "00"; // Hacemos que los segundos sean '00'

    // Formato final de fecha para Google Calendar sin el 'Z' (sin UTC)
    let fechaGoogle = `${año}${("0" + (mesIndex + 1)).slice(
      -2
    )}${dia}T${horaSinSegundos}+0100`;

    return fechaGoogle;
  }

  // function calcularHoraFin(horaInicio, duracion) {
  //   let [horas, minutos] = horaInicio.split(":").map(Number);

  //   // Sumar la duración a los minutos
  //   minutos += duracion;

  //   // Calcular las horas adicionales si la duración supera los 60 minutos
  //   horas += Math.floor(minutos / 60);

  //   // Obtener los minutos restantes
  //   minutos = minutos % 60;

  //   // Devolver la hora de finalización con formato de dos dígitos (sin segundos)
  //   return `${horas
  //     .toString()
  //     .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  // }
});
