import { setAlerta } from "./components/alerta.js";

(function() {

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repetirPassword = document.getElementById('repetirPassword');

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', enviarFormulario);


async function enviarFormulario(e) {

    e.preventDefault();

    if(nombre.value === '' || email.value === '' || password.value === '' || repetirPassword.value === '') { 

        setAlerta('Hay Campos Vacios', true);
        return;

    }

    if(password.value !== repetirPassword.value) {

        setAlerta('Los passwords no son iguales', true);
        return;

    }

    if(password.length < 6){ 

        setAlerta('El password es muy corto, agrega minimo 6 caracteres', true);
        return;

    }

     try {
      
         const url = "http://localhost:4000/api/veterinarios"
         await axios.post(url, {
          nombre: nombre.value,
          email: email.value,
          password: password.value
         });

         setAlerta('Creado Correctamente, Revisa tu email',false);

       } catch (error) {

         setAlerta(error.response.data.msg, true);

       }


}

}());