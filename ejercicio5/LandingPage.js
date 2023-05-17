// Selecciona todos los elementos HTML con la clase 'square' y los guarda en una constante
const squares = document.querySelectorAll('.square');

// Inicializa el jugador actual a 'X', la puntuación de los jugadores a 0 y el estado del juego a no finalizado
let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let isGameFinished = false;

// Condiciones de victoria
const winConditions = [
    [0, 1, 2], // row 1
    [3, 4, 5], // row 2
    [6, 7, 8], // row 3
    [0, 3, 6], // column 1
    [1, 4, 7], // column 2
    [2, 5, 8], // column 3
    [0, 4, 8], // diagonal 1
    [2, 4, 6], // diagonal 2
];

// Verifica si un jugador ha ganado
function checkWin(player) {
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (squares[a].textContent === player && squares[b].textContent === player && squares[c].textContent === player) {
            return true;
        }
    }
    return false;
}

// Verifica si se ha producido un empate
function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i].textContent) {
            return false;
        }
    }
    return true;
}

// Reinicia el tablero de juego
function resetBoard() {
    return new Promise(resolve => {
        squares.forEach(square => {
            square.style.opacity = 0;
            setTimeout(() => {
                square.textContent = '';
                square.style.opacity = 1;
                resolve();
            }, 500);
        });
    }).then(() => {
        isGameFinished = false;
        currentPlayer = 'X';
    });
}

var pregunta = document.getElementById("pregunta")

// Pregunta al usuario si está seguro de que desea reiniciar el juego
function confirmReset() {
    return new Promise(resolve => {
        const confirmBox = document.getElementById("pregunta");
        const pregunta = document.createElement("p");
        const botonSi = document.createElement("button")
        const botonNo = document.createElement("button")

        pregunta.textContent = "¿Estás seguro de que quieres reiniciar el juego?"
        
        botonSi.textContent = "Si"
        botonSi.id = "confirmYes"

        botonNo.textContent = "No"
        botonNo.id = "confirmNo"

        confirmBox.appendChild(pregunta);
        confirmBox.appendChild(botonSi);
        confirmBox.appendChild(botonNo);

        document.getElementById('confirmYes').addEventListener('click', () => {
            confirmBox.innerHTML = ""
            resolve();
        });
        document.getElementById('confirmNo').addEventListener('click', () => {
            confirmBox.innerHTML = ""
        });
    });
}

// Pregunta al usuario si está seguro de que desea reiniciar la puntuación
function confirmResetScore() {
    return new Promise(resolve => {
        const confirmBox = document.getElementById("pregunta");
        const pregunta = document.createElement("p");
        const botonSi = document.createElement("button")
        const botonNo = document.createElement("button")

        pregunta.textContent = "¿Estás seguro de que quieres reiniciar la puntuación?"
        
        botonSi.textContent = "Si"
        botonSi.id = "confirmYes"

        botonNo.textContent = "No"
        botonNo.id = "confirmNo"

        confirmBox.appendChild(pregunta);
        confirmBox.appendChild(botonSi);
        confirmBox.appendChild(botonNo);

        document.getElementById('confirmYes').addEventListener('click', () => {
            confirmBox.innerHTML = ""
            resolve();
        });
        document.getElementById('confirmNo').addEventListener('click', () => {
            confirmBox.innerHTML = ""
        });
    });
}

// Maneja el reinicio de la puntuación
document.getElementById('resetScore').addEventListener('click', () => {
    confirmResetScore().then(() => {
        player1Score = 0;
        player2Score = 0;
        updateScore();
        localStorage.removeItem('player1Score');
        localStorage.removeItem('player2Score');
    });
});

// Maneja la aparicion de la guia
const guideButton = document.querySelector('#guide');
const guideImage = document.querySelector('#guideImage');

guideButton.addEventListener('click', () => {
    guideImage.style.display = 'block';
});

// Actualiza el puntaje en el DOM
function updateScore() {
    document.getElementById('scorePlayer1').textContent = player1Score;
    document.getElementById('scorePlayer2').textContent = player2Score;
    localStorage.setItem('player1Score', player1Score.toString());
    localStorage.setItem('player2Score', player2Score.toString());
}

