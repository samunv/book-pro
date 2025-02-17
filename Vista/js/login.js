window.addEventListener("DOMContentLoaded", function () {
  comprobarSesion();
  let formularioLogin = document.getElementById("formularioLogin");

  formularioLogin.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Crear un objeto datos de la clase FormData con los datos del formulario como parámetro
    let datos = new FormData(formularioLogin);

    fetch("http://localhost/backend-bookpro/Controlador/procesarlogin.php", {
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


  function comprobarSesion() {
    fetch("http://localhost/backend-bookpro/Controlador/procesarsesion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.sesion) {
          window.location.href= "index.php";
  
        }else if(!data.sesion){

        }
      });
  }

  let btnRecordarContrasena = document.getElementById("recordar-contrasena");
  let ventanaRecordarContrasena = document.getElementById(
    "ventana-recordar-contrasena"
  );
  let overlay = document.getElementById("overlay");
  let btnEnviar = document.getElementById("btn-enviar");
  let inputCorreoRecuperar = document.getElementById("input-correo-recuperar");

  btnRecordarContrasena.addEventListener("click", function () {
    ventanaRecordarContrasena.style.display = "flex";
    overlay.style.display = "block";
  });

  btnEnviar.addEventListener("click", function () {
    enviarCorreo(inputCorreoRecuperar.value);
  });

  function enviarCorreo(correo) {
    fetch(`http://localhost/backend-bookpro/Controlador/procesarlogin.php?correoRecuperar=${correo}`)
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        ventanaRecordarContrasena.style.display = "none";
        overlay.style.display = "none";
      });
  }
});
