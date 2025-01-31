window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/resumencontrolador.php";

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Resumen";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    borrarDatos();
    alert("Has cancelado tu reserva.");
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

  let listaDatos = document.getElementById("lista-datos");
  let nombreServicio = obtenerDatoTemporal("nombreServicio");
  let duracion = obtenerDatoTemporal("duracion");
  let precio = obtenerDatoTemporal("precio");
  let idProfesional = obtenerDatoTemporal("idProfesionalSeleccionado");
  let idUsuario = obtenerDatoTemporal("idUsuario");
  let idServicio = obtenerDatoTemporal("idServicio");
  let horaFinal = obtenerDatoTemporal("hora");
  let diaFinal = obtenerDatoTemporal("dia");
  let mesFinal = obtenerDatoTemporal("mes");
  let añoFinal = obtenerDatoTemporal("año");
  let correoProfesional = obtenerDatoTemporal("correoProfesional");
  let nombreCliente = obtenerDatoTemporal("nombre");

  let datosParaPagar = {
    servicio: nombreServicio,
    precio: precio,
    duracion: duracion,
    cliente: nombreCliente,
    correoCliente: correo,
    correoProfesional: correoProfesional,
  };

  let divConfirmado = this.document.getElementById("confirmado");
  let seleccionarPago = this.document.getElementById("seleccionar-pago");
  let overlay = this.document.getElementById("overlay");

  console.log(correoProfesional);

  let nombreProfesional = null;

  // Depuración: Verificar valores obtenidos
  console.log("ID Profesional:", idProfesional);

  async function obtenerNombreProfesional(idProfesional) {
    try {
      const response = await fetch(
        url + "?idProfesionalParaNombre=" + idProfesional
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const nombre = data[0].nombre;
        guardarDatoTemporal("nombreProfesional", nombre);
        return nombre;
      } else {
        console.error("No se encontró el profesional con ID:", idProfesional);
        guardarDatoTemporal("nombreProfesional", "No disponible");
        return "No disponible";
      }
    } catch (error) {
      console.error("Error al obtener profesional:", error);
      guardarDatoTemporal("nombreProfesional", "Error");
      return "Error";
    }
  }

  (async () => {
    nombreProfesional = await obtenerNombreProfesional(idProfesional);
    imprimirDatos();
  })();

  function imprimirDatos() {
    let html = "";

    html +=
      "<div class='filas'><img src='img/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'/><p>" +
      diaFinal +
      " de " +
      mesFinal +
      " de " +
      añoFinal +
      "</p></div>";

    html +=
      "<div class='filas'><img src='img/schedule_24dp_000000_FILL0_wght400_GRAD0_opsz24.png' /><p>" +
      horaFinal +
      "</p></div>";

    html +=
      "<div class='filas'><img src='img/content_cut_24dp_000000_FILL0_wght300_GRAD0_opsz24.png'/><p>" +
      nombreServicio +
      "</p></div>";

    html +=
      "<div class='filas'><img src='img/timer_24dp_000000_FILL0_wght400_GRAD0_opsz24.png' /><p>" +
      duracion +
      " min</p></div>";

    html +=
      "<div class='filas'><img src='img/euro_24dp_000000_FILL0_wght400_GRAD0_opsz24.png' /><p>" +
      precio +
      " €</p></div>";

    html +=
      "<div class='filas'><img src='img/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.png' /><p>" +
      nombreProfesional +
      "</p></div>";

    listaDatos.innerHTML = html;
  }

  let btnAceptar = document.getElementById("btn-aceptar");
  let btnEnPersona = this.document.getElementById("btnPersona");
  let btnOnline = this.document.getElementById("btnOnline");

  btnAceptar.addEventListener("click", async function (e) {
    e.preventDefault();
    mostrarElementos(seleccionarPago, overlay);
    establecerBoton(btnEnPersona, false);
    establecerBoton(btnOnline, true);
    //enviar();
  });

  function establecerBoton(boton, pagarAhoraBoolean) {
    boton.addEventListener("click", function () {
      if (pagarAhoraBoolean == true) {
        enviar(
          "pagina-pago.php?datos=" +
            encodeURIComponent(JSON.stringify(datosParaPagar))
        );
      } else if (pagarAhoraBoolean == false) {
        enviar("vercitas.php?correo=" + correo);
      }
    });
  }

  function enviar(URLsiguientePagina) {
    // Comprobar si existe una ciURLsiguientePaginata duplicada

    enviarDatos(
      diaFinal,
      horaFinal,
      idUsuario,
      idProfesional,
      mesFinal,
      añoFinal,
      idServicio,
      correo,
      URLsiguientePagina
    );

    enviarNotificacion(
      correoProfesional,
      nombreCliente,
      nombreServicio,
      horaFinal,
      diaFinal,
      mesFinal,
      añoFinal,
      nombreServicio
    );
  }

  function enviarNotificacion(
    destinatario,
    cliente,
    servicio,
    hora,
    fecha,
    mes,
    año,
    servicio
  ) {
    fetch(
      url +
        "?correoDestinatario=" +
        destinatario +
        "&cliente=" +
        cliente +
        "&servicio=" +
        servicio +
        "&hora=" +
        hora +
        "&fecha=" +
        fecha +
        "&mes=" +
        mes +
        "&año=" +
        año +
        "&servicio=" +
        servicio
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function enviarDatos(
    dia,
    hora,
    idUsuario,
    idProfesional,
    mes,
    año,
    idServicio,
    correo,
    URLsiguientePagina
  ) {
    console.log(dia + hora + idUsuario + mes + año + idServicio);
    fetch(
      url +
        "?dia=" +
        dia +
        "&hora=" +
        hora +
        "&idUsuario=" +
        idUsuario +
        "&idProfesional=" +
        idProfesional +
        "&mes=" +
        mes +
        "&año=" +
        año +
        "&idServicio=" +
        idServicio +
        "&correo=" +
        correo
    )
      .then((response) => response.json())
      .then((idCita) => {
        console.log("Reserva realizada con éxito.");
        guardarDatoTemporal("idCita", idCita);
        seleccionarPago.style.display = "none";
        mostrarElementos(divConfirmado, overlay);
        setTimeout(() => {
          window.location.href = "index.php";
          window.open(URLsiguientePagina + "&idCita=" + idCita, "_blank");
        }, 3000);
      });
  }

  function mostrarElementos(...elementos) {
    elementos.forEach((elemento) => {
      elemento.style.display = "flex";
    });
  }

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Función para almacenar un dato en sessionStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
  let btnCancelar = document.getElementById("icono-accion");
  btnCancelar.addEventListener("click", function () {
    borrarDatos();
    alert("Has cancelado tu reserva.");
    window.location.href = "index.php";
  });

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
    removerDatoTemporal("correoProfesional");
  }

  function removerDatoTemporal(clave) {
    sessionStorage.removeItem(clave);
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
});