// Comprueba el estado de la partida para sacar un mensaje de victoria si no cambia el jugador actual
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (!isGameFinished && !square.textContent) {
            square.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                isGameFinished = true;
                if (currentPlayer === 'X') {
                    player1Score++;
                    alert('¡Ganaste, jugador 1!');
                } else {
                    player2Score++;
                    alert('¡Ganaste, jugador 2!');
                }
                updateScore();
            } else if (checkTie()) {
                isGameFinished = true;
                alert('Empate');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});

// Al pulsar el boton de reset inicia un evento para comprobar si se quiere resetear el trablero y en caso afirmativo lo reinicia
document.getElementById('reset').addEventListener('click', () => {
    confirmReset().then(() => {
        resetBoard();
    });
});

// Al hacer click en un cuadro si esta vacio lo rellena con el icono del jugador actual
squares.forEach(square => {
    square.addEventListener('click', () => {
        if (!square.textContent) {
            square.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Comprueba el estado de la partida para sacar un mensaje de victoria si no cambia el jugador actual
// Este es para comprobar las elecciones de teclado
document.body.addEventListener('keydown', event => {
    const key = event.key;
    const number = parseInt(key);
    if (!isNaN(number) && number >= 1 && number <= 9) {
        const index = number - 1;
        const square = squares[index];
        if (!isGameFinished && !square.textContent) {
            square.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                isGameFinished = true;
                if (currentPlayer === 'X') {
                    player1Score++;
                    alert('¡Ganaste, jugador 1!');
                } else {
                    player2Score++;
                    alert('¡Ganaste, jugador 2!');
                }
                updateScore();
            } else if (checkTie()) {
                isGameFinished = true;
                alert('Empate');
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }
});

// Carga el puntuaje de los jugadores
window.addEventListener('load', () => {
    player1Score = parseInt(localStorage.getItem('player1Score')) || 0;
    player2Score = parseInt(localStorage.getItem('player2Score')) || 0;
    updateScore();
});

// Metodos para la leaderboard

const saveScoreButton = document.querySelector('#saveScore');
saveScoreButton.addEventListener('click', saveScore);

function saveScore() {
    const playerName = prompt('Ingrese su nombre');
    const selectedPlayer = document.querySelector('#playerSelect').value;
    const score = selectedPlayer === 'player1' ? player1Score : player2Score;

    // Agrega el puntaje a la tabla
    const leaderboardTable = document.querySelector('#leaderboard tbody');
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const scoreCell = document.createElement('td');
    const actionCell = document.createElement('td');
    nameCell.textContent = playerName;
    scoreCell.textContent = score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);;
    leaderboardTable.appendChild(row);

    // Guarda los puntajes en localstorage
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: playerName, score });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Guarda la información de la tabla en localStorage
function saveLeaderboard() {
    const leaderboard = document.querySelector('#leaderboard tbody');
    const data = [];
    for (let i = 0; i < leaderboard.rows.length; i++) {
        const name = leaderboard.rows[i].cells[0].textContent;
        const score = leaderboard.rows[i].cells[1].textContent;
        data.push({ name, score });
    }
    localStorage.setItem('leaderboard', JSON.stringify(data));
}

// Carga la información de la tabla desde localStorage, aparecera ordenada al recargar la pagina
function loadLeaderboard() {
    const leaderboard = document.querySelector('#leaderboard tbody');
    const data = JSON.parse(localStorage.getItem('leaderboard'));
    if (data) {
      const rows = [];
      for (let i = 0; i < data.length; i++) {
        rows.push([data[i].name, data[i].score]);
      }
      rows.sort((a, b) => b[1] - a[1]);
      while (leaderboard.firstChild) {
        leaderboard.removeChild(leaderboard.firstChild);
      }
      for (let i = 0; i < rows.length; i++) {
        const row = leaderboard.insertRow();
        const nameCell = row.insertCell(0);
        const scoreCell = row.insertCell(1);
        nameCell.textContent = rows[i][0];
        scoreCell.textContent = rows[i][1];
      }
    }
  }
  

// Llama a la función para cargar la tabla al iniciar la página
loadLeaderboard();


