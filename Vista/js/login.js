window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let formularioLogin = document.getElementById("formularioLogin");

  // let inputNombre = document.getElementById("nombreLogin");

  // inputNombre.addEventListener("input", function () {
  //   // cualquier caracter que no sea una letra, me la convertirá a un guión bajo
  //   this.value = this.value.replace(/[^A-Za-z]/g, "_").replace(/\s/g, "_");

  //   // Evitar más de dos guiones bajos consecutivos
  //   this.value = this.value.replace(/_{3,}/g, "__");
  // });

  formularioLogin.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Crear un objeto datos de la clase FormData con los datos del formulario como parámetro
    let datos = new FormData(formularioLogin);

    fetch("./../Controlador/procesarlogin.php", {
      method: "POST",
      body: datos,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario) {
          if (data.usuario.permisos === "1") {
            guardarDatoTemporal("permisos", data.usuario.permisos);
            guardarDatoTemporal("idUsuario", data.usuario.idUsuario);
            guardarDatoTemporal("nombre", data.usuario.nombre);
            guardarDatoTemporal("foto", data.usuario.foto);
            guardarDatoTemporal("telefono", data.usuario.telefono);
            guardarDatoTemporal("correo", data.usuario.correo);
            window.location.href = "paneldecontrol.php";
          } else {
            window.location.href = "index.php";
          }
        } else if (data.error) {
          alert(data.error);
        }
      });
  });

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          window.location.href = "index.php";
        }
      });
  }

  function guardarDatoTemporal(clave, valor) {
    sessionStorage.setItem(clave, valor);
  }

  function obtenerDatoTemporal(clave) {
    return sessionStorage.getItem(clave);
  }
});
