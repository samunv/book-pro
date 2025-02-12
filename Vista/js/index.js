// Esperar a que el DOM esté completamente cargado
window.addEventListener("DOMContentLoaded", function () {
  const URL_USUARIO = "./../Controlador/indexcontrolador.php";
  const URL_SESION = "./../Controlador/procesarsesion.php";
  const URL_EMPRESA = "./../Recursos/datos-empresa.json";
  const DEFAULT_IMAGE = "default.png"; // Imagen predeterminada

  // Retrasar la visualización del contenido
  setTimeout(() => {
    // Ocultar el loader y mostrar el contenido
    document.getElementById("loader").style.display = "none";
    document.getElementById("contenido").style.display = "flex";
  }, 600);

  // Guardar dato temporalmente en sessionStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

  // Obtener dato de sessionStorage
  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  // Obtener datos del usuario según la sesión
  async function obtenerUsuario(sesion) {
    try {
      const response = await fetch(`${URL_USUARIO}?sesion=${sesion}`);
      if (!response.ok)
        throw new Error(`Error al obtener usuario: ${response.status}`);

      const data = await response.json();
      if (!data) throw new Error("No se encontraron datos del usuario");

      // Guardar datos en sessionStorage
      guardarDatoTemporal("idUsuario", data.idUsuario);
      guardarDatoTemporal("permisos", data.permisos);
      guardarDatoTemporal("telefono", data.telefono);
      guardarDatoTemporal("foto", data.foto || DEFAULT_IMAGE);
      guardarDatoTemporal("nombre", data.nombre);

      const correo = data.correo || "";
      guardarDatoTemporal("correo", correo);
      obtenerNotificaciones(correo);

      const enlaceCitas = document.getElementById("ver-citas");
      const enlacePerfil = document.getElementById("editar-perfil");
      const enlaceNotificaciones = document.getElementById("notificaciones");

      const nuevoParametro = "?correo=" + correo;
      enlaceCitas.href += nuevoParametro;
      enlacePerfil.href += nuevoParametro;
      enlaceNotificaciones.href += nuevoParametro;

      // Actualizar interfaz con los datos del usuario
      actualizarInterfazUsuario(data);

      return data.permisos;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return null;
    }
  }

  function obtenerNotificaciones(correo) {
    fetch(URL_USUARIO + "?correoNotificaciones=" + correo)
      .then((response) => response.json())
      .then((notificaciones) => {
        imprimirCuentaDeNotificaciones(notificaciones.length);
      });
  }

  let cuentaNotificaciones = this.document.getElementById(
    "cuenta-notificaciones"
  );
  function imprimirCuentaDeNotificaciones(longitudNotificaciones) {
    if (longitudNotificaciones > 0) {
      cuentaNotificaciones.innerHTML = "" + longitudNotificaciones;
    } else {
      cuentaNotificaciones.style.display = "none";
    }
  }

  // Actualizar elementos de la interfaz con los datos del usuario
  function actualizarInterfazUsuario(data) {
    const imgFoto = document.getElementById("img-foto");
    const nombreUsuarioElement = document.getElementById("nombre-usuario");
    const correoUsuarioElement = document.getElementById("correo-usuario");

    imgFoto.src = data.foto || DEFAULT_IMAGE;
    nombreUsuarioElement.textContent = data.nombre || "Usuario desconocido";
    let correo = obtenerDatoTemporal("correo");
    correoUsuarioElement.textContent =
      correo.length > 20 ? correo.substring(0, 20) + "..." : correo;
  }

  // Obtener el nombre de la empresa
  async function obtenerNombreEmpresa() {
    try {
      const response = await fetch(URL_EMPRESA);
      if (!response.ok)
        throw new Error(
          `Error al obtener nombre de empresa: ${response.status}`
        );

      const data = await response.json();
      const tituloPagina = document.getElementById("titulo-pagina");
      tituloPagina.innerHTML = "BookPro" || "Nombre de la empresa";
    } catch (error) {
      console.error("Error al obtener el nombre de la empresa:", error);
    }
  }

  // Comprobar sesión del usuario
  async function comprobarSesion() {
    try {
      const response = await fetch(URL_SESION);
      if (!response.ok)
        throw new Error(`Error al comprobar sesión: ${response.status}`);

      const data = await response.json();
      if (!data.sesion) {
        alert("No hay sesión");
        window.location.href = "login.php";
      }

      console.log("Sesión encontrada:", data.sesion);
      guardarDatoTemporal("sesion", data.sesion);

      let contenedorOculto = document.getElementById("contenedor-oculto");
      let contenedorReservarCita = document.getElementById("reservar-cita");
      let contenedorVerCitas = document.getElementById("ver-citas");

      // Obtener datos del usuario y redirigir según permisos
      const permisos = await obtenerUsuario(data.sesion);
      if (permisos === "1") {
        contenedorOculto.style.display = "flex";
        contenedorReservarCita.style.display = "none";
        contenedorVerCitas.style.display = "none";
      }
    } catch (error) {
      console.error("Error al comprobar sesión:", error);
      window.location.href = "login.php"; // Redirigir al login en caso de error
    }
  }

  // Ocultar el icono de acción
  function ocultarIconoAccion() {
    const icono = document.getElementById("icono-accion");
    if (icono) icono.style.display = "none";
  }

  // Inicializar la aplicación
  async function inicializar() {
    ocultarIconoAccion(); // Ocultar icono de acción
    await obtenerNombreEmpresa(); // Cargar nombre de la empresa
    comprobarSesion(); // Comprobar sesión
  }

  // Ejecutar inicialización
  inicializar();

	let deferredPrompt;
	const btnInstall = document.getElementById("instalar-app"); // Usa document.getElementById directamente
	
	window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			deferredPrompt = e; // Guarda el evento
			btnInstall.style.display = "block"; // Muestra el botón
			console.log("Evento beforeinstallprompt capturado");
	});
	
	btnInstall.addEventListener("click", () => {
			console.log("Botón de instalación clickeado");
			if (deferredPrompt) {
					console.log("deferredPrompt existe, mostrando banner");
					deferredPrompt.prompt();
	
					deferredPrompt.userChoice.then((choiceResult) => {
							if (choiceResult.outcome === 'accepted') {
									console.log('Usuario aceptó la instalación');
							} else {
									console.log('Usuario rechazó la instalación');
							}
							deferredPrompt = null; // Limpia deferredPrompt después de usarlo
					}).catch(error => {
							console.error("Error con userChoice:", error);
							deferredPrompt = null; // Limpia deferredPrompt incluso si hay un error
					});
			} else {
					console.log("deferredPrompt es null, no se puede mostrar el banner");
			}
	});
});
