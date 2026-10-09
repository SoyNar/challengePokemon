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
    
    if (yaExiste) return false;

         favoritos.push(pokemon);
        localStorage.setItem(claveLocalStorage, JSON.stringify(favoritos));
        return true;    
       
}

export function eliminarFavorito(nombre) {
    const favoritos = obtenerFavoritos();
    
    // filtramos la lista para dejar fuera al pokemon que queremos borrar
    const nuevosFavoritos = favoritos.filter(fav => fav.name !== nombre);
    
    localStorage.setItem(claveLocalStorage, JSON.stringify(nuevosFavoritos));
    
    // buscamos la tarjeta visual del pokemon para quitarla de la pantalla
    // const tarjetas = document.querySelectorAll('.card');
    // tarjetas.forEach(tarjeta => {
    //     const titulo = tarjeta.querySelector('.card-title');
    //     if (titulo && titulo.textContent === nombre) {
    //         tarjeta.remove();
    //     }
    // });
}
