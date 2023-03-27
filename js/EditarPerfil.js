import { setAlerta } from "./components/alerta.js";

(function () {


const obtenerPerfil = async() => {
    const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

    try {
      const url = 'http://localhost:4000/api/veterinarios/perfil';
      const { data } = await axios(url, config)
      editarper(data);
           
    } catch(error) {

      console.log(error);
    }
}
obtenerPerfil();

//variables
const nombre = document.getElementsByName('nombre');
const sitioWeb = document.getElementsByName('web');
const telefono = document.getElementsByName('telefono');
const email = document.getElementsByName('email');
let id;

function editarper({perfil}) {

    nombre[0].value = perfil.nombre || '';
    sitioWeb[0].value = perfil.web || '';
    telefono[0].value = perfil.telefono || '';
    email[0].value = perfil.email || '';
    id = perfil._id;

}

const formulario = document.getElementById('formularioEditar');
formulario.addEventListener('submit', guardarCambios)

function guardarCambios(e) {
  e.preventDefault();

  if([nombre[0].value,email[0].value].includes('')) {
    
    setAlerta('Todos los Campos son Obligatorios', true);
    return;

  }

  const objeto = {
    nombre: nombre[0].value,
    email: email[0].value,
    telefono: telefono[0].value,
    web: sitioWeb[0].value,
    _id : id
  }

  actualizarPerfil(objeto);
}


const actualizarPerfil = async (perfil) => {

  const token = localStorage.getItem('token');

        if(!token) {
            window.location = 'index.html';
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


      try{
      const url = `http://localhost:4000/api/veterinarios/perfil/${perfil._id}`;
      const { data } = await axios.put(url, perfil, config);
      console.log(data);

      setAlerta('Actualizado Correctamente');
           
    } catch(error) {
      setAlerta(error.response.data.msg, true)
    }

}

})();