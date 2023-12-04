document.addEventListener("DOMContentLoaded", function () {
    const roomList = document.getElementById("room-list");
    const createRoomButton = document.getElementById("create-room-button");
    const createRoomForm = document.getElementById("create-room-form");
    const joinedRoomsList = document.getElementById("joined-rooms-list");
    const gameSelect = document.getElementById("game-name");

    function populateGameSelect() {
        const registeredGames = getRegisteredGames();

        // Limpa as opções atuais
        gameSelect.innerHTML = "";

        // Adiciona uma opção padrão (opcional)
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Selecione um Jogo";
        gameSelect.add(defaultOption);

        // Adiciona as opções dos jogos
        registeredGames.forEach((game) => {
            const option = document.createElement("option");
            option.value = game.name;
            option.text = game.name;
            gameSelect.add(option);
        });
    }

    function getRooms() {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        return rooms;
    }

    function getRegisteredGames() {
        const registeredGames = JSON.parse(localStorage.getItem("registeredGames")) || [];
        return registeredGames;
    }

    function displayRoomList() {
        const rooms = getRooms();

        roomList.innerHTML = "";

        rooms.forEach((room) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div>
                    <strong>${room.name}</strong>
                </div>
                <div>
                    <button onclick="showRoomDetails('${room.name}')">Ver Detalhes</button>
                    <button onclick="joinRoom('${room.name}')">Juntar-se à Sala</button>
                </div>
                <div id="${room.name}-details" style="display: none;">
                    <p>Quantidade de Jogadores: ${room.maxPlayers}</p>
                    <p>Data e Horário da Partida: ${room.gameDateTime}</p>
                    <p>Nome do Jogo: ${room.gameName}</p>
                </div>
            `;

            roomList.appendChild(listItem);
        });
    }

    function displayJoinedRoomsList() {
        const joinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || [];

        joinedRoomsList.innerHTML = "";

        joinedRooms.forEach((roomName) => {
            const room = getRooms().find(room => room.name === roomName);
            if (room) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${room.name}</strong>
                    <button onclick="leaveRoom('${room.name}')">Sair da Sala</button>
                    <div id="${room.name}-details" style="display: none;">
                        <p>Quantidade de Jogadores: ${room.maxPlayers}</p>
                        <p>Data e Horário da Partida: ${room.gameDateTime}</p>
                        <p>Nome do Jogo: ${room.gameName}</p>
                    </div>
                `;
                joinedRoomsList.appendChild(listItem);
            }
        });
    }

    function closeCreateRoomForm() {
        createRoomForm.style.display = "none";
    }

    createRoomForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newRoomName = document.getElementById("room-name").value;
        const newMaxPlayers = document.getElementById("max-players").value;
        const newGameDateTime = document.getElementById("game-date-time").value;
        const newGameName = gameSelect.value;

        const newRoom = {
            name: newRoomName,
            maxPlayers: newMaxPlayers,
            gameDateTime: newGameDateTime,
            gameName: newGameName,
        };

        const rooms = getRooms();

        if (rooms.some(existingRoom => existingRoom.name === newRoom.name)) {
            alert("Esta sala já existe!");
        } else {
            rooms.push(newRoom);
            localStorage.setItem("rooms", JSON.stringify(rooms));
            displayRoomList();
            alert("Sala criada com sucesso!");
        }

        createRoomForm.reset();
    });

    window.joinRoom = function(roomName) {
        const joinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || [];

        if (joinedRooms.includes(roomName)) {
            alert("Você já está nesta sala!");
        } else {
            joinedRooms.push(roomName);
            localStorage.setItem("joinedRooms", JSON.stringify(joinedRooms));
            displayJoinedRoomsList();
        }
    };

    window.leaveRoom = function(roomName) {
        let joinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || [];

        joinedRooms = joinedRooms.filter(room => room !== roomName);
        localStorage.setItem("joinedRooms", JSON.stringify(joinedRooms));
        displayJoinedRoomsList();
    };

    window.showRoomDetails = function (roomName, isJoinedRoom) {
        const detailsDiv = document.getElementById(`${roomName}-details`);
        const rooms = isJoinedRoom ? getJoinedRooms() : getRooms();
        const room = rooms.find((room) => room.name === roomName);

        if (detailsDiv && room) {
            detailsDiv.innerHTML = `
                <p>Quantidade de Jogadores: ${room.maxPlayers}</p>
                <p>Data e Horário da Partida: ${room.gameDateTime}</p>
                <p>Nome do Jogo: ${room.gameName}</p>
            `;

            if (isJoinedRoom) {
                const leaveButton = document.createElement("button");
                leaveButton.textContent = "Sair da Sala";
                leaveButton.onclick = function () {
                    leaveRoom(roomName);
                    displayJoinedRoomsList();
                };
                detailsDiv.appendChild(leaveButton);
            }

            detailsDiv.style.display = detailsDiv.style.display === "none" ? "block" : "none";
        }
    };

    // Chame a função para exibir a lista de salas quando a página for carregada
    displayRoomList();
    // Chame a função para exibir a lista de "Minhas Salas" quando a página for carregada
    displayJoinedRoomsList();
    // Chame a função para popular a lista de jogos quando a página for carregada
    populateGameSelect();
});
