import pacientes from "../components/pacientes.js";
import { setAlerta } from "../components/alerta.js";

const obtenerPacientes = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const url = "http://localhost:4000/api/pacientes";

    const { data } = await axios(url, config);
    pacientes(data);

  } catch (error) {
    console.log(error.response);
  }
};

obtenerPacientes();

let id = null;

function returnId() {
  id = localStorage.getItem('id');
  localStorage.removeItem('id');
}



export const guardarPaciente = async (paciente) => {

  console.log(paciente);

  const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

   if(id) {  

    try {
      const url = `http://localhost:4000/api/pacientes/${id}`;
      const { data } = await axios.put(url, paciente, config)
      console.log(data);
      setAlerta('Paciente Actualizado Correctamente', false);
      setTimeout(() => {
      window.location.reload();        
      }, 3000);
      
    } catch (error) {

      console.log(error);

    }
  
  } else {
    try {
      
  
      const url = "http://localhost:4000/api/pacientes";
  
      const { data } = await axios.post(url, paciente, config);
  
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; //Crea un objetoi sin los valores anteriores
      console.log(pacienteAlmacenado);
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  }

  return;


  
};



const setEdicion = (paciente) => {

  const fecha = new Date(paciente.fecha)  
  const opciones = { year: 'numeric', month: 'numeric', day: 'numeric'}


    document.getElementById("mascota").value = paciente.nombre;
    document.getElementById("propietario").value = paciente.propietario;
    document.getElementById("email").value = paciente.email;
    document.getElementById("fecha").value = fecha.toLocaleDateString('es-co', opciones).split('/').reverse().join('-');
    document.getElementById("sintomas").value = paciente.sintomas;

    document.getElementById("agregarPacientebtn").value = 'Guardar Cambios';

    const id = paciente._id;
    localStorage.setItem('id', id);
    returnId();
    

}

const eliminarPaciente =  id => {
  
  Swal.fire({
    title: 'Estas Seguro de Eliminar el Paciente?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Si',
    denyButtonText: `No`,
  }).then(async result => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {

        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const url = `http://localhost:4000/api/pacientes/${id}`;
        const { data } = await axios.delete(url, config);
        console.log(data);

      } catch (error) {
        console.log(error.response);
      }

      Swal.fire('Paciente Eliminado Correctamente!', '', 'success');

      const buttonOk = document.querySelector('.swal2-confirm');
      buttonOk.onclick = () => { 
        
        setTimeout(() => {
          window.location.reload();
        }, 500);
      
      }

    } else if (result.isDenied) {
      Swal.fire('Los Cambios no se Guardaron', '', 'info')
    }
  })

}


export { obtenerPacientes,setEdicion, eliminarPaciente };
