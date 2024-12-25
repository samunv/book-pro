window.addEventListener("DOMContentLoaded", function () {
    //Obtener el formulario
    let formularioRegistro = document.getElementById("formularioRegistro");



    let inputNombre = document.getElementById("nombre");
    let inputTelefono = document.getElementById("telefono");

    inputNombre.addEventListener("input", function(){
      this.value = this.value.replace(/[^A-Za-z]/g, "_").replace(/\s/g, "_");
      this.value = this.value.replace(/_{3,}/g, "__");
    })

    inputTelefono.addEventListener("input", function(){
      this.value = this.value.replace(/\D/g, "");
    })
  
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
          if(data.error){
            alert(data.error); 
          }else{
            alert("Registro completado con éxito."); 
            window.location.href = "login.php"; 
          }
          
        });
    });
  });