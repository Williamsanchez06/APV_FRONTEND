import { setEdicion, eliminarPaciente } from "../context/PacientesProvider.js";

export default function pacientes(pacientes) {
  const listadoPacientes = document.getElementById("pacientes");
  const html = document.createElement("div");

    console.log([pacientes].length <= 1);

  if (pacientes) {
    html.innerHTML = `
        <h1 class="font-black text-3xl text-center">Listado Pacientes</h1>
        <h2 class="text-xl mt-5 mb-10 text-center">Administra tus <span class="text-indigo-600 font-bold">Pacientes y Citas</span></h2>
        `;

    listadoPacientes.appendChild(html);
  } else if([pacientes].length <= 1 == true) {
    html.innerHTML = `
        <h1 class="font-black text-3xl text-center">No hay pacientes</h1>
        <h2 class="text-xl mt-5 mb-10 text-center">Comienza agregando Pacientes
        <span class="text-indigo-600 font-bold">y apareceran en este lugar</span></h2>
        `;

    listadoPacientes.appendChild(html);
  }

  pacientes.map((paciente) => {
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha);
      return new Intl.DateTimeFormat("es-CO", { dateStyle: "long" }).format(
        nuevaFecha
      );
    };

    const div = document.createElement("div");
    div.classList.add(
      "my-10",
      "mx-5",
      "bg-white",
      "shadow-md",
      "px-5",
      "py-10",
      "rounded-xl"
    );
    div.innerHTML = `
        <p class="font-bold uppercase text-indigo-600 my-2">Nombre:
            <span class="font-normal normal-case text-black">${nombre} </span>
        </p>

        <p class="font-bold uppercase text-indigo-600 my-2">Propietario:
            <span class="font-normal normal-case text-black">${propietario} </span>
        </p>

        <p class="font-bold uppercase text-indigo-600 my-2">Email Contacto :
            <span class="font-normal normal-case text-black">${email} </span>
        </p>

        <p class="font-bold uppercase text-indigo-600 my-2">Fecha de Alta:
            <span class="font-normal normal-case text-black">${formatearFecha(
              fecha
            )} </span>
        </p>

        <p class="font-bold uppercase text-indigo-600 my-2">Sintomas:
            <span class="font-normal normal-case text-black">${sintomas} </span>
        </p>
        
        `;
    const divBtn = document.createElement("div");
    divBtn.classList.add("flex", "justify-between", "my-5");

    const buttonEditar = document.createElement("button");
    buttonEditar.classList.add(
      "py-2",
      "px-10",
      "bg-indigo-600",
      "hover:bg-indigo-700",
      "text-white",
      "uppercase",
      "font-bold",
      "rounded-lg"
    );
    buttonEditar.textContent = "Editar";
    buttonEditar.onclick = () => setEdicion(paciente);

    const buttonEliminar = document.createElement("button");
    buttonEliminar.classList.add(
      "py-2",
      "px-10",
      "bg-red-600",
      "hover:bg-red-700",
      "text-white",
      "uppercase",
      "font-bold",
      "rounded-lg"
    );
    buttonEliminar.textContent = "Eliminar";
    buttonEliminar.onclick = () => eliminarPaciente(paciente._id);

    divBtn.appendChild(buttonEditar);
    divBtn.appendChild(buttonEliminar);
    div.appendChild(divBtn);

    listadoPacientes.appendChild(div);
  });
}
