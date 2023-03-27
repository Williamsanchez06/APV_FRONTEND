import { setAlerta } from "./components/alerta.js";

(function () {
  const valores = window.location.search;
  const urlParams = new URLSearchParams(valores);
  //Accedemos a los valores

  const token = urlParams.get("token");

  let setCuentaConfirmada = false;

  const comprobarToken = async () => {
    try {
      const url = `http://localhost:4000/api/veterinarios/confirmar/${token}`;

      const { data } = await axios(url); //Ya  tiene get por defecto
      setCuentaConfirmada = true;
      setAlerta(data.msg);
    } catch (error) {
      setAlerta("Error al Confirmar la Cuenta", true);
    }
  };

  comprobarToken();

  setTimeout(() => {
    if (setCuentaConfirmada) {
      const inicioSesion = document.getElementById("inicio");
      inicioSesion.style.display = "block";
    }
  }, 800);
})();
