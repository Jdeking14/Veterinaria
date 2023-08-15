let pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
let identificacion = document.getElementById('identificacion');
const form = document.getElementById('form');
const guardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const listaduenos = document.getElementById('lista-duenos');

let paisNombre = pais;

let duenos = [
    { nombre: "Mario", 
      apellido: "Perez",
      pais: "Colombia",
      identificacion: "1234567890"
     },

      { nombre: "Diego", 
      apellido: "Velazquez",
      pais: "Colombia",
      identificacion: "1234567890" }

    ];

function listarduenos() {
  const htmlduenos = duenos.map(
    (dueno, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${dueno.identificacion}</td>
    <td>${dueno.pais}</td>
    <td>${dueno.nombre}</td>
    <td>${dueno.apellido}</td>
    <td><div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="fa-regular fa-trash-can"></i></button>
    </div></td>
  </tr>`
  ).join('\n');
  listaduenos.innerHTML = htmlduenos;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    var datos = new Array();
    const indicePais = pais.value;
    const accion = guardar.innerHTML;
    paisNombre = cambiaNombre(pais, indicePais);
      datos = {
        pais: paisNombre,
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value
      };

     switch (accion) {
      case 'Editar':
        duenos[indice.value] = datos;
        break;
      default:
        duenos.push(datos); 
        break;
     }
     
    
    listarduenos();
    resetModal();
    paisNombre = "";
}

function editar(index) {


 return function handler() {
    guardar.innerHTML = 'Editar';
    const dueno = duenos[index];
    nombre.value = dueno.nombre;
    console.log(dueno.pais);
    pais.value = compruebaIndices(pais, dueno.pais);
    indice.value = index;
    console.log(dueno);
    paisNombre = dueno.pais;
    apellido.value = dueno.apellido;
    identificacion.value = dueno.identificacion;
    
  }
}

function resetModal() {
  nombre.value = '';
  pais.value = ''
  identificacion.value = '';
  apellido.value = '';
  indice.value = '';
  guardar.innerHTML = 'Crear';
}

function eliminar(index) {
  return function clickEneliminar(){
  duenos = duenos.filter((jamonconchorizo, indicedueno)=>indicedueno !== index);
  listarduenos();
}

}



function compruebaIndices(elemento, duenoElement) {
  for (let i = 0; i < elemento.options.length; i++) {
    const element = elemento.options[i];
    if (element.innerHTML === duenoElement) {
      duenoElement = element.value;
    }
  }
  return duenoElement;
}

function cambiaNombre(elemento, indice) {
  return elemento.options[indice].innerText;
}

function nuevaAction(){
  resetModal();  
}

listarduenos();//Llama a esta funcion para cargar datos de la tabla al inicio



form.onsubmit = enviarDatos;
guardar.onclick = enviarDatos;