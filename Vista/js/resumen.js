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
  correoUsuario.innerHTML = "" + obtenerDatoTemporal("correo");

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
  let correo = obtenerDatoTemporal("correo");

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
    nombreProfesional = obtenerDatoTemporal("nombreProfesional");
    let html = "";

    html +=
      "<div class='filas'><img src='img/calendar_month_24dp_000000_FILL0_wght400_GRAD0_opsz24.png''/><p>" +
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
      "<div class='filas'><img src='img/assignment_24dp_000000_FILL0_wght400_GRAD0_opsz24.png'/><p>" +
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

    // Comprobar si existe una cita duplicada
    const existeCita = await verificarCitaExistente(
      diaFinal,
      horaFinal,
      idProfesional,
      mesFinal,
      añoFinal,
      idServicio
    );

    if (existeCita) {
      alert("Ya existe una cita en esta fecha y hora.");
    } else {
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
      alert("Reserva confirmada.");
      window.location.href = "index.php";
    }
  });

  async function verificarCitaExistente(
    dia,
    hora,
    idProfesional,
    mes,
    año,
    idServicio
  ) {
    try {
      const response = await fetch(
        `${url}?verificarCita=true&diaVer=${dia}&horaVer=${hora}&idProfesionalVer=${idProfesional}&mesVer=${mes}&añoVer=${año}&idServicioVer=${idServicio}`
      );
      const data = await response.json();
      if (data == true) {
        return true;
      } else if (data == false) {
        return false;
      }
    } catch (error) {
      console.error("Error al verificar cita:", error);
      return false;
    }
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
        guardarDatoTemporal("idCita", data);
      });
  }

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Función para almacenar un dato en sessionStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
  let btnCancelar = document.getElementById("img-cancelar");
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
