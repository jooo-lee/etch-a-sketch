const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const clearBtn = document.getElementById("clear-btn");
const eraserBtn = document.getElementById("eraser-btn");
const penBtn = document.getElementById("pen-btn");
const shadingBtn = document.getElementById("shading-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const gridBtn = document.getElementById("grid-btn");
const colorPicker = document.getElementById("color-picker");

slider.addEventListener("change", updateGridSize);
clearBtn.addEventListener("click", clearCanvas); 
gridBtn.addEventListener("click", toggleGrid);
colorPicker.addEventListener("change", chooseColor);

makeGrid(32); // Set grid to have a default size of 32. Matches default slider value

// Use Javascript object to hold all states of pen
// Have pen be in regular black state by default
const penMode = {
    pen: true,
    shading: false,
    rainbow: false,
    eraser: false
};

let gridOn = false;
let pickedColor = "rgba(0, 0, 0, 1)";

const penModeBtns = document.querySelectorAll(".pen-mode");
penModeBtns.forEach(btn => btn.addEventListener("click", selectPenMode));
penBtn.classList.add("btnToggled");

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

    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach(sq => sq.addEventListener("mouseover", changeColor));
}

// ------------------------------ Below are callback and helper functions ------------------------------

function changeColor(e) {
    if (penMode["pen"]) {
        e.target.style.backgroundColor = pickedColor;
    } else if (penMode["eraser"]) {
        e.target.style.backgroundColor = null;
    } else if (penMode["shading"]) {
        if (!e.target.style.backgroundColor) {
            e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        } else {
            let currColor = e.target.style.backgroundColor;
            // https://stackoverflow.com/questions/48533565/change-css-rgba-background-colors-alpha-value-using-js
            const parts = currColor.match(/[\d.]+/g); // Use RegEx to parse colour and alpha values into array
            if (parts.length !== 4) {
                return;
            }
            if (parseFloat(parts[3]) <= 0.9) {
                parts[3] = parseFloat(parts[3]) + 0.1;
            }
            e.target.style.backgroundColor = `rgba(${parts.join(",")})`;
        }
    } else if (penMode["rainbow"]) {
        e.target.style.backgroundColor = getRandomRGBA();
    } 
}

function getGridSquareSize(size) {
    return 480 / size + "px";
}

function updateGridSize(e) {
    removeAllChildNodes(canvas);
    makeGrid(slider.value);
    if (gridOn) {
        drawGrid();
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function clearCanvas() {
    removeAllChildNodes(canvas);
    makeGrid(slider.value);
    if (gridOn) {
        drawGrid();
    }
}

function selectPenMode(e) {
    if (penMode[e.target.dataset.btnType]) {
        return; // Desired pen mode already selected
    }
    for (const mode in penMode) {
        penMode[mode] = false;
    }
    penMode[e.target.dataset.btnType] = true;

    penModeBtns.forEach(btn => btn.classList.remove("btnToggled"));

    if (e.target.id === "color-picker") {
        penBtn.classList.add("btnToggled");
        return;
    }
    e.target.classList.add("btnToggled");
}

function getRandomRGBA() {
    let randomR = getRandomInt(0, 255);
    let randomG = getRandomInt(0, 255);
    let randomB = getRandomInt(0, 255);
    let randomA = getRandomInt(3, 10) / 10;
    return `rgba(${randomR}, ${randomG}, ${randomB}, ${randomA})`;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function toggleGrid() {
    if (gridOn) {
        const gridSquares = document.querySelectorAll(".grid-square");
        gridSquares.forEach(sq => sq.style.border = "none");
        gridBtn.classList.remove("btnToggled");
    } else {
        drawGrid();
        gridBtn.classList.add("btnToggled");
    }
    gridOn = !gridOn;
}

function drawGrid() {
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach(sq => sq.style.border = "0.1px solid black");
}

function chooseColor(e) {
    pickedColor = e.target.value;
}