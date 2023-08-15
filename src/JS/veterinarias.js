let pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
let identificacion = document.getElementById('identificacion');
const form = document.getElementById('form');
const guardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const listaVeterinarias = document.getElementById('lista-veterinarias');

let paisNombre = pais;

let veterinarias = [
    { nombre: "Mario", 
      apellido: "Perez",
      pais: "Colombia",
      identificacion: "1234567890"
     },

      { nombre: "Juan", 
      apellido: "Vazquez",
      pais: "Colombia",
      identificacion: "1234567890" }

    ];

function listarVeterinarias() {
  const htmlVeterinarias = veterinarias.map(
    (veterinaria, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${veterinaria.identificacion}</td>
    <td>${veterinaria.pais}</td>
    <td>${veterinaria.nombre}</td>
    <td>${veterinaria.apellido}</td>
    <td><div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="fa-regular fa-trash-can"></i></button>
    </div></td>
  </tr>`
  ).join('\n');
  listaVeterinarias.innerHTML = htmlVeterinarias;
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
        veterinarias[indice.value] = datos;
        break;
      default:
        veterinarias.push(datos); 
        break;
     }
     
    
    listarVeterinarias();
    resetModal();
    paisNombre = "";
}

function editar(index) {


 return function handler() {
    guardar.innerHTML = 'Editar';
    const veterinaria = veterinarias[index];
    nombre.value = veterinaria.nombre;
    console.log(veterinaria.pais);
    pais.value = compruebaIndices(pais, veterinaria.pais);
    indice.value = index;
    console.log(veterinaria);
    paisNombre = veterinaria.pais;
    apellido.value = veterinaria.apellido;
    identificacion.value = veterinaria.identificacion;
    
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
  veterinarias = veterinarias.filter((jamonconchorizo, indiceVeterinaria)=>indiceVeterinaria !== index);
  listarVeterinarias();
}

}



function compruebaIndices(elemento, veterinariaElement) {
  for (let i = 0; i < elemento.options.length; i++) {
    const element = elemento.options[i];
    if (element.innerHTML === veterinariaElement) {
      veterinariaElement = element.value;
    }
  }
  return veterinariaElement;
}

function cambiaNombre(elemento, indice) {
  return elemento.options[indice].innerText;
}

function nuevaAction(){
  resetModal();  
}

listarVeterinarias();//Llama a esta funcion para cargar datos de la tabla al inicio



form.onsubmit = enviarDatos;
guardar.onclick = enviarDatos;