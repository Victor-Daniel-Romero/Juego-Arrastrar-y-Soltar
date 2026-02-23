let score = 0;
let timeLeft = 60;
let gameActive = true;

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const message = document.getElementById("message");

const items = document.querySelectorAll(".drag-item");
const dropzones = document.querySelectorAll(".dropzone");

// ⏳ TEMPORIZADOR
const countdown = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(countdown);
        endGame(false);
    }
}, 1000);

items.forEach(item => {
    item.addEventListener("dragstart", dragStart);
});

dropzones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", dropItem);
    zone.addEventListener("dragleave", dragLeave);
});

function dragStart(e) {
    if (!gameActive) return;
    e.dataTransfer.setData("text", e.target.dataset.match);
    e.dataTransfer.setData("id", e.target.id);
}

function dragOver(e) {
    e.preventDefault();
    if (!gameActive) return;
    e.target.classList.add("hovered");
}

function dragLeave(e) {
    e.target.classList.remove("hovered");
}

function dropItem(e) {
    e.preventDefault();
    if (!gameActive) return;

    const match = e.dataTransfer.getData("text");
    const id = e.dataTransfer.getData("id");

    if (match === e.target.dataset.match) {
        const item = document.getElementById(id);
        e.target.appendChild(item);
        e.target.classList.add("correct");
        score++;
        scoreDisplay.textContent = score;

        message.innerHTML = "✅ Correcto";
        message.style.color = "#00ff99";

        // 🏆 Gana si completa todo
        if (score === items.length) {
            clearInterval(countdown);
            endGame(true);
        }

    } else {
        // ❌ INCORRECTO
        message.innerHTML = "❌ Incorrecto";
        message.style.color = "red";
    }

    e.target.classList.remove("hovered");
}

function endGame(win) {
    gameActive = false;

    if (win) {
        message.innerHTML = "🎉 ¡GANASTE!";
        message.style.color = "#00ff99";
    } else {
        message.innerHTML = "⏰ PERDISTE - Se acabó el tiempo";
        message.style.color = "red";
    }

    items.forEach(item => item.setAttribute("draggable", false));
}
