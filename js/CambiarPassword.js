import { setAlerta } from "./components/alerta.js";

//Variables 
const pwdActual = document.getElementById('pwd_actual');
const pwdNuevo = document.getElementById('pwd_nuevo');

const pswFormulario = document.getElementById('psw_formulario');
pswFormulario.addEventListener('submit', cambiarPassword)


function cambiarPassword(e) {
    e.preventDefault();

    const password = {

        pwd_actual : pwdActual.value || '',
        pwd_nuevo : pwdNuevo.value || '',

    }

    if(Object.values(password).some(campo => campo === '')) {

        setAlerta('Todos los Campos son Obligatorios', true);
        return;

    };

    if(password.pwd_nuevo.length < 6) {
        setAlerta('El Password debe ser Minimo de 6 Caracteres', true);
        return;
    }
    guardarPassword(password);

}

const guardarPassword = async (datos) => {
    
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    try {
      const url = 'http://localhost:4000/api/veterinarios/actualizar-password';
      const { data } = await axios.put(url, datos,config);
      setAlerta(data.msg);
           
    } catch(error) {
      setAlerta(error.response.data.msg, true);
    }

}
