document.addEventListener("DOMContentLoaded", function () {
    const registeredGamesList = document.getElementById("registered-games-list");
    const addGameButton = document.getElementById("add-game-button");
    const addGameForm = document.getElementById("add-game-form");

    // Função para recuperar os jogos registrados do Local Storage
    function getRegisteredGames() {
        const registeredGames = JSON.parse(localStorage.getItem("registeredGames")) || [];
        return registeredGames;
    }

    // Função para exibir jogos registrados
    function displayRegisteredGames() {
        const registeredGames = getRegisteredGames();

        registeredGamesList.innerHTML = "";

        registeredGames.forEach((game) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${game.name}</strong>
                <p>Breve Resumo: ${game.summary}</p>
            `;

            registeredGamesList.appendChild(listItem);
        });
    }

    // Chame a função para exibir jogos registrados quando a página for carregada
    displayRegisteredGames();

    // Evento para adicionar um novo jogo
    addGameForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Recupere os valores do formulário
        const newGameName = document.getElementById("new-game-name").value;
        const newGameSummary = document.getElementById("new-game-summary").value;

        // Crie um objeto para representar o novo jogo
        const newGame = {
            name: newGameName,
            summary: newGameSummary,
            // Adicione mais propriedades conforme necessário
        };

        // Recupere os jogos registrados atuais do Local Storage
        const registeredGames = getRegisteredGames();

        // Verifique se o jogo já está registrado
        if (registeredGames.some(registeredGame => registeredGame.name === newGame.name)) {
            alert("Este jogo já está registrado!");
        } else {
            // Adicione o novo jogo à lista de jogos registrados
            registeredGames.push(newGame);

            // Atualize o Local Storage com os novos jogos registrados
            localStorage.setItem("registeredGames", JSON.stringify(registeredGames));

            // Atualize a exibição dos jogos registrados
            displayRegisteredGames();

            // Feche o pop-up de adicionar novo jogo
            closeAddGameForm();
        }

        // Limpe o formulário
        addGameForm.reset();
    });

    // Função para exibir o pop-up de adicionar novo jogo
    function showAddGameForm() {
        document.getElementById("add-game-popup").style.display = "block";
    }

    // Função para fechar o pop-up de adicionar novo jogo
    function closeAddGameForm() {
        document.getElementById("add-game-popup").style.display = "none";
    }

    // Chame a função para exibir jogos registrados quando a página for carregada
    displayRegisteredGames();
});
