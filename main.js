let gridContainer = document.getElementById('table');
let scoreElement = document.getElementById('score');
let grid = [];
let score = 0;
let lastGridState;
const colors = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e'
};

function initializeGrid() {
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
    }
  }
}

function resetGame() {
  gridContainer.innerHTML = '';
  initializeGrid();
  score = 0;
  updateScore();
  addNewBox();
  addNewBox();
  updateGrid();
}

function addNewBox() {
  let emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }
  if (emptyCells.length > 0) {
    let { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    let newValue = Math.random() < 0.9 ? 2 : 4;
    grid[x][y] = newValue;
  }
}

function updateGrid() {
  gridContainer.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement('div');
      box.className = 'box';
      box.textContent = grid[i][j] === 0 ? '' : grid[i][j];
      box.style.backgroundColor = colors[grid[i][j]] || colors['default'];
      gridContainer.appendChild(box);
    }
    gridContainer.appendChild(document.createElement('br'));
  }
}


function move(direction) {
  let moved = false;
  lastGridState = JSON.parse(JSON.stringify(grid)); 
  switch (direction) {
    case 'up':
      moved = moveUp();
      break;
    case 'down':
      moved = moveDown();
      break;
    case 'left':
      moved = moveLeft();
      break;
    case 'right':
      moved = moveRight();
      break;
  }

  if (moved) {
    addNewBox();
    updateGrid();
    updateScore(); 
  }
}

function moveUp() {
  let moved = false;
  let toplamScore = 0; 
  for (let j = 0; j < 4; j++) {
    for (let i = 1; i < 4; i++) {
      if (grid[i][j] !== 0) {
        let k = i;
        while (k > 0 && (grid[k - 1][j] === 0 || grid[k - 1][j] === grid[k][j])) {
          if (grid[k - 1][j] === 0) {
            grid[k - 1][j] = grid[k][j];
            grid[k][j] = 0;
            k--;
            moved = true;
          } else if (grid[k - 1][j] === grid[k][j]) {
            grid[k - 1][j] *= 2;
            toplamScore += grid[k - 1][j]; 
            grid[k][j] = 0;
            moved = true;
            break; 
          }
        }
      }
    }
  }
  if (toplamScore > 0) {
    score += toplamScore;
    updateScore();
  }
  return moved;
}

function moveDown() {
    let moved = false;
    let toplamScore = 0;
    for (let j = 0; j < 4; j++) {
      for (let i = 2; i >= 0; i--) {
        if (grid[i][j] !== 0) {
          let k = i;
          while (k < 3 && (grid[k + 1][j] === 0 || grid[k + 1][j] === grid[k][j])) {
            if (grid[k + 1][j] === 0) {
              grid[k + 1][j] = grid[k][j];
              grid[k][j] = 0;
              k++;
              moved = true;
            } else if (grid[k + 1][j] === grid[k][j]) {
              grid[k + 1][j] *= 2;
              toplamScore += grid[k + 1][j];
              grid[k][j] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (toplamScore > 0) {
      score += toplamScore;
      updateScore();
    }
    return moved;
  }
  
  function moveLeft() {
    let moved = false;
    let toplamScore = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k > 0 && (grid[i][k - 1] === 0 || grid[i][k - 1] === grid[i][k])) {
            if (grid[i][k - 1] === 0) {
              grid[i][k - 1] = grid[i][k];
              grid[i][k] = 0;
              k--;
              moved = true;
            } else if (grid[i][k - 1] === grid[i][k]) {
              grid[i][k - 1] *= 2;
              toplamScore += grid[i][k - 1];
              grid[i][k] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (toplamScore > 0) {
      score += toplamScore;
      updateScore();
    }
    return moved;
  }
  
  function moveRight() {
    let moved = false;
    let toplamScore = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (grid[i][j] !== 0) {
          let k = j;
          while (k < 3 && (grid[i][k + 1] === 0 || grid[i][k + 1] === grid[i][k])) {
            if (grid[i][k + 1] === 0) {
              grid[i][k + 1] = grid[i][k];
              grid[i][k] = 0;
              k++;
              moved = true;
            } else if (grid[i][k + 1] === grid[i][k]) {
              grid[i][k + 1] *= 2;
              toplamScore += grid[i][k + 1];
              grid[i][k] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    if (toplamScore > 0) {
      score += toplamScore;
      updateScore();
    }
    return moved;
  }
  
function updateScore() {
  scoreElement.textContent = 'Score: ' + score;
}


function checkGameOver() {
  let gameIsOver = true;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0 ||
        (i > 0 && grid[i][j] === grid[i - 1][j]) ||
        (i < 3 && grid[i][j] === grid[i + 1][j]) ||
        (j > 0 && grid[i][j] === grid[i][j - 1]) ||
        (j < 3 && grid[i][j] === grid[i][j + 1])) {
        gameIsOver = false;
        break;
      }
    }
    if (!gameIsOver) break;
  }

  if (gameIsOver) {
    gameOver(); 
  }
}

  
  function gameOver() {
    alert('Game Over! Score: ' + score);
    resetGame(); 
  }


function canMove(direction) {
  let moved = false;
  switch (direction) {
    case 'up':
      moved = moveUp();
      break;
    case 'down':
      moved = moveDown();
      break;
    case 'left':
      moved = moveLeft();
      break;
    case 'right':
      moved = moveRight();
      break;
  }
  
  grid = JSON.parse(JSON.stringify(lastGridState));

  return moved;
}

document.addEventListener('keyup', function(event) {
  let key = event.key.toLowerCase();
  switch (key) {
    case 'arrowup':
      move('up');
      break;
    case 'arrowdown':
      move('down');
      break;
    case 'arrowleft':
      move('left');
      break;
    case 'arrowright':
      move('right');
      break;
  }
    checkGameOver();
});

window.onload = resetGame;