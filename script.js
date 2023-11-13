document.addEventListener("DOMContentLoaded", function () {
    const gameList = document.getElementById("game-list");
    const gameScheduleForm = document.getElementById("game-schedule-form");
    const userScheduleList = document.getElementById("user-schedule-list"); // Lista de partidas inscritas pelo usuário

    // Função para recuperar as partidas agendadas do Local Storage
    function getScheduledGames() {
        const scheduledGames = JSON.parse(localStorage.getItem("scheduledGames")) || [];
        return scheduledGames;
    }

    // Função para recuperar as inscrições do usuário do Local Storage
    function getUserScheduledGames() {
        const userScheduledGames = JSON.parse(localStorage.getItem("userScheduledGames")) || [];
        return userScheduledGames;
    }

    function limparStorage(){
        localStorage.clear
    }

    // Variável para armazenar as partidas inscritas pelo usuário
    const userGames = getUserScheduledGames();

    // Função para exibir as partidas na lista
    function displayScheduledGames() {
        const games = getScheduledGames();

        // Limpa as listas atuais
        gameList.innerHTML = "";
        userScheduleList.innerHTML = "";

        // Itera sobre as partidas agendadas e cria elementos HTML para cada uma
        games.forEach((game, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${game.name}</strong>
                <p>Data e Hora: ${game.dateTime}</p>
                <p>Jogadores Necessários: ${game.playerCount}</p>
                <p>Descrição: ${game.description}</p>
                <button data-index="${index}" class="join-button">Participar</button>
            `;

            gameList.appendChild(listItem);
        });

        // Itera sobre as partidas inscritas pelo usuário
        userGames.forEach((game, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${game.name}</strong>
                <p>Data e Hora: ${game.dateTime}</p>
                <p>Jogadores Necessários: ${game.playerCount}</p>
                <p>Descrição: ${game.description}</p>
            `;

            userScheduleList.appendChild(listItem);
        });

        // Adicione eventos para permitir a inscrição nas partidas
        const joinButtons = document.querySelectorAll(".join-button");
        joinButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                const gameToJoin = games[index];

                // Verifique se o usuário já está inscrito na partida
                if (userGames.some(userGame => userGame.name === gameToJoin.name)) {
                    alert("Você já está inscrito nesta partida!");
                } else {
                    // Se o usuário não estiver inscrito, adicione a partida à lista de partidas inscritas
                    userGames.push(gameToJoin);
                    localStorage.setItem("userScheduledGames", JSON.stringify(userGames));
                    displayUserScheduledGames(); // Atualize a exibição das partidas inscritas pelo usuário
                }
            });
        });
    }

    // Função para exibir as partidas nas quais o usuário está inscrito
    function displayUserScheduledGames() {
        // Limpa a lista atual
        userScheduleList.innerHTML = "";

        // Itera sobre as partidas inscritas pelo usuário
        userGames.forEach((game, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${game.name}</strong>
                <p>Data e Hora: ${game.dateTime}</p>
                <p>Jogadores Necessários: ${game.playerCount}</p>
                <p>Descrição: ${game.description}</p>
            `;

            userScheduleList.appendChild(listItem);
        });
    }

    // Chame a função para exibir as partidas quando a página for carregada
    displayScheduledGames();

    // Chame a função para exibir as partidas inscritas pelo usuário quando a página for carregada
    displayUserScheduledGames();

    // Evento para agendar uma nova partida
    gameScheduleForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Recupere os valores do formulário
        const gameName = document.getElementById("game-name").value;
        const dateTime = document.getElementById("date-time").value;
        const playerCount = document.getElementById("player-count").value;
        const gameDescription = document.getElementById("game-description").value;

        // Crie um objeto para representar a nova partida
        const newGame = {
            name: gameName,
            dateTime: dateTime,
            playerCount: playerCount,
            description: gameDescription,
        };

        // Recupere as partidas agendadas atuais do Local Storage
        const scheduledGames = getScheduledGames();

        // Verifique se o usuário já está inscrito na nova partida
        if (userGames.some(userGame => userGame.name === newGame.name)) {
            alert("Você já está inscrito nesta partida!");
        } else {
            // Adicione a nova partida à lista de partidas agendadas
            scheduledGames.push(newGame);

            // Atualize o Local Storage com as novas partidas
            localStorage.setItem("scheduledGames", JSON.stringify(scheduledGames));

            // Atualize a exibição das partidas
            displayScheduledGames();
            displayUserScheduledGames(); // Atualize a exibição das partidas inscritas pelo usuário
        }

        // Limpe o formulário
        gameScheduleForm.reset();
    });
});
