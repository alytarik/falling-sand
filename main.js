const unit = 10;
const width = 800;
const height = 400;
const cols = width / unit;
const rows = height / unit;

let grid = undefined;
function setup() {
  frameRate(10);
  createCanvas(width, height);
  grid = createGrid(cols, rows);
}

function draw() {
  updateGrid();

  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(255);
      fill(grid[i][j] ? 100 : 200);
      square(i * unit, j * unit, unit);
    }
  }
}

function createGrid(x, y) {
  const grid = new Array(x);
  for (let i = 0; i < x; i++) {
    grid[i] = new Array(y);
  }
  return grid;
}

function updateGrid() {
  const newGrid = createGrid(cols, rows);
  for (let i = 0; i < cols; i++) {
    newGrid[i][rows - 1] = grid[i][rows - 1];
  }
  for (let j = rows - 2; j >= 0; j--) {
    for (let i = 0; i < cols; i++) {
      if (grid[i][j]) {
        const rand = Math.random() + Math.random() + Math.random();
        const nextCell = floor(rand) - 1;
        if (!newGrid[i + nextCell][j + 1] && !newGrid[i][j + 1])
          newGrid[i + nextCell][j + 1] = true;
        else newGrid[i][j] = true;
      }
    }
  }
  grid = newGrid;
}

function mousePressed() {
  const x = floor(mouseX / unit);
  const y = floor(mouseY / unit);
  grid[x][y] = true;
}

function mouseDragged() {
  mousePressed();
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
