const botonBuscar = document.getElementById('btnBuscar');
const botonBorrarResultado = document.getElementById('btnLimpiar');
const inputBusqueda = document.getElementById('inputPokemon');

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