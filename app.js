document.addEventListener("DOMContentLoaded", () => {
    const searchInput       = document.getElementById("searchName");
    const searchButton      = document.getElementById("searchBtn");
    const pokemonNameDisplay= document.getElementById("pokemonName");
    const pokemonImg        = document.getElementById("pokemonImg");
    const pokemonInfo       = document.getElementById("pokemonInfo");
  
    // —— Promise-based fetch (returns a Promise) ——
    function fetchPokemonPromise(name) {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Pokémon not found");
          }
          return response.json();
        });
    }
  
    // —— async/await fetch (cleaner syntax) ——
    async function fetchPokemonAsync(name) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        const data = await response.json();
        displayPokemon(data);
      } catch (error) {
        showNotFoundMessage();
      }
    }
  
    // Display logic (shared)
    function displayPokemon(data) {
      // Name
      pokemonNameDisplay.textContent = data.name.toUpperCase();
      pokemonNameDisplay.style.textAlign = "center";
  
      // Image
      pokemonImg.src = data.sprites.front_default;
      pokemonImg.alt = data.name;
      pokemonImg.style.display = "block";
      pokemonImg.style.margin = "10px auto";
  
      // Attributes
      pokemonInfo.innerHTML = "";
      const attrs = [
        `Type: ${data.types.map(t => t.type.name).join(", ")}`,
        `Height: ${data.height / 10} m`,
        `Weight: ${data.weight / 10} kg`
      ];
      attrs.forEach(attr => {
        const p = document.createElement("p");
        p.textContent = attr;
        p.style.textAlign = "center";
        pokemonInfo.appendChild(p);
      });
    }
  
    // Error handling (shared)
    function showNotFoundMessage() {
      pokemonNameDisplay.textContent = "Pokémon Not Found";
      pokemonNameDisplay.style.color = "red";
      pokemonNameDisplay.style.fontWeight = "bold";
      pokemonNameDisplay.style.fontSize = "20px";
      pokemonNameDisplay.style.textAlign = "center";
  
      pokemonImg.src = "";
      pokemonImg.alt = "";
      pokemonImg.style.display = "none";
      pokemonInfo.innerHTML = "";
    }
  
    // Central handler
    function handleSearch() {
      const name = searchInput.value.trim();
      if (!name) return;
  
      // Promise-based:
      fetchPokemonPromise(name)
        .then(data => displayPokemon(data))
        .catch(() => showNotFoundMessage());
  
      //to use async/await instead:
      // fetchPokemonAsync(name);
    }
  
    // Event listeners
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", e => {
      if (e.key === "Enter") handleSearch();
    });
  });
  