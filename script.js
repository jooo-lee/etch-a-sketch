const canvas = document.getElementById("canvas");

function makeGrid(size) {
    canvas.style.setProperty("--grid-rows", size);
    canvas.style.setProperty("--grid-cols", size);
    canvas.style.setProperty("--grid-square-size", getGridSquareSize(size));
    for (let i = 0; i < (size * size); i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        canvas.appendChild(gridSquare);
    }
    const grids = document.querySelectorAll(".grid-square");
    grids.forEach(sq => sq.addEventListener("mouseover", changeColor));
}

makeGrid(64);

function changeColor(e) {
    e.target.style.backgroundColor = "red";
}

// Maintain a grid size of 480px no matter how many squares there are in the grid
function getGridSquareSize(size) {
    return 480 / size + "px";
}