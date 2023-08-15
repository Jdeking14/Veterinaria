let tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
let dueno = document.getElementById('dueno');
const form = document.getElementById('form');
const guardar = document.getElementById('guardar');
const indice = document.getElementById('indice');
const listaMascotas = document.getElementById('lista-mascotas');

let tipoNombre = tipo;
let duenoNombre = dueno;

let mascotas = [
    { tipo: "Gato", 
      nombre: "manchas", 
      dueno: "Estevan" },

      { tipo: "Perro", 
      nombre: "firulais", 
      dueno: "Julian" }

    ];

function listarMascotas() {
  const htmlMascotas = mascotas.map(
    (mascota, index) => `<tr>
    <th scope="row">${index}</th>
    <td>${mascota.tipo}</td>
    <td>${mascota.nombre}</td>
    <td>${mascota.dueno}</td>
    <td><div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i></button>
      <button type="button" class="btn btn-danger eliminar"><i class="fa-regular fa-trash-can"></i></button>
    </div></td>
  </tr>`
  ).join('\n');
  listaMascotas.innerHTML = htmlMascotas;
  Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
  Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    var datos = new Array();
    const indicedueno = dueno.value;
    const indicetipo = tipo.value;
    const accion = guardar.innerHTML;
    duenoNombre = cambiaNombre(dueno, indicedueno);

    tipoNombre = cambiaNombre(tipo, indicetipo); 
      datos = {
        tipo: tipoNombre,
        nombre: nombre.value,
        dueno: duenoNombre,
      };

     switch (accion) {
      case 'Editar':
        mascotas[indice.value] = datos;
        break;
      default:
        mascotas.push(datos); 
        break;
     }
     
    
    listarMascotas();
    resetModal();
    tipoNombre = "";
    duenoNombre = "";
}

function editar(index) {


 return function handler() {
    guardar.innerHTML = 'Editar';
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = compruebaIndices(dueno, mascota.dueno);
    tipo.value = compruebaIndices(tipo, mascota.tipo);
    indice.value = index;
    console.log(mascota);
    tipoNombre = mascota.tipo;
    duenoNombre = mascota.dueno;
    console.log(tipoNombre);
    
  }
}

function resetModal() {
  nombre.value = '';
  dueno.value = ''
  tipo.value = '';
  indice.value = '';
  guardar.innerHTML = 'Crear';
}

function eliminar(index) {
  return function clickEneliminar(){
  mascotas = mascotas.filter((jamonconchorizo, indiceMascota)=>indiceMascota !== index);
  listarMascotas();
}

}



function compruebaIndices(elemento, mascotaElement) {
  for (let i = 0; i < elemento.options.length; i++) {
    const element = elemento.options[i];
    if (element.innerHTML === mascotaElement) {
      mascotaElement = element.value;
    }
  }
  return mascotaElement;
}

function cambiaNombre(elemento, indice) {
  return elemento.options[indice].innerText;
}

function nuevaAction(){
  resetModal();  
}

listarMascotas();//Llama a esta funcion para cargar datos de la tabla al inicio


form.onsubmit = enviarDatos;
guardar.onclick = enviarDatos;