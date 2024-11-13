window.addEventListener("DOMContentLoaded", function () {
  let btnContinuar1 = document.getElementById("btn-continuar-1");
  let listaHorarios = document.getElementById("lista-horarios");
  let formularioHora = document.getElementById("formulario-hora");
  let cajaProfesionales = document.getElementById("profesionales");

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Reservar";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "elegirservicio.php";
  });

  
  // Inicialmente desactivar el botón
  desactivarBoton(btnContinuar1);

  // Variables de fecha
  const mesAño = document.getElementById("mes-año");
  const diasContenedor = document.getElementById("dias");
  let fecha = new Date();
  let diaActual = fecha.getDate();
  let mesActual = fecha.getMonth();
  let añoActual = fecha.getFullYear();
  let añoSeleccionado = añoActual;
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
  let mesSeleccionado = meses[mesActual];

  // Actualizar la visualización de la fecha
  function actualizarFecha() {
    mesAño.innerText = `${meses[mesActual]} ${añoActual}`;
    mesSeleccionado = meses[mesActual];
    añoSeleccionado = añoActual;
    guardarDatoTemporal("mes", mesSeleccionado);
    guardarDatoTemporal("año", añoSeleccionado);
  }

  // Obtener el último día del mes
  function obtenerUltimoDia(mes, año) {
    return new Date(año, mes + 1, 0).getDate();
  }

  // Obtener el día de la semana del primer día del mes
  function obtenerPrimerDiaSemana(mes, año) {
    return new Date(año, mes, 1).getDay();
  }

  // Generar los días del mes actual con los espacios vacíos
  function generarDiasDelMesActual(ultimoDia, primerDiaSemana) {
    let diasHTML = "";
    // Añadir días vacíos al inicio
    for (let i = 0; i < primerDiaSemana; i++) {
      diasHTML += "<div class='dia vacio'></div>";
    }
    // Añadir días del mes
    for (let i = 1; i <= ultimoDia; i++) {
      if (mesActual === fecha.getMonth() && i < diaActual) {
        diasHTML += "<div class='dia vacio'>" + i + "</div>"; // Días vacíos para días anteriores al actual
      } else {
        diasHTML += `<div class='dia numero' id='dia-numero${i}'>${i} </div>`;
      }
    }
    return diasHTML;
  }

  // Llenar el calendario
  function llenarCalendario() {
    actualizarFecha();
    const ultimoDia = obtenerUltimoDia(mesActual, añoActual);
    const primerDiaSemana = obtenerPrimerDiaSemana(mesActual, añoActual);
    let diasHTML = generarDiasDelMesActual(ultimoDia, primerDiaSemana);
    diasContenedor.innerHTML = diasHTML;
    elegirDia(ultimoDia);
  }

  // Navegar al mes siguiente
  function irAlMesSiguiente() {
    if (mesActual === 11) {
      mesActual = 0;
      añoActual++;
    } else {
      mesActual++;
    }
    llenarCalendario();
  }

  // Navegar al mes anterior
  function irAlMesAnterior() {
    if (comprobarMesActual()) {
      return;
    } else if (mesActual === 0) {
      mesActual = 11;
      añoActual--;
    } else {
      mesActual--;
    }

    llenarCalendario();
  }

  function comprobarMesActual() {
    // Comprobar si estamos en el mes y año actual para evitar retroceder
    if (añoActual === fecha.getFullYear() && mesActual === fecha.getMonth()) {
      return true;
    }
  }

  // Agregar eventos a los botones de navegación
  let btnMesAnterior = document.getElementById("mes-anterior")
  btnMesAnterior.addEventListener("click", irAlMesAnterior);
  let btnMesSiguiente = document.getElementById("mes-siguiente")
  btnMesSiguiente.addEventListener("click", irAlMesSiguiente);

  llenarCalendario();

  // Selección de días
  let diaSeleccionado = null; // Variable para almacenar el día seleccionado

  function elegirDia(ultimoDia) {
    for (let i = 1; i <= ultimoDia; i++) {
      let btnDia = document.getElementById("dia-numero" + i);
      if (btnDia) {
        btnDia.addEventListener("click", () => seleccionarDia(i));
      }
    }
  }

  function seleccionarDia(dia) {
    let profesionalSeleccionado = obtenerDatoTemporal("idProfesional");
    if (profesionalSeleccionado === null) {
      return alert("Por favor, selecciona un profesional primero.");
    }

    if (diaSeleccionado !== null) {
      actualizarEstiloDia(diaSeleccionado, false); // Deseleccionar el día previo
    }

    actualizarEstiloDia(dia, true); // Seleccionar el nuevo día
    diaSeleccionado = dia;
    guardarDatoTemporal("dia", dia); // Guardar día seleccionado en sessionStorage
    obtenerHorasDisponibles(
      dia,
      mesSeleccionado,
      añoSeleccionado,
      profesionalSeleccionado
    ); // Obtener horas disponibles para el día seleccionado
  }

  function actualizarEstiloDia(dia, seleccionar) {
    let btnDia = document.getElementById("dia-numero" + dia);
    desactivarBoton(btnContinuar1);
    if (btnDia) {
      if (seleccionar) {
        btnDia.style.backgroundColor = "#BFE8FF";
        btnDia.style.color = "rgb(0, 107, 255)";
        btnDia.style.fontWeight = "bold";
      } else {
        btnDia.style.backgroundColor = "";
        btnDia.style.color = "";
        btnDia.style.fontWeight = "";
      }
    }
  }

  function desactivarBoton(boton) {
    boton.disabled = true;
    boton.style.backgroundColor = "grey";
  }

  function activarBoton(boton) {
    boton.disabled = false;
    boton.style.backgroundColor = "";
  }

  // Función para almacenar un dato en sessionStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

  // Función para recuperar un dato de sessionStorage
  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Obtener horas disponibles para el día seleccionado
  function obtenerHorasDisponibles(dia, mes, año, idProfesional) {
    fetch(
      "./../Controlador/obtenerhorarios.php?dia=" +
        dia +
        "&mes=" +
        mes +
        "&año=" +
        año +
        "&idProfesional=" +
        idProfesional
    )
      .then((response) => response.json())
      .then((data) => {
        mostrarHoras(data);
        elegirHora(data);
      });
  }

  function mostrarHoras(horas) {
    let html = "";
    let hayHorasDisponibles = false;

    horas.forEach((hora) => {
      const numeroDeCaracteres = 5;
      if (hora.hora) {
        // Verificar si la hora no está vacía
        html += `<li id='${hora.hora}'>${hora.hora.substring(
          0,
          numeroDeCaracteres
        )}</li>`;
        hayHorasDisponibles = true;
      }
    });

    if (!hayHorasDisponibles) {
      html =
        "<p id='texto-no-horas'>No hay horas disponibles en el día seleccionado.<p>";
    }

    listaHorarios.innerHTML = html;
  }

  let horaSeleccionada = null;

  function elegirHora(horas) {
    horas.forEach((hora) => {
      let btnHora = document.getElementById(hora.hora);
      if (btnHora) {
        btnHora.addEventListener("click", () => seleccionarHora(hora.hora));
        formularioHora.style.display = "flex";
      }
    });
  }

  function seleccionarHora(hora) {
    if (horaSeleccionada !== null) {
      actualizarEstiloHora(horaSeleccionada, false); // Deseleccionar la hora previa
    }

    actualizarEstiloHora(hora, true); // Actualizar el estilo de la nueva hora seleccionada
    horaSeleccionada = hora;
    console.log("Hora seleccionada: ", hora); // Debugging
    guardarDatoTemporal("hora", horaSeleccionada); // Guardar hora seleccionada en sessionStorage
    activarBoton(btnContinuar1);
  }

  function actualizarEstiloHora(hora, seleccionar) {
    let btnHora = document.getElementById(hora);
    if (btnHora) {
      if (seleccionar) {
        btnHora.style.backgroundColor = "rgb(0, 107, 255)";
        btnHora.style.color = "#fff";
        btnHora.style.border = "2px solid rgb(0, 107, 255)";
      } else {
        btnHora.style.backgroundColor = "";
        btnHora.style.color = "";
        btnHora.style.border = "";
      }
    }
  }

  let horaFinal = obtenerDatoTemporal("hora");
  let diaFinal = obtenerDatoTemporal("dia");
  let idServicio = obtenerDatoTemporal("idServicio");
  let mesFinal = obtenerDatoTemporal("mes");
  let añoFinal = obtenerDatoTemporal("año");

  btnContinuar1.addEventListener("click", function () {
    horaFinal = obtenerDatoTemporal("hora"); // Asegurarse de que se obtenga la hora más actualizada
    diaFinal = obtenerDatoTemporal("dia"); // Asegurarse de que se obtenga el día más actual
    idProfesional = obtenerDatoTemporal("idProfesional"); // Asegurarse de que se obtenga el profesional más actual
    mesFinal = obtenerDatoTemporal("mes");
    añoFinal = obtenerDatoTemporal("año");

    window.location.href = "resumen.php";
  });

  enviarIdServicio(idServicio);

  function enviarIdServicio(idServicio) {
    fetch(
      "./../Controlador/obtenerprofesionalporservicio.php?idServicio=" +
        idServicio
    )
      .then((response) => response.json())
      .then((data) => {
        imprimirProfesionales(data);
      });
  }
  let profesionalSeleccionado = null;

  function imprimirProfesionales(profesionales) {
    let html = "";
    profesionales.forEach((profesional) => {
      html += `<div class='caja-profesional'>
           <div class='profesional' id='${profesional.idProfesional}'>
             <img src='img/fotoperfil.webp' alt='' width='120' height='120'>
           </div>
           <p class='nombre'>${profesional.nombre}</p>
         </div>`;
    });
    cajaProfesionales.innerHTML = html;
    elegirProfesional();
    // Seleccionar automáticamente el primer profesional
    if (profesionales.length > 0) {
      seleccionarProfesional(profesionales[0].idProfesional);
    }
  }

  function elegirProfesional() {
    const divsProfesionales = document.querySelectorAll(".profesional");
    divsProfesionales.forEach((div) => {
      div.addEventListener("click", () => seleccionarProfesional(div.id));
    });
  }

  function seleccionarProfesional(id) {
    if (profesionalSeleccionado !== id) {
      let dia = obtenerDatoTemporal("dia");

      if (diaSeleccionado !== null) {
        obtenerHorasDisponibles(dia, mesSeleccionado, añoSeleccionado, id);
      }

      if (profesionalSeleccionado !== null) {
        actualizarEstiloProfesional(profesionalSeleccionado, false); // Deseleccionar el profesional previo
      }

      actualizarEstiloProfesional(id, true); // Actualizar el estilo del nuevo profesional seleccionado
      profesionalSeleccionado = id; // Guardar profesional seleccionado
      guardarDatoTemporal("idProfesional", id); // Guardar en sessionStorage
    }
  }

  function actualizarEstiloProfesional(id, seleccionar) {
    let divProfesional = document.getElementById(id);
    if (divProfesional) {
      if (seleccionar) {
        divProfesional.style.border = "2px solid rgb(0, 107, 255)";
        divProfesional.style.backgroundColor = "rgba(0, 107, 255, 0.1)";
      } else {
        divProfesional.style.border = "";
        divProfesional.style.backgroundColor = "";
      }
    }
  }
});
