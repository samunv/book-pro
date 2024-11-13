window.addEventListener("DOMContentLoaded", function () {
  //Obtener el formulario
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
        console.log(data[0]);
        window.location.href="index.php";

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
});
