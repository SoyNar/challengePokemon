const URL_API = 'https://thesimpsonsapi.com/api';

export async function buscarPersonajes() {
    try {
        const response = await fetch(URL_API);

        if (!response.ok) throw new Error('Error al conectar con la API');

       const data = await response.json()

       const responsePersonajes = await fetch(data.characters);

       if(!responsePersonajes.ok) throw new Error('Error al buscar los personajes');

        const listaPersonajes = await responsePersonajes.json();

        return listaPersonajes.results;
        
       
    } catch (error) { 
        console.log('Hubo un error al buscar los personajes: ', error.message);
        return [];
    }
}
