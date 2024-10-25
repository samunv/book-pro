window.addEventListener("DOMContentLoaded", function () {
  //Obtener el formulario
  comprobarSesion(); 
  let formularioLogin = document.getElementById("formularioLogin");

  formularioLogin.addEventListener("submit", function (e) {
    // Evitar la recarga de la página al hacer submit
    e.preventDefault();

    //Crear un objeto datos de la clase FormData con los datos del formulario como parámetro
    let datos = new FormData(formularioLogin);

    //Enviar los datos al controlador mediante Post
    fetch("./../Controlador/procesarlogin.php", {
      method: "POST",
      body: datos,
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          window.location.href = "index.php";
        }
      });
  });

  function comprobarSesion(){
    fetch("./../Controlador/procesarsesion.php")
        .then((response) => response.json())
        .then((data) => {
          
          if(data.sesion){
            window.location.href = "index.php"; 
          }
        });
  }
});
