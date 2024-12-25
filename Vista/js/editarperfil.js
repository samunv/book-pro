window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/editarperfilcontrolador.php";

  let tituloPagina = document.getElementById("titulo-pagina");
  tituloPagina.innerHTML = "Editar Perfil";

  let icono = document.getElementById("icono-accion");
  icono.src = "img/arrow_back_ios_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png";
  icono.addEventListener("click", function () {
    window.location.href = "index.php";
  });

  let nombre = document.getElementById("nombreEditar");
  let telefono = document.getElementById("telefonoEditar");

  let idUsuario = obtenerDatoTemporal("idUsuario");

  let nombreSesion = obtenerDatoTemporal("nombre");
  let telefonoSesion = obtenerDatoTemporal("telefono");

  nombre.placeholder = nombreSesion;
  telefono.placeholder = telefonoSesion;

  let imgFoto = document.getElementById("img-foto");
  imgFoto.style.display = "none";

  let nombreUsuario = document.getElementById("nombre-usuario");
  nombreUsuario.innerHTML = "";

  let fotoDePerfil = document.getElementById("fotoDePerfil");
  fotoDePerfil.src = obtenerDatoTemporal("foto");

  let ventanaEditarFoto = document.getElementById("ventana-editarfoto-oculta");
  let overlay = document.getElementById("overlay");


  // Funciones para activar/desactivar botones
  function desactivarBoton(boton) {
    boton.style.backgroundColor = "grey";
    boton.disabled = true;
  }

  function activarBoton(boton) {
    boton.disabled = false;
    boton.style.backgroundColor = "#006bff";
  }

  // Lógica de activación/desactivación de botones en base a la validación
  let btnActualizarTelefono = document.getElementById("btnActualizar-telefono");
  let btnActualizarNombre = document.getElementById("btnActualizar-nombre");

  desactivarBoton(btnActualizarTelefono);
  desactivarBoton(btnActualizarNombre);

  // Validación del campo de nombre
  nombre.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "_").replace(/\s/g, "_");

    // Evitar más de dos guiones bajos consecutivos
    this.value = this.value.replace(/_{3,}/g, "__");

    if (nombre.value.length >= 5 && nombre.value.length <= 15) {
      activarBoton(btnActualizarNombre);
    } else {
      desactivarBoton(btnActualizarNombre);
    }
  });

  // Validación del campo de teléfono
  telefono.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
    if (telefono.value.length === 9 && /^\d+$/.test(telefono.value)) {
      // Verifica longitud y si es numérico
      activarBoton(btnActualizarTelefono);
    } else {
      desactivarBoton(btnActualizarTelefono);
    }
  });

  // Lógica para actualizar el teléfono
  btnActualizarTelefono.addEventListener("click", function (e) {
    e.preventDefault();
    fetch(url + "?idUsuario=" + idUsuario + "&telefono=" + telefono.value)
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.href = "index.php";
      });
  });

  // Lógica para actualizar el nombre
  btnActualizarNombre.addEventListener("click", function (e) {
    e.preventDefault();
    fetch(url + "?idUsuario=" + idUsuario + "&nombre=" + nombre.value)
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.href = "index.php";
      });
  });

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.php";
        }
      });
  }

  // Cerrar sesión
  let botonCerrarSesion = document.getElementById("btn-cerrar-sesion");
  botonCerrarSesion.addEventListener("click", function () {
    if (
      confirm("¿Estás seguro de que quieres cerrar sesión con esta cuenta?")
    ) {
      cerrarSesion();
    }
  });

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

  fotoDePerfil.addEventListener("click", function () {
    activarVentana(ventanaEditarFoto, overlay);

    let btnCancelar = document.getElementById("btn-cancelar");
    let btnConfirmar = document.getElementById("btn-confirmar");
    

    btnCancelar.addEventListener("click", function () {
      desactivarVentana(ventanaEditarFoto, overlay);
    });

    btnConfirmar.addEventListener("click", function () {
      let archivoFoto = document.getElementById("archivo-foto");
      const fotoSeleccionada = obtenerFotoSeleccionada(archivoFoto);


      if (fotoSeleccionada != null) {
        enviarFotoSeleccionada(fotoSeleccionada);
      }
    });
  });

  function obtenerFotoSeleccionada(archivoFoto) {
    const archivo = archivoFoto.files[0];
    if (!archivo) {
      alert("Por favor selecciona un archivo.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", archivo);
    // Agregar el ID del usuario al FormData
    formData.append("idUsuario", idUsuario);

    return formData;
  }

  function enviarFotoSeleccionada(fotoSeleccionada) {
    fetch("./../Controlador/fotoperfil.php", {
      method: "POST",
      body: fotoSeleccionada,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.href = "index.php";
      })
      .catch((error) => {
        console.error("Error al subir el archivo: ", error);
      });
  }

  function desactivarVentana(ventana, overlay) {
    ventana.style.display = "none";
    overlay.style.display = "none";
  }

  function activarVentana(ventana, overlay) {
    ventana.style.display = "flex";
    overlay.style.display = "block";
  }
});
