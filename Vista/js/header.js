window.addEventListener("DOMContentLoaded", async function () {
  const URL_USUARIO = "./../Controlador/indexcontrolador.php";
  const URL_SESION = "./../Controlador/procesarsesion.php";

  // Comprobar sesión
  async function comprobarSesion() {
    try {
      const response = await fetch(URL_SESION);
      const data = await response.json();
      return data.sesion || null;
    } catch (error) {
      console.error("Error comprobando sesión:", error);
      return null;
    }
  }

  // Obtener correo del usuario
  async function obtenerUsuario(sesion) {
    try {
      const response = await fetch(`${URL_USUARIO}?sesion=${sesion}`);
      const data = await response.json();
      return data.correo || null;
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      return null;
    }
  }

  // Ejecutar las funciones y asignar valores
  const sesion = await comprobarSesion();
  if (sesion) {
    const correo = await obtenerUsuario(sesion);
    if (correo) {
      const enlacePerfilHeader = document.getElementById("ir-a-perfil");
      if (enlacePerfilHeader) {
        const nuevoParametro = "?correo=" + encodeURIComponent(correo);
        enlacePerfilHeader.href += nuevoParametro;
      }
    }
  } else {
    console.warn("Sesión no encontrada o usuario no autenticado.");
  }

});
