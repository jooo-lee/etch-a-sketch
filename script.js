const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const clearBtn = document.getElementById("clear-btn");

makeGrid(32); // Set grid to have a default size of 32. Matches default slider value

slider.addEventListener("change", updateGridSize);

clearBtn.addEventListener("click", clearScreen);

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

// ------------------------------ Below are some helper functions ------------------------------

function changeColor(e) {
    e.target.style.backgroundColor = "red";
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

function clearScreen() {
    removeAllChildNodes(canvas);
    makeGrid(slider.value);
}