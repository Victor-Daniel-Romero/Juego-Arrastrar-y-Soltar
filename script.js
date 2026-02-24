const dragItems = document.querySelectorAll('.drag-item');
const dropzones = document.querySelectorAll('.dropzone');
let score = 0;

dragItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

dropzones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', dropItem);
});

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.dataset.match);
}

function dragOver(e) {
    e.preventDefault();
}

function dropItem(e) {
    e.preventDefault();

    const draggedData = e.dataTransfer.getData("text");
    const dropMatch = e.target.dataset.match;

    if (draggedData === dropMatch) {
        e.target.classList.add("correct");
        e.target.classList.remove("incorrect");

        score++;
        document.getElementById("score").textContent = score;

    } else {
        e.target.classList.add("incorrect");

        setTimeout(() => {
            e.target.classList.remove("incorrect");
        }, 1000);
    }
}

function reiniciarJuego() {
    score = 0;
    document.getElementById("score").textContent = score;

    dropzones.forEach(zone => {
        zone.classList.remove("correct");
        zone.classList.remove("incorrect");
    });
}
