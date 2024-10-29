let allGames = []; // Arreglo para guardar todos los juegos

        // Función para cargar el JSON
        function loadGames() {
            fetch('popular_top_rated_games_2024.json') // Cambia esta ruta si es necesario
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    const mostPopularGames = Array.isArray(data.most_popular_games_2024) ? data.most_popular_games_2024 : [];
                    allGames = mostPopularGames; // Solo usamos most_popular_games_2024
                    createGameCards(allGames); // Inicialmente muestra todos los juegos
                })
                .catch(error => {
                    console.error("Error al cargar el JSON:", error);
                });
        }

        // Función para crear las cards
        function createGameCards(games) {
            const container = document.getElementById('games-container');
            container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas cards

            games.forEach(game => {
                // Crear un div para cada card
                const card = document.createElement('div');
                card.classList.add('card');

                // Título del juego
                const title = document.createElement('div');
                title.classList.add('card-title');
                title.textContent = game.name;

                // Géneros del juego
                const genres = document.createElement('div');
                genres.classList.add('card-genres');
                genres.textContent = `Género: ${game.genre}`;

                // Nota del juego
                const score = document.createElement('div');
                score.classList.add('card-score');
                score.textContent = `Metacritic: ${game.metacritic_score}`;

                // Añadir los elementos a la card
                card.appendChild(title);
                card.appendChild(genres);
                card.appendChild(score);

                // Añadir la card al contenedor
                container.appendChild(card);
            });
        }

        // Función para filtrar juegos por géneros
        function filterGames() {
            const tags = document.getElementById('tag-input').value.toLowerCase().split(',').map(tag => tag.trim());
            const filteredGames = allGames.filter(game => 
                tags.some(tag => game.genre.toLowerCase().includes(tag))
            );
            createGameCards(filteredGames); // Mostrar juegos filtrados
        }

        // Función para ordenar juegos por nombre
        function sortByName() {
            const sortedGames = [...allGames].sort((a, b) => a.name.localeCompare(b.name));
            createGameCards(sortedGames); // Mostrar juegos ordenados
        }

        // Función para ordenar juegos por nota
        function sortByScore() {
            const sortedGames = [...allGames].sort((a, b) => b.metacritic_score - a.metacritic_score);
            createGameCards(sortedGames); // Mostrar juegos ordenados
        }

        // Eventos para los botones
        document.getElementById('filter-button').addEventListener('click', filterGames);
        document.getElementById('sort-name').addEventListener('click', sortByName);
        document.getElementById('sort-score').addEventListener('click', sortByScore);

        // Cargar los juegos al inicio
        loadGames();