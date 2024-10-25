window.addEventListener("DOMContentLoaded", function () {
  let tabla = document.getElementById("tabla-citas");

  obtenerDatos();

  function obtenerDatos() {
    fetch("./../Controlador/obtenercitas.php")
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
    html += "<td>Día</td>";
    html += "<td>Mes</td>";
    html += "<td>Hora</td>";
    html += "<td>Profesional</td>";
    html += "<td>Servicio</td>";
    html += "</tr>";

    // Filas de usuarios
    for (let i = 0; i < datos.length; i++) {
      if (comprobarFechaActual(datos[i].fecha, datos[i].mes, datos[i].año)) {
        html += "<tr>";
        html += "<td>" + datos[i].nombre + "</td>";
        html += "<td>" + datos[i].telefono + "</td>";
        html += "<td>" + datos[i].fecha + "</td>";
        html += "<td>" + datos[i].mes + "</td>";
        html += "<td>" + datos[i].hora + "</td>";
        html += "<td>prof</td>";
        html += "<td>serv</td>";
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
});
