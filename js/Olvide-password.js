import { setAlerta } from "./components/alerta.js";

(function () {
  const email = document.getElementById("email");
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", enviarFormulario);

  async function enviarFormulario(e) {
    e.preventDefault();

    if (email.value === "") {
      setAlerta("Campo Obligatorio", true);
      return;
    }

    try {
      const url = "http://localhost:4000/api/veterinarios/olvide-password";
      await axios.post(url, {
        email: email.value,
      });

      setAlerta("Se ha Enviado las Instrucciones al Correo");
    } catch (error) {
      setAlerta(error.response.data.msg, true);
    }
  }
})();
