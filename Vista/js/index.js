window.addEventListener("DOMContentLoaded", function () {
  obtenerUsuario();
  comprobarSesion();

  let tituloPagina = document.getElementById("titulo-pagina");
  let icono = document.getElementById("icono-accion");
  icono.style.display = "none";

  let enlaceInstagram = document.getElementById("enlace-instagram");

  obtenerNombreEmpresa().then((nombre) => {
    tituloPagina.innerHTML = nombre;
  });

  async function obtenerNombreEmpresa() {
    try {
      const response = await fetch("./../Recursos/datos-empresa.json");
      const data = await response.json();
      return data.nombre;
    } catch (error) {
      console.error("Error al obtener el nombre de la empresa:", error);
    }
  }

  obtenerInstagramEmpresa();
  function obtenerInstagramEmpresa(){
    fetch("./../Recursos/datos-empresa.json")
      .then((response) => response.json())
      .then((data) => {
        // Asigna la URL completa de Instagram
      enlaceInstagram.href = `https://www.instagr1am.com/${data.contacto[0].redes_sociales[0].instagram.slice(1)}`;
      imprimirDatos(data);
      });
  }

  // Obtener información del usuario
  function obtenerUsuario() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          guardarDatoTemporal("nombre", data.sesion);
          obtenerIdUsuario(data.sesion);
        }
      });
  }

  function obtenerIdUsuario(nombreUsuario) {
    fetch("./../Controlador/obteneridusuario.php?nombre=" + nombreUsuario)
      .then((response) => response.json())
      .then((data) => {
        if (data.idUsuario) {
          let idUsuario = data.idUsuario; // Asegúrate de que 'data' tiene la propiedad 'idUsuario'
          guardarDatoTemporal("idUsuario", idUsuario);
          obtenerTelefono(idUsuario);
        } else if (data.error) {
          alert(data.error); // Muestra el error si no se encuentra el usuario
        }
      });
  }

  function obtenerTelefono(idUsuario) {
    fetch("./../Controlador/obtenerusuario.php?idUsuario=" + idUsuario)
      .then((response) => response.json())
      .then((data) => {
        if (data.telefono) {
          guardarDatoTemporal("telefono", data.telefono);
        }
      });
  }

  // Comprobar sesión
  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          window.location.href = "login.php";
        }
      });
  }

  // Función para almacenar un dato en localStorage
  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }
});
