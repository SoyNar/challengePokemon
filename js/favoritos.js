import { obtenerFavoritos } from './storage.js';
  import { createCardHtml } from './ui.js';

 export function renderizarFavoritos(){

  
  const contenedor=document.getElementById('listaFavoritos');
const favoritos=obtenerFavoritos();
contenedor.innerHTML='';
favoritos.forEach(pokemon => { contenedor.innerHTML += createCardHtml(pokemon);
    
});}