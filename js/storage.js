const claveLocalStorage = "favoritos";

export function obtenerFavoritos() {
    const favoritosGuardados = localStorage.getItem(claveLocalStorage);
    if (favoritosGuardados) {
        return JSON.parse(favoritosGuardados);
    }
    return [];
}

export function guardarFavorito(pokemon) {
    const favoritos = obtenerFavoritos();
    
    // verificamos que el pokemon no este registrado todavia para evitar duplicados
    const yaExiste = favoritos.find(fav => fav.name === pokemon.name);
    
    if (yaExiste) return false
        favoritos.push(pokemon);
        localStorage.setItem(claveLocalStorage, JSON.stringify(favoritos));
        return true;
   
}
export function eliminarFavorito(nombre) {
    const favoritos = obtenerFavoritos();
    
    // Convertimos el parámetro a minúsculas una sola vez
    const nombreMinusc = nombre.toLowerCase();

    // Filtramos la lista en localStorage ignorando mayúsculas/minúsculas
    const nuevosFavoritos = favoritos.filter(fav => fav.name.toLowerCase() !== nombreMinusc);
    localStorage.setItem(claveLocalStorage, JSON.stringify(nuevosFavoritos));
    
    // Buscamos la tarjeta visual del pokemon comparando en minúsculas
    const tarjetas = document.querySelectorAll('.card');
    tarjetas.forEach(tarjeta => {
        const titulo = tarjeta.querySelector('.card-title');
        if (titulo && titulo.textContent.trim().toLowerCase() === nombreMinusc) {
            tarjeta.remove();
        }
    });
}
