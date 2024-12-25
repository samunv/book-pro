window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();

  let url = "./../Controlador/indexcontrolador.php";


  // Comprobar sesión
  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error || data == null) {
          console.log(data.error || "Sesión no encontrada");
          window.location.href = "login.php";
        } else {
          console.log("Sesión encontrada:", data.sesion);
          obtenerUsuario(data.sesion);
          guardarDatoTemporal("sesion", data.sesion);
        }
      });
  }

  function obtenerUsuario(sesion) {
    fetch(url+"?sesion=" + sesion)
      .then((response) => response.json())
      .then((data) => {
        guardarDatoTemporal("idUsuario", data.idUsuario);
        guardarDatoTemporal("permisos", data.permisos);
        guardarDatoTemporal("telefono", data.telefono);
        guardarDatoTemporal("foto", data.foto);
        guardarDatoTemporal("nombre", data.nombre)
        let correo = data.correo;
        if (correo.length > 20) {
          // Guardar los primeros 20 caracteres
          let correoRecortado = correo.substring(0, 20)+"...";
          guardarDatoTemporal("correo", correoRecortado);
        }else{
          guardarDatoTemporal("correo", correo);
        }
        // Actualizar la foto y el nombre de usuario una vez cargados los datos
        let imgFoto = document.getElementById("img-foto");
        imgFoto.src = data.foto;

        let nombreUsuarioElement = document.getElementById("nombre-usuario");
        nombreUsuarioElement.innerHTML = data.nombre || nombreUsuario;

        let correoUsuario = document.getElementById("correo-usuario");
        correoUsuario.innerHTML = obtenerDatoTemporal("correo");


      })
      .catch((error) => console.error("Error al obtener usuario:", error));
  }

  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
   // Función para recuperar un dato de sessionStorage
   function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }

  async function obtenerNombreEmpresa() {
    try {
      const response = await fetch("./../Recursos/datos-empresa.json");
      const data = await response.json();
      return data.nombre;
    } catch (error) {
      console.error("Error al obtener el nombre de la empresa:", error);
    }
  }

  obtenerNombreEmpresa().then((nombre) => {
    let tituloPagina = document.getElementById("titulo-pagina");
    tituloPagina.innerHTML = nombre;
  });

  // Oculta el icono de acción al cargar la página
  let icono = document.getElementById("icono-accion");
  icono.style.display = "none";
});
