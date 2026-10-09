//Configurar los event listeners

const botonBuscar = document.getElementById('btnBuscar');
const botonLimpiar = document.getElementById('btnLimpiar');

// buscar un Pokémon
botonBuscar.addEventListener('click', buscarPokemon);

async function buscarPokemon() {
    const inputPokemon = document.getElementById('inputPokemon');
    const nombre = inputPokemon.value.trim().toLowerCase();

    if (nombre !== "") {
        try {
            const pokemon = await obtenerPokemon(nombre);

            const resultadoBusqueda = document.getElementById('resultadoBusqueda');
            resultadoBusqueda.replaceChildren();

            const tarjeta = crearTarjeta(pokemon);
            resultadoBusqueda.append(tarjeta);

        } catch (error) {
            console.log("No fue posible encontrar el Pokémon, por favor intentelo de nuevo");
        }
    } else {
        console.log("No se ingresó ningún nombre");
    }
}

// limpiar los resultados
botonLimpiar.addEventListener('click', limpiarResultados);

function limpiarResultados() {
    document.getElementById('inputPokemon').value = "";
    document.getElementById('resultadoBusqueda').replaceChildren();
}
