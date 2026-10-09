//En este archivo encontrarian la version de todo el codigo JS en 1 solo archivo. 

// ==========================================
// Tarea 2: Consumir la PokéAPI
// ==========================================
/**
 * 1. Recibe el nombre del Pokémon como parámetro.
 * 2. Hace una petición a la PokéAPI usando fetch.
 * 3. Convierte la respuesta a JSON.
 * 4. Devuelve el objeto del Pokémon.
 * - Usa async/await para manejar la asincronía.
 * - Usa try/catch para manejar errores.
 * - Si el Pokémon no existe (error 404), maneja el caso.
 */
async function obtenerPokemon(nombre) {
    try {
        if (!nombre) {
            throw new Error('Debe proporcionar el nombre de un Pokémon');
        }

        const nombreFormateado = nombre.trim().toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreFormateado}`);

        // Manejo del caso 404 (Pokémon no existe)
        if (response.status === 404) {
            throw new Error(`El Pokémon "${nombre}" no existe (Error 404)`);
        }

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Hubo un error al buscar el Pokémon:', error.message);
        return null;
    }
}

const buscarPokemon = obtenerPokemon;
const buscarPersonajes = obtenerPokemon;


function crearTarjetas(InformacionDePersonajes) {
    const containerTarjetas = document.querySelector('.container-tarjetas');
    //Cuando usas for...of, la variable personaje YA ES el objeto del personaje real (es decir, ya contiene a Homero, Marge, etc.). 
    // No es un número, no es un índice; es el objeto completo.

    //const data = fetch

    for (let personaje of InformacionDePersonajes) {
        let tarjeta = document.createElement('div');
        tarjeta.innerHTML = `
        <div class="simpson-tarjeta">
            <img src="https://cdn.thesimpsonsapi.com/200${personaje.portrait_path}" alt="imagen${personaje.name}">
            <p class="nombre">${personaje.name}</p>
            <p class="ocupacion">${personaje.occupation}</p>
            <p class="frase">"${personaje.phrases.length != 0 ? personaje.phrases[0] : 'Sin frase'}"</p>
        </div>`
        containerTarjetas.append(tarjeta)

    }
    /*
        El operador ternario es un if / else en una sola línea que sí devuelve un valor inmediato, por lo que es perfecto para usar dentro de HTML dinámico.

        Su estructura es: Condición ? Si es verdadero : Si es falso
    */
}

//Lista Global
//Tienes que usar await para llamar a la función porque cualquier función que declares con la palabra async automáticamente se convierte en una Promesa.
//Como estás en la raíz de tu archivo(fuera de cualquier función), necesitas usar algo llamado Top - Level Await(usar await directamente en el archivo).
//Para que tu navegador te permita hacer esto, tu archivo HTML debe tener el script guardado como un módulo(añadiendo type = "module"), lo cual además es una excelente práctica.

const listaPersonajes = await buscarPersonajes();




//mostramos la lista por consola para ir revisando el contenido del array 
//console.log('mostrar lista: ', listaPersonajes);

crearTarjetas(listaPersonajes);




const botonBuscar = document.getElementById('boton-buscar');

//Si pones los paréntesis (), la función se ejecuta INMEDIATAMENTE al cargar la página. Si NO los pones, le estás pasando la 
// función como un "paquete" al botón para que él la ejecute después, solo cuando alguien haga clic.
botonBuscar.addEventListener('click', buscarPersonaje);


//Esta funcion no la escribo hasta que llegue a la parte de buscar y la debo colocar arriva como 3ra funcion
function buscarPersonaje() {
   
    const inputBusqueda = document.getElementById('nombre-personaje');
    
    //Control para saber si se ejecuto la funcion del evento
    console.log("se ejecuto el evento correctamente");
    
    console.log(inputBusqueda.value);
    
    //Guardo el texto limpio y en minusculas
    const textoIngresado = inputBusqueda.value.trim().toLowerCase();
    if (textoIngresado != "") {
        /*
            Usando Optional Chaining (?.) (La más rápida 🌟)
            El signo ?. le dice a JavaScript: "Si name existe, continúa con el toLowerCase(). Si es undefined o null, detente ahí y no rompas el código".
         */
    
            //La explicacion la dejo al final del archivo en Obsidian
            const personajesEncontrados = listaPersonajes.filter(personaje => 
            personaje.name?.toLowerCase().includes(textoIngresado));
    
            //console.log(personajesEncontrados);
    
            CrearTarjetaPersonajeEncontrado(personajesEncontrados);
    }else{
        console.log("No se ingreso ningun nombre de personaje");
    }

}

function CrearTarjetaPersonajeEncontrado(listaParaBuscar){
    const containerResultadosBusqueda = document.getElementById('container-tarjetas-busqueda');

    for(let personaje of listaParaBuscar){
        const tarjeta = document.createElement('div');
        tarjeta.innerHTML = `
        <div class="simpson-tarjeta-busqueda">
            <img src="https://cdn.thesimpsonsapi.com/200${personaje.portrait_path}" alt="imagen${personaje.name}">
            <p class="nombre">${personaje.name}</p>
            <p class="ocupacion">${personaje.occupation}</p>
            <p class="frase">"${personaje.phrases.length != 0 ? personaje.phrases[0] : 'Sin frase'}"</p>
        </div>`
        containerResultadosBusqueda.append(tarjeta);
    }
}    
const botonBorrarResultado = document.getElementById('boton-borrar-resultados');

botonBorrarResultado.addEventListener('click',limpiarResultados);


function limpiarResultados(){

    const listaTarjetasDeBusqueda = document.querySelectorAll('.simpson-tarjeta-busqueda');

    console.log(listaTarjetasDeBusqueda);
     
    const containerTarjetasEncontradas = document.querySelector('#container-tarjetas-busqueda');

    listaTarjetasDeBusqueda.forEach(tarjeta => {
        tarjeta.remove();
    });

}

/*

const urlAPI = document.main.createElement('a');
urlAPI.innerText = "URL DE API";
urlAPI.href = "https://thesimpsonsapi.com/#docs";
*/