document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchName");
    const searchButton = document.getElementById("searchBtn");
    const pokemonNameDisplay = document.getElementById("pokemonName");
    const pokemonImg = document.getElementById("pokemonImg");
    const pokemonInfo = document.getElementById("pokemonInfo");

    // Function to fetch Pokémon data from API
    async function fetchPokemon(pokemonName) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }

            const data = await response.json();
            displayPokemon(data);
        } catch (error) {
            showNotFoundMessage();
        }
    }

    // Function to display Pokémon data on the Pokedex screen
    function displayPokemon(data) {
        // Update Pokémon Name
        pokemonNameDisplay.textContent = data.name.toUpperCase();
        pokemonNameDisplay.style.textAlign = "center"; // Center text

        // Update Pokémon Image
        pokemonImg.src = data.sprites.front_default;
        pokemonImg.alt = data.name;
        pokemonImg.style.display = "block"; 
        pokemonImg.style.margin = "10px auto"; // Center image

        // Clear Previous Attributes
        pokemonInfo.innerHTML = "";

        // Add Dynamic Attributes
        let attributes = [
            `Type: ${data.types.map(type => type.type.name).join(", ")}`,
            `Height: ${data.height / 10} m`,
            `Weight: ${data.weight / 10} kg`
        ];

        attributes.forEach(attr => {
            let p = document.createElement("p");
            p.textContent = attr;
            p.style.textAlign = "center"; // Center text
            pokemonInfo.appendChild(p);
        });
    }

    // Function to show "Pokémon Not Found" message
    function showNotFoundMessage() {
    pokemonNameDisplay.textContent = "Pokémon Not Found";

    // Ensure it takes up full space and centers properly
    pokemonNameDisplay.style.color = "red";
    pokemonNameDisplay.style.fontWeight = "bold";
    pokemonNameDisplay.style.fontSize = "20px";
    pokemonNameDisplay.style.display = "block";
    pokemonNameDisplay.style.margin = "0"; // Remove unnecessary margins

    // Hide previous Pokémon image
    pokemonImg.src = "";
    pokemonImg.alt = "";
    pokemonImg.style.display = "none"; // Hide image

    // Clear previous details
    pokemonInfo.innerHTML = "";
}


    // Event Listener for Search Button
    searchButton.addEventListener("click", () => {
        const pokemonName = searchInput.value.trim();
        if (pokemonName !== "") {
            fetchPokemon(pokemonName);
        }
    });

    // Allow searching by pressing Enter key
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchButton.click();
        }
    });
});
