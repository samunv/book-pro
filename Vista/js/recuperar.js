window.addEventListener("DOMContentLoaded", function () {
  let btnConfirmar = document.getElementById("btn-confirmar");
  let contrasenaNuevaInput = document.getElementById("contraseña-nueva");

  const params = new URLSearchParams(window.location.search);
  const correo = params.get("correo");

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
