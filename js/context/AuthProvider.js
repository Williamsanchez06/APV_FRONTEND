import { setAlerta } from "../components/alerta.js";

const AuthProvider = async(children) => {

    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
            window.location = 'index.html';
            return;
        }

        try {

            const url = 'http://localhost:4000/api/veterinarios/perfil';

            await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                     Authorization: `Bearer ${token}`
                }
            }).then(response => response.json())
              .then(data => {pasaPerfil(data)}); //Data del usuario

        } catch(error) {
            console.log(console.log(error.response.data.msg));
        }

    }

    autenticarUsuario();
        
}

export default function cerrarSesionClick() {

    localStorage.removeItem('token');
    window.location = 'index.html';
    
}

function pasaPerfil(perfil) {

    window.location = `admin.html?id=${perfil.perfil._id}`;
}



export {
    AuthProvider,
}
