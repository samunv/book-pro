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

  let divConfirmado = this.document.getElementById("confirmado");
  let seleccionarPago = this.document.getElementById("seleccionar-pago");
  let overlay = this.document.getElementById("overlay");

  console.log(correoProfesional);

  let nombreProfesional = null;

  // Depuración: Verificar valores obtenidos
  console.log("ID Profesional:", idProfesional);

  obtenerNombreProfesional(idProfesional);

  function obtenerNombreProfesional(idProfesional) {
    fetch(url + "?idProfesionalParaNombre=" + idProfesional)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const nombre = data[0].nombre;
          guardarDatoTemporal("nombreProfesional", nombre);
        } else {
          console.error("No se encontró el profesional con ID:", idProfesional);
          guardarDatoTemporal("nombreProfesional", "No disponible");
        }
        // Ahora que tenemos el nombre del profesional, podemos imprimir los datos.
        imprimirDatos();
      })
      .catch((error) => console.error("Error al obtener profesional:", error));
  }

  function imprimirDatos() {
    // Comprobar si cita está definida y tiene propiedades válidas
    // Comprobar si cita está definida y tiene propiedades válidas
    nombreProfesional = obtenerDatoTemporal("nombreProfesional");
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
  btnAceptar.addEventListener("click", async function (e) {
    e.preventDefault();
    enviar();
  });

  function establecerBoton(boton, formaDePago) {
    boton.addEventListener("click", function () {
      guardarDatoTemporal("formaDePago", formaDePago);
      enviar();
    });
  }

  function enviar() {
    // Comprobar si existe una cita duplicada

    enviarDatos(
      diaFinal,
      horaFinal,
      idUsuario,
      idProfesional,
      mesFinal,
      añoFinal,
      idServicio,
      correo
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
    correo
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
      .then((data) => {
        console.log("Reserva realizada con éxito.");
        guardarDatoTemporal("idCita", data);
        seleccionarPago.style.display = "none";
        mostrarElementos(divConfirmado, overlay);
        setTimeout(() => {
          window.location.href =
            "vercitas.php?correo=" + correo + "&#contenedor" + data;
        }, 2000);
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
        if (data.error) {
          window.location.href = "login.php";
        }
      })
      .catch((error) => console.error("Error al comprobar sesión:", error));
  }
});
