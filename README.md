# Laboratorio Pokédex con Favoritos

Aplicación web que consume la [PokéAPI](https://pokeapi.co/) para buscar Pokémon por nombre, mostrarlos en tarjetas y guardar favoritos en `localStorage`, de modo que persistan entre sesiones.

## Objetivo

Construir una Pokédex con HTML, CSS y JavaScript puro (sin frameworks) que permita:

- Buscar un Pokémon por nombre.
- Ver su imagen, nombre, ataque y defensa en una tarjeta.
- Agregar Pokémon a favoritos y conservarlos al recargar la página.
- Eliminar favoritos individualmente.
- Mostrar un mensaje de error si el Pokémon no existe.

## Estructura del proyecto

```
pokedex/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── api.js        # Consulta a la PokéAPI
    ├── ui.js         # Creación de tarjetas y mensajes
    ├── storage.js    # Manejo de localStorage
    └── main.js       # Event listeners y arranque de la app
```

> El enunciado permite también un único `script.js`. Ambas opciones son válidas; este README asume módulos. Si usan módulos, el script se enlaza con `type="module"`.

## API utilizada

```
GET https://pokeapi.co/api/v2/pokemon/{nombre}
```

Ejemplo: `https://pokeapi.co/api/v2/pokemon/pikachu`

Campos de la respuesta que necesitamos:

| Campo | Uso |
|-------|-----|
| `name` | Nombre del Pokémon |
| `sprites.front_default` | URL de la imagen |
| `stats` | Array donde hay que buscar `attack` y `defense` |

Si el Pokémon no existe, la API responde con **404**.

## Formato del objeto Pokémon

Es el objeto que se crea al consultar la API, se pinta en la tarjeta y se guarda en `localStorage`:

```js
{
  id: 25,
  name: "pikachu",
  image: "https://.../25.png",
  attack: 55,
  defense: 40
}
```

## Requisitos funcionales

| # | Requisito |
|---|-----------|
| 1 | `index.html` con un input para buscar Pokémon por nombre |
| 2 | Botón **Buscar** que consulta la PokéAPI |
| 3 | Botón **Limpiar** que borra el input y los resultados |
| 4 | Tarjeta con imagen, nombre, número de ataque y número de defensa |
| 5 | La tarjeta tiene el botón **Agregar a favoritos** |
| 6 | Al agregar, el Pokémon se guarda en `localStorage` |
| 7 | Al recargar, los favoritos siguen visibles |
| 8 | Cada tarjeta tiene un botón **Eliminar** que la quita de la pantalla y borra solo ese Pokémon de `localStorage` |
| 9 | Si el Pokémon no existe, se muestra un mensaje de error |

## Lo que hay que hacer

### Tarea 1: Estructura HTML

Crear `index.html` con estos elementos y **exactamente** estos IDs:

| Elemento | ID |
|----------|----|
| Input de búsqueda | `inputPokemon` |
| Botón Buscar | `btnBuscar` |
| Botón Limpiar | `btnLimpiar` |
| Contenedor de resultados | `resultadoBusqueda` |
| Contenedor de favoritos | `listaFavoritos` |

- [ ] CSS enlazado en el `<head>`.
- [ ] Script enlazado al final del `<body>` (con `type="module"` si se usan módulos).

### Tarea 2: Consumir la PokéAPI

Función que recibe el nombre, hace la petición y devuelve el objeto del Pokémon.

- [ ] Usar `fetch` con `async/await`.
- [ ] Convertir la respuesta a JSON.
- [ ] Usar `try/catch` para manejar errores.
- [ ] Manejar el caso 404 (Pokémon inexistente).
- [ ] Extraer `attack` y `defense` desde el array `stats`.

### Tarea 3: Crear la tarjeta del Pokémon

Función que recibe el objeto del Pokémon y devuelve un elemento HTML con:

- [ ] Imagen del Pokémon (usar `setAttribute()`).
- [ ] Nombre y números de ataque y defensa (usar `textContent`).
- [ ] Botón **Agregar a favoritos**.
- [ ] Botón **Eliminar**.
- [ ] Clase CSS en la tarjeta para estilizarla.
- [ ] Construcción con `document.createElement()` y `append()`.

### Tarea 4: Guardar y eliminar favoritos en localStorage

`localStorage` solo guarda strings, por eso se usan `JSON.stringify()` y `JSON.parse()`.

- [ ] **Guardar favorito**: recuperar los favoritos, añadir el nuevo, volver a guardar.
- [ ] **Evitar duplicados**: no guardar el mismo Pokémon dos veces.
- [ ] **Recuperar favoritos**: devolver un array; si no hay nada guardado (`null`), devolver `[]`.
- [ ] **Eliminar favorito**: filtrar el array con `filter()` por nombre o ID, y guardar el nuevo array.
- [ ] Usar una única clave, por ejemplo `"favoritos"`.

### Tarea 5: Renderizar favoritos al cargar la página

- [ ] Ejecutar la función al cargar (`DOMContentLoaded` o al final del script).
- [ ] Recuperar los favoritos de `localStorage`.
- [ ] Crear una tarjeta por cada favorito.
- [ ] Añadirlas al contenedor `listaFavoritos`.

### Tarea 6: Configurar los event listeners

| Botón | Acción |
|-------|--------|
| Buscar | Leer el input, llamar a la API, crear la tarjeta y mostrarla en `resultadoBusqueda` |
| Limpiar | Vaciar el input y el contenedor de resultados |
| Agregar a favoritos | Guardar en `localStorage` y renderizar en `listaFavoritos` |
| Eliminar | Quitar de `localStorage` y quitar la tarjeta del DOM |

- [ ] Usar `addEventListener('click', callback)`.
- [ ] Para los botones de las tarjetas, usar delegación de eventos o un listener por tarjeta.
- [ ] Manejar el caso de input vacío.
- [ ] Identificar al Pokémon por nombre o ID al eliminar.

### Tarea 7: Pulir la aplicación

- [ ] Probar con distintos Pokémon.
- [ ] Verificar que los favoritos persisten al recargar.
- [ ] Verificar que al eliminar se borra del `localStorage` **y** del DOM.
- [ ] Verificar que los errores se muestran correctamente.
- [ ] Mejorar el diseño con CSS.

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en el navegador.
   - Si se usan módulos ES (`type="module"`), el navegador exige servir los archivos por HTTP. Usar la extensión **Live Server** de VS Code, o desde la carpeta del proyecto:
     ```bash
     npx serve .
     ```
     o
     ```bash
     python3 -m http.server 8000
     ```

## Lista de pruebas

- [ ] Buscar `pikachu` muestra la tarjeta con imagen, nombre, ataque y defensa.
- [ ] Buscar un nombre inexistente (por ejemplo `asdfgh`) muestra el mensaje de error.
- [ ] Buscar con el input vacío no rompe la app y avisa al usuario.
- [ ] **Limpiar** vacía el input y el resultado.
- [ ] Agregar el mismo Pokémon dos veces no lo duplica.
- [ ] Recargar la página mantiene los favoritos.
- [ ] Eliminar un favorito no afecta a los demás.
- [ ] En DevTools → Application → Local Storage, la clave `favoritos` refleja lo que se ve en pantalla.

## Recursos

| Recurso | Enlace |
|---------|--------|
| PokéAPI | https://pokeapi.co/ |
| MDN: fetch | https://developer.mozilla.org/es/docs/Web/API/Fetch_API |
| MDN: localStorage | https://developer.mozilla.org/es/docs/Web/API/Window/localStorage |
| MDN: JSON | https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON |
| MDN: Array.filter | https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter |

## Autoevaluación

Al final de la sesión se realiza una autoevaluación del laboratorio.