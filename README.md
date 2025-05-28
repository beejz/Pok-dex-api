# Pok-dex-api

A simple Pokédex web application demonstrating the use of JavaScript **Promises** and **async/await** to fetch data from the public [PokéAPI](https://pokeapi.co/).

 Features

- Search for a Pokémon by name  
- Displays:
  - Name  
  - Official artwork  
  - Type(s)  
  - Height (m)  
  - Weight (kg)  
- Graceful “Not Found” error handling

 Project Structure


Pok-dex-api/
├── index.html    # Main markup and UI
├── style.css     # Pokedex styling
├── app.js        # Promise-based & async/await fetch logic + DOM updates
└── README.md     # Project documentation

Project: Pokédex Web App
    Description: A simple Pokédex demonstrating JavaScript Promises and
                 async/await by fetching data from the public PokéAPI.
    API Used:    https://pokeapi.co/


/**
   * Promise-based fetch:
   * Returns a Promise that resolves with the Pokémon data JSON,
   * or rejects if the response is not OK.
   */

/**
   * Async/Await-based fetch:
   * Uses try/catch to handle both network errors and API errors.
   */

 /**
   * displayPokemon:
   * Updates the DOM with the fetched data:
   * - Sets the name text
   * - Updates the image src and alt
   * - Lists type(s), height, and weight
   */