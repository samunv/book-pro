window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let formularioLogin = document.getElementById("formularioLogin");

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
          window.location.href = "index.php";
        } else if (data.error) {
          alert(data.error);
        }
      });
  });

  let permisos = obtenerDatoTemporal("permisos");

  function comprobarSesion() {
    fetch("./../Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          if (permisos === "1") {
            window.location.href = "paneldecontrol2.php";
          } else {
            window.location.href = "index.php";
          }
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
