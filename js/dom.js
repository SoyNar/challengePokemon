const containerTarjetas = document.querySelector('.container-tarjetas');

const containerResultadosBusqueda = document.getElementById('container-tarjetas-busqueda');

function crearHTMLTarjeta(personaje){
    const frase = personaje.phrases.length !== 0 
    ? personaje.phrases[0] 
    : 'Sin Frase';


    return `
    <div class="simpson-tarjeta">
                    <img src="https://cdn.thesimpsonsapi.com/200${personaje.portrait_path}" 
                    alt="imagen de personaje ${personaje.name}">
                    <p class="nombre">${personaje.name}</p>
                    <p class="ocupacion">${personaje.occupation}</p>
                    <p class="frase">${frase}</p>
                </div>
    `

}

export function renderizarTodosLosPersonajes(listaPersonajes){
    for(let personaje of listaPersonajes){
        const tarjeta = document.createElement('div');

        tarjeta.innerHTML = crearHTMLTarjeta(personaje);

        containerTarjetas.append(tarjeta);
    }
}

export function renderizarPersonajesEncontrados(listaPersonajes){

    for( let personaje of listaPersonajes){

        const tarjeta = document.createElement('div');

        tarjeta.innerHTML = crearHTMLTarjeta(personaje).replace(
            'simpson-tarjeta',
            'simpson-tarjeta-busqueda'
        );

        containerResultadosBusqueda.append(tarjeta);
    }

}

export function limpiarResultadosBusqueda(){
    const listaTarjetasDeBusqueda = document.querySelectorAll('.simpson-tarjeta-busqueda');

    listaTarjetasDeBusqueda.forEach(tarjeta => {
        tarjeta.remove();
    });
}