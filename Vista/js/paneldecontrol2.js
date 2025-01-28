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
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
    dia = fechaSeleccionada.getDate();
    mes = fechaSeleccionada.getMonth();
    año = fechaSeleccionada.getFullYear();
    mesString = meses[mes];
    actualizarInputs(dia, mesString, año);
    main();
  }

  function irAlDiaAnterior() {
    fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1);
    dia = fechaSeleccionada.getDate();
    mes = fechaSeleccionada.getMonth();
    año = fechaSeleccionada.getFullYear();
    mesString = meses[mes];
    actualizarInputs(dia, mesString, año);
    main();
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
          sessionStorage.clear();
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

  function obtenerHorarios() {
    return fetch(url + "?obtenerHorarios=true")
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al obtener horarios:", error);
        return [];
      });
  }

  function obtenerCitas(idProfesional) {
    return fetch(url + "?idProfesionalParaCitas=" + idProfesional)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error al obtener citas:", error);
        return [];
      });
  }

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (!data.sesion) {
          alert("No hay sesión");
          window.location.href="login.php";
        }
      });
  }

  function main() {
    comprobarSesion();
    Promise.all([obtenerHorarios(), obtenerCitas(idUsuarioProfesional)])
      .then(([horarios, citas]) => {
        console.log("Horarios obtenidos:", horarios);
        console.log("Citas: ", citas);

        imprimirTabla(horarios, citas, dia, mesString, año);
        actualizarInputs(dia, mesString, año);
      })
      .catch((error) => {
        console.error("Error en main:", error);
      });
  }
  const inputDia = document.getElementById("input-dia");
  const inputMes = document.getElementById("input-mes");
  const inputAño = document.getElementById("input-año");

  imprimirMes(meses, inputMes, mes);
  inputDia.value = dia;
  inputAño.value = año;

  function imprimirMes(meses, input, mesActual) {
    for (let i = 0; i < meses.length; i++) {
      const option = document.createElement("option");
      option.value = meses[i];
      option.text = meses[i];
      if (i === mesActual) {
        option.selected = true;
      }
      input.appendChild(option);
    }
  }

  inputMes.addEventListener("change", function () {
    mes = inputMes.selectedIndex;
    mesString = meses[mes];
    actualizarInputs(dia, mesString, año);
    actualizarFechaSeleccionada();
    main();
  });

  inputDia.addEventListener("input", function () {
    dia = inputDia.value;
    actualizarInputs(dia, mesString, año);
    actualizarFechaSeleccionada();
    main();
  });

  inputAño.addEventListener("input", function () {
    año = inputAño.value;
    actualizarInputs(dia, mesString, año);
    actualizarFechaSeleccionada();
    main();
  });

  function actualizarInputs(dia, mes, año) {
    inputDia.value = dia;
    inputMes.value = mes;
    inputAño.value = año;
    imprimirFecha(dia, mes, año);
  }

  function actualizarFechaSeleccionada() {
    fechaSeleccionada = new Date(año, mes, dia);
  }

  function imprimirFecha(dia, mes, año) {
    let textoFecha = `${dia} de ${mes} de ${año}`;
    if (comprobarDiaActual(dia, mes, año)) {
      textoFecha += " (hoy)";
    }
    console.log(textoFecha); // Puedes actualizar esto para mostrar la fecha en el lugar adecuado
  }

  function comprobarDiaActual(dia, mes, año) {
    const hoy = new Date();
    const diaActual = hoy.getDate();
    const mesActual = hoy.toLocaleString("default", { month: "long" });
    const añoActual = hoy.getFullYear();

    return (
      parseInt(dia) === diaActual &&
      mes.toLowerCase() === mesActual.toLowerCase() &&
      parseInt(año) === añoActual
    );
  }

  function imprimirTabla(
    horarios,
    citas,
    diaSeleccionado,
    mesSeleccionado,
    añoSeleccionado
  ) {
    let html = "";

    html += "<tr id='encabezado-tabla'>";
    html += "<th>Horarios</th>";
    html += "<th id='columna-citas'>Citas</th>";
    html += "<th>Acciones</th>";
    html += "</tr>";

    for (let i = 0; i < horarios.length; i++) {
      const horaHorario = horarios[i].hora;

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

      if (citasParaHorario.length > 0) {
        citasParaHorario.forEach((cita) => {
          html += generarFilaCita(cita, horaHorario);

          let idCita = cita.idCita;
          let correo = cita.correo;
          let datosCita = {
            fecha: cita.fecha,
            hora: cita.hora,
            mes: cita.mes,
            año: cita.año,
            servicio: cita.nombreServicio,
          };
          // Asegúrate de que el elemento existe antes de agregar el evento
          setTimeout(() => {
            let botonEliminar = document.getElementById("papelera-" + idCita);
            if (botonEliminar) {
              botonEliminar.addEventListener("click", function () {
                eliminarCita(idCita, correo, datosCita);
              });
            } else {
              console.error(
                `Elemento con ID papelera-${idCita} no encontrado.`
              );
            }
          }, 0);
        });
      } else {
        html += "<tr>";
        html += `<td>${horaHorario.substring(0, 5)}</td>`;
        html += `<td class='no-asignada'><hr></td>`;
        html += "<td></td>";
        html += "</tr>";
      }
    }

    tabla.innerHTML = html;
  }

  function generarFilaCita(cita, horaHorario) {
    return `
      <tr>
        <td>${horaHorario.substring(0, 5)}</td>
        <td>
          <div class='caja-cita' draggable='true' id='elemento-arrastrable${
            cita.id
          }'>
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
        <td class='td-iconos'>
          <div class='icono-texto editar' id=''>Cambiar</div>
          <div class='icono-texto eliminar' id='papelera-${
            cita.idCita
          }'>Cancelar</div>
        </td>
      </tr>`;
  }

  function eliminarCita(idCita, correo, datosCita) {
    fetch(
      url +
        "?idCitaParaEliminar=" +
        idCita +
        "&correoParaEliminar=" +
        correo +
        "&datosCitaParaEliminar=" +
        encodeURIComponent(JSON.stringify(datosCita))
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        main();
      });
  }

  main();

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
});
