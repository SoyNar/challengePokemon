// URL base de la PokéAPI para obtener información de un Pokémon por nombre o ID
const URL_API = 'https://pokeapi.co/api/v2/pokemon';

/**
 * Tarea 2: Consumir la PokéAPI
 * 1. Recibe el nombre del Pokémon como parámetro.
 * 2. Hace una petición a la PokéAPI usando fetch.
 * 3. Convierte la respuesta a JSON.
 * 4. Devuelve el objeto del Pokémon.
 * - Usa async/await para manejar la asincronía.
 * - Usa try/catch para manejar errores.
 * - Maneja el caso del error 404 si el Pokémon no existe.
 */
export async function obtenerPokemon(nombre) {
    try {
        if (!nombre) {
            throw new Error('Debe proporcionar el nombre de un Pokémon');
        }

        // Convertimos a minúsculas y eliminamos espacios en blanco
        const nombreFormateado = nombre.trim().toLowerCase();

        // Petición a la PokéAPI usando fetch
        const response = await fetch(`${URL_API}/${nombreFormateado}`);

        // Si el Pokémon no existe, la PokéAPI devuelve un código de estado 404
        if (response.status === 404) {
            throw new Error(`El Pokémon "${nombre}" no existe (Error 404)`);
        }

        // Validamos si ocurrió algún otro problema con la respuesta HTTP
        if (!response.ok) {
            throw new Error(`Error al consultar la PokéAPI: ${response.status}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();

        // Devolvemos el objeto del Pokémon
        return data;
    } catch (error) {
        console.error('Hubo un error al buscar el Pokémon:', error.message);
        return null;
    }
}

// Alias de exportación para flexibilidad en la nomenclatura
export const buscarPokemon = obtenerPokemon;

// Alias temporal para compatibilidad con main.js antes de avanzar a las siguientes tareas
export const buscarPersonajes = obtenerPokemon;
