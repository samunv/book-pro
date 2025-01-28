window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/vercitascontrolador.php";
  let sesion = "./../Controlador/procesarsesion.php";

  let listaCitas = document.getElementById("lista-citas");

  listaCitas.style.display = "flex";

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

  let cliente = "";
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
    cliente = usuario.nombre;
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

  function HTMLcitas(cita) {
    let html = "";
    html += "<div class='contenedor-cita' id='contenedor" + cita.idCita + "'>";

    html += "<div class='conjunto-foto-texto'>";
    html += "<img src='" + cita.imagen + "' class='foto-servicio'>";

    html += "<div class='apartado-texto'>";
    html +=
      "<h3>" +
      cita.nombreServicio +
      " - " +
      cita.fecha +
      " de " +
      cita.mes +
      " de " +
      cita.año +
      "</h3>";

    html += "<p> Hora: " + cita.hora.substring(0, 5) + "</p>";
    html +=
      "<p> Detalles: " +
      "<span id='span-precio'>" +
      cita.precio +
      "€</span>" +
      " - " +
      cita.duracion +
      "min.</p>";
    html += "<p> Profesional: " + cita.nombreProfesional + "</p>";
    html += "</div>";
    html += "</div>";
    html += "<div class='contenedor-iconos'>";
    html += `<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' class='papelera' id='papelera-${
        cita.idCita
      }' data-cita='${JSON.stringify(
      cita
    )}'><path d='M304.62-160q-26.85 0-45.74-18.88Q240-197.77 240-224.62V-720h-40v-40h160v-30.77h240V-760h160v40h-40v495.38q0 27.62-18.5 46.12Q683-160 655.38-160H304.62ZM680-720H280v495.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h350.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-720ZM392.31-280h40v-360h-40v360Zm135.38 0h40v-360h-40v360ZM280-720v520-520Z'/><title>Cancelar Reserva</title></path></svg>`;
    html += `<img src='img/googlecalendar.webp' title='Añadir a Google Calendar' id='btn-google-calendar-${
      cita.idCita
    }' data-cita='${JSON.stringify(cita)}'>`;

    html += "</div>";
    html += "</div>";
    return html;
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
          html += HTMLcitas(citas[i]);
        }
      }

      listaCitas.innerHTML = html;

      for (let i = 0; i < citas.length; i++) {
        let botonCalendario = document.getElementById(
          "btn-google-calendar-" + citas[i].idCita
        );
        let botonEliminar = document.getElementById(
          "papelera-" + citas[i].idCita
        );

        if (botonCalendario) {
          botonCalendario.addEventListener("click", function () {
            const cita = JSON.parse(botonCalendario.getAttribute("data-cita"));
            agregarCitaAGoogleCalendar(cita);
          });
        }

        if (botonEliminar) {
          const cita = JSON.parse(botonEliminar.getAttribute("data-cita"));
          cita.cliente = cliente;
          botonEliminar.addEventListener("click", function () {
            ventanaEliminar.style.display = "block";
            overlay.style.display = "block";
            abrirVentanaEliminar(cita);
          });
        }
      }

    } else {
      html = "No has reservado ninguna cita.";
      listaCitas.innerHTML = html;
    }
  }

  function abrirVentanaEliminar(datosCita) {
    let spanFecha = document.getElementById("span-fecha");
    let spanProfesional = document.getElementById("span-profesional");

    let btnEliminar = document.getElementById("btn-eliminar");
    let btnCancelar = document.getElementById("btn-cancelar");

    spanFecha.textContent =
      datosCita.nombreServicio +
      " del " +
      datosCita.fecha +
      " de " +
      datosCita.mes +
      " de " +
      datosCita.año +
      " a las " +
      datosCita.hora;
    spanProfesional.textContent = datosCita.nombreProfesional;

    btnEliminar.addEventListener("click", function () {
      eliminarCita(datosCita.idCita, datosCita);
    });

    btnCancelar.addEventListener("click", function () {
      ventanaEliminar.style.display = "none";
      overlay.style.display = "none";
    });
  }

  //Función en desuso actualmente

  // async function obtenerFechaPorIdCita(idCita) {
  //   try {
  //     const response = await fetch(url + "?idCita=" + idCita);
  //     const data = await response.json();
  //     return `${data[0].fecha} de ${data[0].mes} de ${data[0].año} a las ${data[0].hora}`;
  //   } catch (error) {
  //     console.error("Error al obtener la fecha:", error);
  //   }
  // }

  function eliminarCita(idCita, datos) {
    const datosJSON = JSON.stringify(datos);

    fetch(
      url +
        "?idCitaEliminar=" +
        idCita +
        "&datosCita=" +
        encodeURIComponent(datosJSON)
    )
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

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (!data.sesion) {
          alert("No hay sesión");
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
});
