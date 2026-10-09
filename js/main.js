import { obtenerPokemon } from './api.js';
import { createCardHtml, showSpinner, showMessage } from './ui.js';
import {
  configurarEventoBuscar,
  configurarEventoLimpiar,
  obtenerTextoBusqueda,
  limpiarInputBusqueda
} from './events.js';
import { guardarFavorito, obtenerFavoritos, eliminarFavorito } from './storage.js';

const searchResult = document.getElementById('resultadoBusqueda');
const favoritesList = document.getElementById('listaFavoritos');

// Guarda el último Pokémon buscado para que "agregar" sepa cuál guardar
let currentPokemon = null;

document.addEventListener('DOMContentLoaded', () => {
  configurarEventoBuscar(manageSearch);
  configurarEventoLimpiar(manageClear);
  renderFavorites();

  // Delegación: clic en el botón de agregar dentro de la búsqueda
  searchResult.addEventListener('click', (e) => {
    if (e.target.closest('.btn-add-fav')) addToFavorites();
  });

  // Delegación: clic en el botón de eliminar dentro de favoritos
  favoritesList.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;

    const card = btn.closest('.card');
    const name = card?.querySelector('.card-title')?.textContent.trim();
    if (name) removeFromFavorites(name);
  });
});

// Trae los datos y devuelve solo lo necesario para la card
async function searchPokemon(name) {
  const data = await obtenerPokemon(name);
  if (!data) return null;

  return {
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    attack: data.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0,
    defense: data.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0,
  };
}

async function manageSearch() {
  const name = obtenerTextoBusqueda();
  if (!name) {
    showMessage(searchResult, 'Por favor ingresa un nombre de Pokémon.', 'warning');
    return;
  }

  showSpinner(searchResult);
  currentPokemon = await searchPokemon(name);

  if (!currentPokemon) {
    showMessage(searchResult, 'No se encontró el Pokémon especificado.', 'danger');
    return;
  }
  searchResult.innerHTML = createCardHtml(currentPokemon);
}

function manageClear() {
  limpiarInputBusqueda();
  searchResult.innerHTML = '';
  currentPokemon = null;
}

function addToFavorites() {
  if (!currentPokemon) return;

  const saved = guardarFavorito(currentPokemon);

  if (saved) {
    renderFavorites();
    searchResult.innerHTML = '';  
    currentPokemon = null;
  } else {
    alert(`"${currentPokemon.name}" ya está en tus favoritos.`);
  }
}

function removeFromFavorites(name) {
  eliminarFavorito(name);
  renderFavorites();
}

function renderFavorites() {
  const favorites = obtenerFavoritos();

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p>No tienes Pokémon favoritos guardados.</p>';
    return;
  }

  favoritesList.innerHTML = `
    <div class="d-flex flex-wrap gap-2">
      ${favorites.map((fav) => createCardHtml(fav)).join('')}
    </div>
  `;
}