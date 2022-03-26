let gridContainer = document.querySelector('.grid-container');
let sketchResetButton = document.querySelector('.sketch-reset-button');
let gridCell = [];

let leftClickPressed = false;
let drawing = false;


function setupGrid(rows, columns) {
  gridContainer.querySelectorAll('*').forEach((element) => element.remove());
  gridCell = [];

  for (let i = 0; i < rows; i++) {
    gridCell.push([]);
    for (let j = 0; j < columns; j++) {
      let div = document.createElement('div');
      gridContainer.appendChild(div);
      div.classList.add('grid-cell');
      gridCell[i].push(div);
    }
  }
  gridContainer.style.gridTemplate = `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`;

  gridCell.forEach((row) =>
    row.forEach((element) => element.addEventListener('mouseover', cellHoverEvent)));
}

function cellHoverEvent(e) {
  if (drawing) {
    let cellColor = window.getComputedStyle(this).backgroundColor;
    // console.log(cellColor);

    let colors = cellColor.match(/[0-9]+/ig).map(((num) => parseInt(num)));
    if(colors.reduce((sum, element) => sum + element, 0) === 0) {
      for(let i = 0; i < 3; i++) {
        colors[i] = Math.floor(Math.random() * 256);
      }
    } else {
      for(let i = 0; i < 3; i++) {
        colors[i] = Math.floor(colors[i] * .7);
      }
    }
    console.log(colors);
    this.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]}`;
  }
}

function sketchResetButtonPressed(e) {
  let gridSize = window.prompt('New Grid Size(max = 100) = ');

  if(isNaN(gridSize)) {
    gridSize = 16;
  }

  if(gridSize > 100) {
    gridSize = 100;
  }

  if(gridSize < 2) {
    gridSize = 2;
  }

  console.log(`gridSize = ${gridSize}`);

  setupGrid(gridSize, gridSize);
}

function mouseEvent(e) {
  if(e.type === 'mousedown') {
    leftClickPressed = true;
  } else if(e.type === 'mouseup') {
    leftClickPressed = false;
  }

  drawing = leftClickPressed;
}

setupGrid(50, 50);

gridContainer.addEventListener('mousedown', mouseEvent);
window.addEventListener('mouseup', mouseEvent);
sketchResetButton.addEventListener('click', sketchResetButtonPressed);
