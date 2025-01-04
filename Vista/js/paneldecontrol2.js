window.addEventListener("DOMContentLoaded", function () {
  let url = "./../Controlador/paneldecontrolcontrolador2.php";

  let permisos = obtenerDatoTemporal("permisos");
  let idUsuario = obtenerDatoTemporal("idUsuario");

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";

  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let tituloPagina = this.document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Mi Agenda";

  let imgFoto = document.getElementById("img-foto");
  imgFoto.src = obtenerDatoTemporal("foto");

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "" + obtenerDatoTemporal("nombre");

  let correoUsuario = document.getElementById("correo-usuario");
  let correo = obtenerDatoTemporal("correo");
  correoUsuario.textContent =
    correo.length > 20 ? correo.substring(0, 20) + "..." : correo;

  // Mapeo de los meses numéricos a sus nombres en español
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Obtener la fecha actual y formatearla a día, mes, año
  let fechaSeleccionada = new Date();
  let dia = fechaSeleccionada.getDate();
  let mes = fechaSeleccionada.getMonth();
  let año = fechaSeleccionada.getFullYear();

  let btnMesAnterior = document.getElementById("dia-anterior");
  btnMesAnterior.addEventListener("click", irAlDiaAnterior);
  let btnMesSiguiente = document.getElementById("dia-siguiente");
  btnMesSiguiente.addEventListener("click", irAlDiaSiguiente);

  let mesString = meses[mes];

  function irAlDiaSiguiente() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1); // Aumenta un día

    dia = fechaSeleccionada.getDate();
    mes = fechaSeleccionada.getMonth();
    año = fechaSeleccionada.getFullYear();

    mesString = meses[mes]; // Obtener el mes actualizado

    imprimirFecha(dia, mesString, año); // Actualizar la fecha
    main(); // Recargar los datos correspondientes al nuevo día
  }

  // Función para ir al día anterior
  function irAlDiaAnterior() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1); // Disminuye un día

    dia = fechaSeleccionada.getDate();
    mes = fechaSeleccionada.getMonth();
    año = fechaSeleccionada.getFullYear();

    mesString = meses[mes]; // Obtener el mes actualizado

    imprimirFecha(dia, mesString, año); // Actualizar la fecha
    main(); // Recargar los datos correspondientes al nuevo día
  }

  comprobarPermisos(permisos);
  function comprobarPermisos(permisos) {
    if (permisos === "0") {
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
        guardarDatoTemporal("idUsuarioProfesional", data);
      });
  }

  let idUsuarioProfesional = obtenerDatoTemporal("idUsuarioProfesional");
  let tabla = document.getElementById("tabla-citas");

  async function obtenerHorarios() {
    try {
      let response = await fetch(url + "?obtenerHorarios=true");
      let horariosObtenidos = await response.json();
      return horariosObtenidos;
    } catch (error) {
      console.error("Error al obtener horarios:", error);
      return [];
    }
  }

  async function obtenerCitas(idProfesional) {
    try {
      let response = await fetch(
        url + "?idProfesionalParaCitas=" + idProfesional
      );
      let citasObtenidas = await response.json();
      return citasObtenidas;
    } catch (error) {
      console.error("Error al obtener citas:", error);
      return [];
    }
  }

  async function main() {
    const horarios = await obtenerHorarios();
    const citas = await obtenerCitas(idUsuarioProfesional);
    console.log("Horarios obtenidos:", horarios);
    console.log("Citas: ", citas);

    // Llamada a la función para imprimir la tabla con la fecha seleccionada
    imprimirTabla(horarios, citas, dia, mesString, año);
    imprimirFecha(dia, mesString, año);

  }

  function imprimirFecha(dia, mes, año) {
    let fechaCitas = document.getElementById("fecha-citas");
    fechaCitas.innerHTML = dia + " de " + mes + " de " + año;
  }

  async function imprimirTabla(
    horarios,
    citas,
    diaSeleccionado,
    mesSeleccionado,
    añoSeleccionado
  ) {
    let html = "";

    // Fila de encabezado
    html += "<tr id='encabezado-tabla'>";
    html += "<th>Horarios</th>";
    html += "<th>Citas</th>";
    html += "<th>Acciones</th>";
    html += "</tr>";

    for (let i = 0; i < horarios.length; i++) {
      const horaHorario = horarios[i].hora;

      // Filtra citas según hora y día
      const citasParaHorario = citas.filter(
        (c) =>
          c.hora === horaHorario &&
          c.fecha === "" + diaSeleccionado + "" &&
          c.año === "" + añoSeleccionado + "" &&
          c.mes.toLowerCase() === "" + mesSeleccionado + ""
      );

      console.log(
        `Citas para el horario ${horaHorario} y día ${diaSeleccionado}:`,
        citasParaHorario
      );

      // Generar filas para cada cita en este horario
      if (citasParaHorario.length > 0) {
        citasParaHorario.forEach((cita) => {
          html += generarFilaCita(cita, horaHorario);
        });
      } else {
        // Si no hay citas, muestra "No asignada"
        html += "<tr>";
        html += `<td>${horaHorario.substring(0, 5)}</td>`;
        html += `<td class='no-asignada'><hr></td>`;
        html += "<td></td>";
        html += "</tr>";
      }
    }

    // Actualiza el contenido de la tabla
    tabla.innerHTML = html;
  }

  function generarFilaCita(cita, horaHorario) {
    return `
      <tr>
        <td>${horaHorario.substring(0, 5)}</td>
        <td>
          <div class='caja-cita' draggable='true' style='background-color:${
            cita.color1
          }; color:${cita.color2}' id='elemento-arrastrable${cita.id}'>
            <img src='${cita.foto}' class='foto-cliente'>
            <div class='info-cliente'>
              <p class='destacado'>${cita.nombre}</p>
              <p class='detalles'>${cita.telefono}</p>
            </div>
            <div class='info-servicio'>
              <p class='destacado'>${cita.nombreServicio}</p>
              <p class='detalles'>${cita.duracion}min - ${cita.precio} €</p>
            </div>
          </div>
        </td>
        <td>
          <img src='./img/edit_square_24dp_000000_FILL0_wght300_GRAD0_opsz24.png' alt='cambiar' title='cambiar cita' class='iconos-accion'>
          <img src='./img/delete_24dp_EA3323_FILL0_wght400_GRAD0_opsz24.png' class='iconos-accion' title='eliminar'>
          <img src='./img/check_circle_24dp_000000_FILL0_wght300_GRAD0_opsz24.png' class='iconos-accion' title='finalizar cita'>
        </td>
      </tr>`;
  }


  main();

  // Obtener el dato temporal
  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Guardar el dato temporal
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
});
