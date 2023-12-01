document.addEventListener("DOMContentLoaded", function () {
    const roomList = document.getElementById("room-list");
    const createRoomButton = document.getElementById("create-room-button");
    const createRoomForm = document.getElementById("create-room-form");

    // Função para recuperar as salas do Local Storage
    function getRooms() {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        return rooms;
    }

    // Função para exibir a lista de salas
    function displayRoomList() {
        const rooms = getRooms();

        roomList.innerHTML = "";

        rooms.forEach((room) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${room.name}</strong>
                <button onclick="showRoomDetails('${room.name}')">Ver Detalhes</button>
                <div id="${room.name}-details" style="display: none;">
                    <p>Quantidade de Jogadores: ${room.maxPlayers}</p>
                    <p>Data e Horário da Partida: ${room.gameDateTime}</p>
                    <p>Nome do Jogo: ${room.gameName}</p>
                </div>
            `;

            roomList.appendChild(listItem);
        });
    }

    // Chame a função para exibir a lista de salas quando a página for carregada
    displayRoomList();

    function closeCreateRoomForm() {
        createRoomForm.style.display = "none";
    }


    // Evento para criar uma nova sala
    createRoomForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Recupere os valores do formulário
        const newRoomName = document.getElementById("room-name").value;
        const newMaxPlayers = document.getElementById("max-players").value;
        const newGameDateTime = document.getElementById("game-date-time").value;
        const newGameName = document.getElementById("game-name").value;

        // Crie um objeto para representar a nova sala
        const newRoom = {
            name: newRoomName,
            maxPlayers: newMaxPlayers,
            gameDateTime: newGameDateTime,
            gameName: newGameName,
            // Adicione mais propriedades conforme necessário
        };

        // Recupere as salas atuais do Local Storage
        const rooms = getRooms();

        // Verifique se a sala já existe
        if (rooms.some(existingRoom => existingRoom.name === newRoom.name)) {
            alert("Esta sala já existe!");
        } else {
            // Adicione a nova sala à lista de salas
            rooms.push(newRoom);

            // Atualize o Local Storage com as novas salas
            localStorage.setItem("rooms", JSON.stringify(rooms));

            // Atualize a exibição da lista de salas
            displayRoomList();

            // Feche o pop-up de criar nova sala
            closeCreateRoomForm();
        }

        // Limpe o formulário
        createRoomForm.reset();
    });
});
