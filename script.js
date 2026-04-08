// Game configuration and state variables
let GOAL_CANS;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;   // Holds the interval for spawning items
let session; 
let clearCanInterval;
const timerElement = document.getElementById("timer");
const cansElement = document.getElementById("current-cans");
const goalCansElement=document.getElementById("goal-cans");
const easymode = document.getElementById("Easy");
const mediummode = document.getElementById("Medium");
const hardmode = document.getElementById("Hard");
let waterCan;
let latestCan;
let timer = 30;
let speed = 1000;
const easy ={GOAL_CANS:20,timer:50,speed:1000,selected:false};
const medium ={GOAL_CANS:30,timer:40,speed:750,selected:false};
const hard ={GOAL_CANS:40,timer:30,speed:500,selected:false};

  if(!easy.selected){easymode.addEventListener('click',easyMode);}
  if(!medium.selected){mediummode.addEventListener('click',mediumMode);}
  if(!hard.selected){hardmode.addEventListener('click',hardMode);}

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
  if(randomCell.innerHTML===''){
    randomCell.innerHTML = `
    <div class="water-can-wrapper" id="wrapper">
      <div class="water-can"></div>
    </div>
  `;
  }
}

function gainCan(i){
      if(!gameActive)return;
      if(i.target.className==="water-can")
      {
        i.target.parentNode.parentNode.innerHTML='';
      }
      else
      {
        return;
      }
      currentCans++;
      cansElement.textContent=currentCans;
      speed-=25;
      
      clearInterval(spawnInterval);
      spawnInterval=setInterval(spawnWaterCan,speed);
      if(currentCans>=GOAL_CANS)
      {
        endGame();
        document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML=''));
      }
}

function countDown(){
  timer--;
  timerElement.textContent=timer;
  if(timer<=0||currentCans>=GOAL_CANS)
  {
    endGame();
    document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML=''));
  }
}

function easyMode(){
  if(gameActive)return;
  GOAL_CANS=easy.GOAL_CANS;
  goalCansElement.textContent=GOAL_CANS;
  timer=easy.timer;
  speed=easy.speed;
  easy.selected=true;
  timerElement.textContent=timer;
  
}

function mediumMode(){
  if(gameActive)return;
  GOAL_CANS=medium.GOAL_CANS;
  goalCansElement.textContent=GOAL_CANS;
  timer=medium.timer;
  speed=medium.speed;
  medium.selected=true;
  timerElement.textContent=timer;
  
}

function hardMode(){
  if(gameActive)return;
  GOAL_CANS=hard.GOAL_CANS;
  goalCansElement.textContent=GOAL_CANS;
  timer=hard.timer;
  speed=hard.speed;
  hard.selected=true;
  timerElement.textContent=timer;
  
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;
  if(!easy.selected&&!medium.selected&&!hard.selected)
  {
    easyMode();
  }
  startGame.textContent="Reset";
  currentCans=0;
  cansElement.textContent=currentCans;
  createGrid();
  spawnInterval = setInterval(spawnWaterCan, speed); // Spawn water cans every second
  session = setInterval(countDown,1000);
}

function clearCans(i){
  i.innerHTML='';
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  easy.selected=false;
  medium.selected=false;
  hard.selected=false;
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(session);
}


// Set up click handler for the start button






