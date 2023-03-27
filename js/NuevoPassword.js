import { setAlerta } from "./components/alerta.js";

(function () {

  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  //Accedemos a los valores

  const token = urlParams.get("token");
  let tokenValido = false;
  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", enviarClave);

  const confirmarPassword = async () => {
    try {
      const url = `http://localhost:4000/api/veterinarios/olvide-password/${token}`;

      const { data } = await axios(url); //Ya tiene get por defecto
      tokenValido = true;
      setAlerta(data.msg);
    } catch (error) {
      setAlerta("Error al Confirmar la Cuenta", true);
    }
  };

  confirmarPassword();

  setTimeout(() => {

  if (tokenValido) {
    formulario.style.display = "block";
  } 

}, 700);
  // setTimeout(() => {

  //     if(tokenValido) {

  //         const inicioSesion = document.getElementById('inicio');
  //         inicioSesion.style.display = 'block';

  //     }

  // }, 800);

  const password = document.getElementById("password");

  async function enviarClave(e) {
    e.preventDefault();

    if (password.value === "") {
      setAlerta("El Campo Email esta Vacio", true);
      return;
    }

    try {
      const url = `http://localhost:4000/api/veterinarios/olvide-password/${token}`;
      const { data } = await axios.post(url, { password: password.value });
      formulario.style.display = "none";
      const inicioSesion = document.querySelector('#inicio');
      inicioSesion.classList.remove('hidden');
      inicioSesion.style.display = "block";
      
      setAlerta(data.msg);

    } catch (error) {
      setAlerta(error.response.data.msg, true);
      
    }

    
    

  }
})();
