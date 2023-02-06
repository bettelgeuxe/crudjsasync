import { clientServices } from "../service/client-service.js";

const crearNuevaLinea = (nombre,email,id) => {
  console.log(id)
    const linea = document.createElement("tr"); //tr apertura y cierre
    const contenido = `
            <td class="td" data-td>${nombre}</td>
            <td>${email}</td>
            <td>
              <ul class="table__button-control">
                <li>
                  <a
                    href="../screens/editar_cliente.html?id=${id}"
                    class="simple-button simple-button--edit"
                    >Editar</a
                  >
                </li>
                <li>
                  <button
                    class="simple-button simple-button--delete"
                    type="button" id="${id}"
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </td>
            `;
            linea.innerHTML = contenido;
            const btn = linea.querySelector("button");
            btn.addEventListener("click", () => {
              const id = btn.id;
              clientServices.eliminarCliente(id)
              .then(respuesta => {
                console.log(respuesta);
              })
              .catch((err) => alert('Ocurrió un error'));
            });
            return linea;
};

const table = document.querySelector("[data-table]");

clientServices
.listaClientes()
    .then((data) => {
        //data.forEach( perfil => { se reemolaza con:
        data.forEach(({ nombre, email, id }) => {
            //const nuevaLinea = crearNuevaLinea(perfil.nombre,perfil.email); se reemplaza
            const nuevaLinea = crearNuevaLinea(nombre,email,id);
            table.appendChild(nuevaLinea);
    });
}) 
.catch((error) => alert("Ocurrión un error"));


/*
const http = new XMLHttpRequest();
//abrir http recibe dos parámetros método y parámetro
http.open("GET","http://localhost:3000/perfil");

//enviar la petición del navegador o proyecto hacia el servidor de la url
http.send();

//mostrar el resultado al cargar la página
http.onload = () => {
    const data = JSON.parse(http.response);
    console.log(data);
    
};

*/