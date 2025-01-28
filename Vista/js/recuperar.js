window.addEventListener("DOMContentLoaded", function () {
  let sesion = "./../Controlador/procesarsesion.php";

  let btnConfirmar = document.getElementById("btn-confirmar");
  let contrasenaNuevaInput = document.getElementById("contraseña-nueva");

  const params = new URLSearchParams(window.location.search);
  const correo = params.get("correo");

  verificarCorreo(correo);

  function verificarCorreo(correo) {
    fetch(sesion)
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario_provisional != correo) {
          alert("No puedes ver la información de otro usuario");
          window.location.href = "index.php";
        }
      });
  }


  btnConfirmar.addEventListener("click", function () {
    let contrasenaNueva = contrasenaNuevaInput.value;
    enviarContrasenaNueva(contrasenaNueva, correo);
  });

  function enviarContrasenaNueva(contrasena, correo) {
    fetch(
      "./../Controlador/recuperarcontrasenacontrolador.php?contrasenaNueva=" +
        contrasena +
        "&correo=" +
        correo
    )
      .then((response) => response.json())
      .then((data) => {
        alert(data);
        window.location.href = "login.php";
      });
  }
});
