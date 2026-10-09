const botonBuscar = document.getElementById('boton-buscar');
const botonBorrarResultado = document.getElementById('boton-borrar-resultados');
const inputBusqueda = document.getElementById('nombre-personaje');

export function configurarEventoBuscar(callback){
    botonBuscar.addEventListener('click', callback);
}

export function configurarEventoLimpiar(callback){
    botonBorrarResultado.addEventListener('click', callback)
}

export function obtenerTextoBusqueda(){
    return inputBusqueda.value.trim().toLowerCase();
}

export function limpiarInputBusqueda(){
    inputBusqueda.value = '';
}