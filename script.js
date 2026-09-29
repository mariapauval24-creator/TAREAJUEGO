// Arreglo que representa el tablero
let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let jugadorActual = "X";
let juegoTerminado = false;

const tableroHTML = document.getElementById("tablero");
const turnoHTML = document.getElementById("turno");
const mensajeHTML = document.getElementById("mensaje");


// Crear las 9 casillas
function crearTablero() {

    tableroHTML.innerHTML = "";

    for (let renglon = 0; renglon < 3; renglon++) {

        for (let columna = 0; columna < 3; columna++) {

            let casilla = document.createElement("button");

            casilla.classList.add("casilla");

            casilla.textContent = tablero[renglon][columna];

            casilla.addEventListener("click", function() {
                jugar(renglon, columna);
            });

            tableroHTML.appendChild(casilla);
        }
    }
}


// Función para jugar
function jugar(renglon, columna) {

    if (tablero[renglon][columna] !== "" || juegoTerminado) {
        return;
    }

    // Guardamos X u O en el arreglo
    tablero[renglon][columna] = jugadorActual;

    crearTablero();

    // Revisamos si alguien ganó
    if (revisarGanador()) {

        mensajeHTML.textContent =
            "¡Ganó el jugador " + jugadorActual + "!";

        juegoTerminado = true;
        turnoHTML.textContent = "";

        return;
    }

    // Revisamos empate
    if (revisarEmpate()) {

        mensajeHTML.textContent = "¡Empate!";

        juegoTerminado = true;
        turnoHTML.textContent = "";

        return;
    }

    // Cambiar jugador
    if (jugadorActual === "X") {
        jugadorActual = "O";
    } else {
        jugadorActual = "X";
    }

    turnoHTML.textContent = "Turno de: " + jugadorActual;
}


// Revisar ganador
function revisarGanador() {

    // Revisar renglones
    for (let renglon = 0; renglon < 3; renglon++) {

        if (
            tablero[renglon][0] === jugadorActual &&
            tablero[renglon][1] === jugadorActual &&
            tablero[renglon][2] === jugadorActual
        ) {
            return true;
        }
    }


    // Revisar columnas
    for (let columna = 0; columna < 3; columna++) {

        if (
            tablero[0][columna] === jugadorActual &&
            tablero[1][columna] === jugadorActual &&
            tablero[2][columna] === jugadorActual
        ) {
            return true;
        }
    }


    // Revisar diagonal principal
    if (
        tablero[0][0] === jugadorActual &&
        tablero[1][1] === jugadorActual &&
        tablero[2][2] === jugadorActual
    ) {
        return true;
    }


    // Revisar diagonal secundaria
    if (
        tablero[0][2] === jugadorActual &&
        tablero[1][1] === jugadorActual &&
        tablero[2][0] === jugadorActual
    ) {
        return true;
    }


    return false;
}


// Revisar si todas las casillas están ocupadas
function revisarEmpate() {

    for (let renglon = 0; renglon < 3; renglon++) {

        for (let columna = 0; columna < 3; columna++) {

            if (tablero[renglon][columna] === "") {
                return false;
            }
        }
    }

    return true;
}


// Reiniciar el juego
function reiniciarJuego() {

    tablero = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    jugadorActual = "X";
    juegoTerminado = false;

    mensajeHTML.textContent = "";
    turnoHTML.textContent = "Turno de: X";

    crearTablero();
}


// Crear tablero al iniciar
crearTablero();