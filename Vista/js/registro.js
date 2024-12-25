window.addEventListener("DOMContentLoaded", function () {
  //Obtener el formulario
  let formularioRegistro = document.getElementById("formularioRegistro");

  let inputNombre = document.getElementById("nombre");
  let inputTelefono = document.getElementById("telefono");

  inputNombre.addEventListener("input", function () {
    // Elimina caracteres no permitidos y reemplaza múltiples espacios por uno solo
    this.value = this.value.replace(/[^A-Za-z\s]/g, ""); // Permite solo letras y espacios
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
          alert("Registro completado con éxito.");
          window.location.href = "login.php";
        }
      });
  });
});
