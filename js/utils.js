export function filtrarPersonajesPorNombre(listaPersonajes, textoIngresado){
    return listaPersonajes.filter(personaje => 
        personaje.name?.toLowerCase().includes(textoIngresado)
    );
}