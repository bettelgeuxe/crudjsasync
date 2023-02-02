const crearNuevaLinea = (nombre,email) => {
    const linea = document.createElement("tr"); //tr apertura y cierre
    

    const contenido = `
            <td class="td" data-td>${nombre}</td>
            <td>${email}</td>
            <td>
              <ul class="table__button-control">
                <li>
                  <a
                    href="../screens/editar_cliente.html"
                    class="simple-button simple-button--edit"
                    >Editar</a
                  >
                </li>
                <li>
                  <button
                    class="simple-button simple-button--delete"
                    type="button"
                  >
                    Eliminar
                  </button>
                </li>
              </ul>
            </td>
            `;
            linea.innerHTML = contenido;
            return linea;
};

const table = document.querySelector("[data-table]");

//CRUD
//promises
//llamar funcion lista de clientes
const listaClientes = () =>{
    //recibe una funcion, resolver y rechazar funcion async que no espera respuesta para continuar ejecución
    const promise = new Promise((resolve,reject) =>{
        //lo que estaba en la parte inferior se pasa acá
        //conexión a back
        const http = new XMLHttpRequest();
        //abrir conexión
        http.open("GET","http://localhost:3000/perfil");
        //enviar petición
        http.send();
        //ejecutar
        http.onload = () => {
            //crear const para el json
            const response = JSON.parse(http.response);
            //verificar status si es mayor hay un error
            if(http.status >= 400){
                //se informa que hay un error
                reject(response);
            }else{
                //se ejecuta
                resolve(response);
            }
        };
    });
    return promise;
};

//Fetch API
listaClientes()
    .then((data) => {
        data.forEach( perfil => {
            const nuevaLinea = crearNuevaLinea(perfil.nombre,perfil.email);
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