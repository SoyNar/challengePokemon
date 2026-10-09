// js/main.js

import { obtenerPokemon } from './api.js';
import { createCardHtml, showSpinner, showMessage } from './ui.js';
import { 
  configurarEventoBuscar, 
  configurarEventoLimpiar, 
  obtenerTextoBusqueda, 
  limpiarInputBusqueda 
} from './events.js';
import { 
  guardarFavorito, 
  obtenerFavoritos, 
  eliminarFavorito 
} from './storage.js';

const searchResult = document.getElementById('resultadoBusqueda');
const listaFavoritos = document.getElementById('listaFavoritos');

// Variable para guardar temporalmente el último Pokémon buscado
let pokemonActual = null;

document.addEventListener('DOMContentLoaded', () => {
  configurarEventoBuscar(manejarBusqueda);
  configurarEventoLimpiar(manejarLimpieza);

  // Tarea 5: Renderizar favoritos al cargar la página
  actualizarVistaFavoritos();

  // Delegación de eventos para los botones de la card en la búsqueda
  if (searchResult) {
    searchResult.addEventListener('click', (e) => {
      if (e.target.closest('.btn-add-fav')) {
        manejarAgregarFavorito();
      }
      if (e.target.closest('.btn-delete')) {
        searchResult.innerHTML = '';
        pokemonActual = null;
      }
    });
  }

  // Delegación de eventos para eliminar desde la sección de Favoritos
  if (listaFavoritos) {
    listaFavoritos.addEventListener('click', (e) => {
      const btnEliminar = e.target.closest('.btn-delete');
      if (!btnEliminar) return;
      const card = btnEliminar.closest('.card');
      if (!card) return;
       const nombre = card.dataset.name || card.querySelector('.card-title')?.textContent.trim();
      if (nombre) {
        eliminarFavorito(nombre);
        actualizarVistaFavoritos();
      }
    });
  }
});

async function manejarBusqueda() {
  const nombre = obtenerTextoBusqueda();

  if (!nombre) {
    showMessage(searchResult, 'Por favor, ingresa el nombre de un Pokémon.');
    return;
  }

  showSpinner(searchResult);

  const pokemonData = await obtenerPokemon(nombre);

  if (!pokemonData) {
    showMessage(searchResult, `No se encontró el Pokémon "${nombre}".`, 'danger');
    pokemonActual = null;
    return;
  }

  pokemonActual = {
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
    attack: pokemonData.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0,
    defense: pokemonData.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0,
  };

  searchResult.innerHTML = createCardHtml(pokemonActual);
}

function manejarLimpieza() {
  limpiarInputBusqueda();
  if (searchResult) {
    searchResult.innerHTML = '';
    pokemonActual = null;
  }
}

function manejarAgregarFavorito() {
  if (!pokemonActual) return;

  const exito = guardarFavorito(pokemonActual);

  if (exito) {
    actualizarVistaFavoritos();
  } else {
    alert(`El Pokémon "${pokemonActual.name}" ya está en tus favoritos.`);
  }
}

function actualizarVistaFavoritos() {
  const favoritos = obtenerFavoritos();
  if (!listaFavoritos) return;

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = '<p class="text-muted small">No tienes Pokémon favoritos guardados.</p>';
    return;
  }

  listaFavoritos.innerHTML = `
    <div class="d-flex flex-wrap gap-2">
      ${favoritos.map((fav) => createCardHtml(fav)).join('')}
    </div>
  `;
}