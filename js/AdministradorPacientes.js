import { setAlerta } from "./components/alerta.js";
import cerrarSesionClick from "./context/AuthProvider.js";
import {
  guardarPaciente,
} from "./context/PacientesProvider.js";

const boton = document.getElementById("button");
const formulario = document.getElementById("formulario");

let distesClick = false;
boton.onclick = ocultarFormulario;

function ocultarFormulario() {
  if (distesClick) {
    distesClick = false;
    boton.textContent = "Ocultar Formulario";
    formulario.style.display = "block";
  } else {
    distesClick = true;
    boton.textContent = "Mostrar Formulario";
    formulario.style.display = "none";
  }
}

const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", cerrarSesionClick);


//Formulario
const nombreMascota = document.getElementById("mascota");
const nombrePropietario = document.getElementById("propietario");
const emailPropietario = document.getElementById("email");
const fechaAlta = document.getElementById("fecha");
const sintomas = document.getElementById("sintomas");

formulario.addEventListener("submit", enviarFormulario);

function enviarFormulario(e) {
  e.preventDefault();


  if (
    [
      nombreMascota.value,
      nombrePropietario.value,
      emailPropietario.value,
      fechaAlta.value,
      sintomas.value,
    ].includes("")
  ) {
    setAlerta("Todos los Campos son Obligatorios", true);
    return;
  }


  guardarPaciente({
    nombre: nombreMascota.value,
    propietario: nombrePropietario.value,
    email: emailPropietario.value,
    fecha: fechaAlta.value,
    sintomas: sintomas.value,
  });




}
