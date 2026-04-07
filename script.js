// Game configuration and state variables
const GOAL_CANS = 20;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;   // Holds the interval for spawning items
let session; 
let clearCanInterval;
const timerElement = document.getElementById("timer");
const cansElement = document.getElementById("current-cans");
let waterCan;
let latestCan;
let timer = 30;
let speed = 1000;
let array=[];

const gamebutton = document.getElementById('start-game');
gamebutton.addEventListener('click', startGame);

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.id = i; // Each cell represents a grid square
    cell.addEventListener('click',gainCan);
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return;
  // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  let randomCell = cells[Math.floor(Math.random() * cells.length)];
  let randomCellId=document.getElementById(randomCell.id);
  array.unshift(randomCellId);
  if(randomCell.innerHTML==""){
    randomCell.innerHTML = `
    <div class="water-can-wrapper" id="wrapper">
      <div class="water-can"></div>
    </div>
  `;
  }
}

function gainCan(){
      if(array.length<1) return;
      currentCans++;
      cansElement.textContent=currentCans;
      clearCans();

      speed-=10;
      clearInterval(spawnInterval);
      spawnInterval=setInterval(spawnWaterCan,speed);
}

function countDown(){
  timer--;
  timerElement.textContent=timer;
  if(timer<=0||currentCans>25)
  {
    endGame();
    document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML=''));
  }
  
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;
  startGame.textContent="Reset";
  timer=30;
  currentCans=0;
  speed=1000;
  cansElement.textContent=currentCans;
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, speed); // Spawn water cans every second
  session = setInterval(countDown,1000);
  //clearCanInterval= setInterval(clearCans,3000);
}

function clearCans(){
  array[array.length-1].innerHTML='';
  array.pop();
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(session);
}

// Set up click handler for the start button






