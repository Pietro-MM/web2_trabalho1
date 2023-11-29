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
                <!-- Adicione mais informações conforme necessário -->
            `;

            roomList.appendChild(listItem);
        });
    }

    // Chame a função para exibir a lista de salas quando a página for carregada
    displayRoomList();

    // Evento para criar uma nova sala
    createRoomForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Recupere os valores do formulário
        const newRoomName = document.getElementById("new-room-name").value;

        // Crie um objeto para representar a nova sala
        const newRoom = {
            name: newRoomName,
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
        }

        // Limpe o formulário
        createRoomForm.reset();
    });
});
