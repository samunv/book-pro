window.addEventListener("DOMContentLoaded", function () {
  //Obtener el formulario
  let formularioRegistro = document.getElementById("formularioRegistro");

  let inputNombre = document.getElementById("nombre");
  let inputTelefono = document.getElementById("telefono");
  let inputCorreo = document.getElementById("correo");

  let overlay = document.getElementById("overlay");

  let btnCancelar = document.getElementById("btn-cancelar");

  inputNombre.addEventListener("input", function () {
    // Elimina caracteres no permitidos y reemplaza múltiples espacios por uno solo
    this.value = this.value.replace(/[^A-Za-z0-9\s]/g, "");
    this.value = this.value.replace(/\s{3,}/g, "  "); // Limita los espacios consecutivos a un máximo de dos
    this.value = this.value.replace(/^\s+/g, ""); // Elimina los espacios al inicio
  });

  inputTelefono.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  formularioRegistro.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Crear un objeto datos de la clase FormData con los datos del formulario como parámetro
    let datos = new FormData(formularioRegistro);

    //Enviar los datos al controlador mediante Post
    fetch("./../Controlador/registrocontrolador.php", {
      method: "POST",
      body: datos,
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          let seccionConfirmacion = document.getElementById(
            "seccion-confirmacion"
          );
          seccionConfirmacion.style.display = "block";
          overlay.style.display = "block";
          let spanCorreo = document.getElementById("span-correo");
          spanCorreo.innerHTML = inputCorreo.value;
        }
      });
  });

  let formularioVerificar = this.document.getElementById(
    "formulario-verificar"
  );

  let inputToken = this.document.getElementById("token");

  formularioVerificar.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Enviar los datos al controlador mediante Post
    fetch(
      "./../Controlador/registrocontrolador.php?token=" +
        inputToken.value +
        "&correoToken=" +
        inputCorreo.value
    )
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data);
        if (data) {
          alert(data.mensaje);
          window.location.href = "login.php";
        }
      });
  });

  btnCancelar.addEventListener("click", function () {
    eliminarUsuario(inputCorreo.value);
    window.location.reload();
  });

  function eliminarUsuario(correo) {
    fetch("./../Controlador/registrocontrolador.php?correoEliminar=" + correo)
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data);
        alert("El usuario no se ha registrado.");
      });
  }
});
