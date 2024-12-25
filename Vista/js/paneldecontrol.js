window.addEventListener("DOMContentLoaded", function () {
  let url = "./../Controlador/paneldecontrolcontrolador.php";

  let permisos = obtenerDatoTemporal("permisos");
  console.log("Permisos del usuario: " + permisos);

  let idUsuario = obtenerDatoTemporal("idUsuario");

  let tituloPagina = document.getElementById("titulo-pagina");
  let icono = document.getElementById("icono-accion");
  icono.style.display = "none";

  tituloPagina.innerHTML = "Mi Agenda";

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
  correoUsuario.innerHTML = "" + obtenerDatoTemporal("correo");

  comprobarPermisos(permisos);
  function comprobarPermisos(permisos) {
    //verificar si el usuario que accede, tiene los permisos necesarios para ello
    if (permisos === "0") {
      //Se le cerrará la sesión al usuario que intente acceder sin permisos de acceso
      cerrarSesion();
    }
  }

  function cerrarSesion() {
    fetch(url + "?cerrarSesionBoolean=true")
      .then((response) => response.json())
      .then((data) => {
        if (data.exito) {
          alert(data.exito);
          window.location.href = "login.php";
        } else if (data.error) {
          alert(data.error);
        }
      });
  }
  obtenerIdProfesional(idUsuario);
  function obtenerIdProfesional(idUsuario) {
    fetch(url + "?idUsuarioParaIdProfesional=" + idUsuario)
      .then((response) => response.json())
      .then((data) => {
        obtenerDatos(data);
      });
  }

  let tabla = document.getElementById("tabla-citas");

  function obtenerDatos(idProfesional) {
    fetch(url+"?idProfesionalParaCitas=" + idProfesional)
      .then((response) => response.json())
      .then((data) => {
        imprimirTabla(data);
      });
  }

  function imprimirTabla(datos) {
    let html = "";
    // Fila de encabezado
    html += "<tr id='encabezado-tabla'>";
    html += "<td>Cliente</td>";
    html += "<td>Teléfono</td>";
    html += "<td>Fecha</td>";
    html += "<td>Hora</td>";
    html += "<td>Servicio</td>";
    html += "</tr>";

    // Filas de usuarios
    for (let i = 0; i < datos.length; i++) {
      if (comprobarFechaActual(datos[i].fecha, datos[i].mes, datos[i].año)) {
        html += "<tr>";
        html +=
          "<td class='columna-foto'><img src='" +
          datos[i].foto +
          "' width='40' height='40'/ class='foto-cliente'><p class='nombre-cliente'>"+ datos[i].nombre +"</p></td>";
      
        html += "<td>" + datos[i].telefono + "</td>";
        html += "<td>" + datos[i].fecha + " de "+datos[i].mes+" de "+ datos[i].año+ "</td>";
        html += "<td>" + datos[i].hora + "</td>";
        html += "<td>" + datos[i].nombreServicio + "</td>";
        html += "</tr>";
      }
    }

    // Actualiza el contenido de la tabla
    tabla.innerHTML = html;
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

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }
});
