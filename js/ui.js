const cardContainer = document.getElementById('container');

 export function createCardHtml(character) {
  return `
    <div class="card shadow-sm rounded-4 overflow-hidden border-0 my-2" style="width: 13rem;">
      <!-- Imagen del Pokémon -->
      <div class="bg-light text-center p-2">
        <img src="${character.image}" 
             class="img-fluid" 
             alt="${character.name}" 
             style="max-height: 100px; object-fit: contain;">
      </div>

      <!-- Cuerpo con Nombre y Stats -->
      <div class="card-body p-2 text-center">
        <!-- Nombre -->
        <h6 class="card-title text-capitalize fw-bold mb-2 text-truncate">${character.name}</h6>

        <!-- Ataque y Defensa -->
        <div class="d-flex justify-content-around small mb-2 bg-body-tertiary p-1 rounded">
          <div>
            <span class="d-block text-muted extra-small" style="font-size: 0.7rem;">Ataque</span>
            <span class="fw-bold text-danger">${character.attack}</span>
          </div>
          <div class="border-end"></div>
          <div>
            <span class="d-block text-muted extra-small" style="font-size: 0.7rem;">Defensa</span>
            <span class="fw-bold text-primary">${character.defense}</span>
          </div>
        </div>
      </div>

      <!-- Botones de Acción -->
      <div class="card-footer bg-white border-0 p-2 pt-0 d-flex flex-column gap-1">
        <button class="btn btn-warning btn-sm w-100 fw-semibold py-1 d-flex align-items-center justify-content-center gap-1">
          <i class="bi bi-star-fill"></i> Agregar a favoritos
        </button>
        <button class="btn btn-outline-danger btn-sm w-100 fw-semibold py-1 d-flex align-items-center justify-content-center gap-1">
          <i class="bi bi-trash"></i> Eliminar
        </button>
      </div>
    </div>
  `;
}

export function showSpinner(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center my-3">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
}

export function showMessage(container, message, type = 'warning') {
  container.innerHTML = `
    <div class="alert alert-${type} py-2 small" role="alert">
      ${message}
    </div>`;
}