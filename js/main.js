import { buscarPersonajes } from "./api.js";
import { 
    renderizarTodosLosPersonajes, 
    renderizarPersonajesEncontrados,
limpiarResultadosBusqueda } from "./dom.js";

import { 
    configurarEventoBuscar,
    configurarEventoLimpiar,
    obtenerTextoBusqueda,
    limpiarInputBusqueda} from "./events.js";

import { filtrarPersonajesPorNombre } from "./utils.js";

let listaPersonajes = [];

function manejarBusqueda(){
    const textoIngresado = obtenerTextoBusqueda();

    if(textoIngresado === ''){
        console.log('No se ingreso un nombre de personaje');
        return;        
    }

    const personajesEncontrados = filtrarPersonajesPorNombre(listaPersonajes, textoIngresado);
    
    renderizarPersonajesEncontrados(personajesEncontrados);
}


function manejarLimpiar(){
    limpiarResultadosBusqueda();
    limpiarInputBusqueda();
}

async function inicializar() {
    listaPersonajes = await buscarPersonajes();
    
    console.log('Lista de personajes: ', listaPersonajes);

    renderizarTodosLosPersonajes(listaPersonajes);

    configurarEventoBuscar(manejarBusqueda);
    configurarEventoLimpiar(manejarLimpiar);
    
}

inicializar();