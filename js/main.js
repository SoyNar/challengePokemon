import { obtenerPokemon } from './api.js';
import { createCardHtml, showSpinner, showMessage } from './ui.js';
import { renderizarFavoritos } from './favoritos.js';
// 1. Declaramos la variable en el scope global del módulo
const searchResult = document.getElementById('resultadoBusqueda');

document.addEventListener('DOMContentLoaded', () => {
  renderPokemonCard('pikachu');
  renderizarFavoritos();
});

/**
 * Carga la información de la PokéAPI y renderiza la card en el DOM
 */
async function renderPokemonCard(pokemonName) {
  if (!searchResult) {
    console.error('El contenedor #resultadoBusqueda no existe en el HTML');
    return;
  }

  showSpinner(searchResult);
  const pokemonData = await obtenerPokemon(pokemonName);
  if (!pokemonData) {
    showMessage(searchResult, 'No se encontró el Pokémon especificado.', 'danger');
    return;
  }

  // Extraemos únicamente los campos necesarios para la card
  const character = {
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
    attack: pokemonData.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0,
    defense: pokemonData.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0,
  };

  // Asignamos el HTML generado al contenedor
  searchResult.innerHTML = createCardHtml(character);
}