const dragItems = document.querySelectorAll('.drag-item');
const dropzones = document.querySelectorAll('.dropzone');

let score = 0;
let timeLeft = 60;
let timerInterval;
let gameActive = true;

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

/* ============================= */
/*        INICIAR JUEGO         */
/* ============================= */

startTimer();

dragItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', dropItem);
});

/* ============================= */
/*        FUNCIONES DRAG        */
/* ============================= */

function dragStart(e) {
    if (!gameActive) return;
    e.dataTransfer.setData("text", e.target.dataset.match);
}

function dragOver(e) {
    e.preventDefault();
}

function dropItem(e) {
    e.preventDefault();

    if (!gameActive) return;

    const draggedData = e.dataTransfer.getData("text");
    const dropMatch = e.target.dataset.match;

    if (draggedData === dropMatch) {
        e.target.classList.add("correct");
        e.target.classList.remove("incorrect");

        score++;
        scoreDisplay.textContent = score;

    } else {
        e.target.classList.add("incorrect");

        setTimeout(() => {
            e.target.classList.remove("incorrect");
        }, 800);
    }
}

/* ============================= */
/*        TEMPORIZADOR          */
/* ============================= */

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    alert("⏰ Tiempo agotado!\nPuntaje final: " + score);
}

/* ============================= */
/*        REINICIAR             */
/* ============================= */

function reiniciarJuego() {

    clearInterval(timerInterval);

    score = 0;
    timeLeft = 60;
    gameActive = true;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    dropzones.forEach(zone => {
        zone.classList.remove("correct");
        zone.classList.remove("incorrect");
    });

    startTimer();
}
