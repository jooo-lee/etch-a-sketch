const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const clearBtn = document.getElementById("clear-btn");
const eraserBtn = document.getElementById("eraser-btn");
const blackBtn = document.getElementById("black-btn");

slider.addEventListener("change", updateGridSize);
clearBtn.addEventListener("click", clearCanvas); 

makeGrid(32); // Set grid to have a default size of 32. Matches default slider value

// Use Javascript object to hold all states of pen
// Have pen be in regular black state by default
const penMode = {
    black: true,
    shading: false,
    rainbow: false,
    eraser: false
};

const penModeBtns = document.querySelectorAll(".pen-mode");
penModeBtns.forEach(btn => btn.addEventListener("click", selectPenMode));

function makeGrid(size) {
    canvas.style.setProperty("--grid-rows", size);
    canvas.style.setProperty("--grid-cols", size);

    // Maintain a grid size of 480px no matter how many squares there are in the grid
    canvas.style.setProperty("--grid-square-size", getGridSquareSize(size));

    for (let i = 0; i < (size * size); i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        canvas.appendChild(gridSquare);
    }

    const grids = document.querySelectorAll(".grid-square");
    grids.forEach(sq => sq.addEventListener("mouseover", changeColor));
}

// ------------------------------ Below are callback and helper functions ------------------------------

function changeColor(e) {
    if (penMode["black"]) e.target.style.backgroundColor = "black";
    else if (penMode["eraser"]) e.target.style.backgroundColor = "white";
}

function getGridSquareSize(size) {
    return 480 / size + "px";
}

function updateGridSize(e) {
    removeAllChildNodes(canvas);
    makeGrid(slider.value);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearCanvas() {
    removeAllChildNodes(canvas);
    makeGrid(slider.value);
}

function selectPenMode(e) {
    if (penMode[e.target.dataset.btnType]) return; // Desired pen mode already selected
    for (const mode in penMode) {
        penMode[mode] = false;
    }
    penMode[e.target.dataset.btnType] = true;
}