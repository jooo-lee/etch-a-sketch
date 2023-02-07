const canvas = document.getElementById("canvas");

function makeGrid(size) {
    canvas.style.setProperty("--grid-rows", size);
    canvas.style.setProperty("--grid-cols", size);
    for (let i = 0; i < (size * size); i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        canvas.appendChild(gridSquare);
    }
    const grids = document.querySelectorAll(".grid-square");
    grids.forEach(sq => sq.addEventListener("mouseover", changeColor));
}

makeGrid(16);

function changeColor(e) {
    e.target.style.backgroundColor = "red";
}