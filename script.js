let GOAL_CANS;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;   // Holds the interval for spawning items
let session; //Holds game timer session 
let timer = 30;
let speed = 1000;

//Getting the Dom elements
const timerElement = document.getElementById("timer");
const cansElement = document.getElementById("current-cans");
const goalCansElement=document.getElementById("goal-cans");
const easymode = document.getElementById("Easy");
const mediummode = document.getElementById("Medium");
const hardmode = document.getElementById("Hard");
const gamebutton = document.getElementById('start-game');

//Objects for the difficulties
const easy ={GOAL_CANS:20,timer:50,speed:1000,selected:false};
const medium ={GOAL_CANS:30,timer:40,speed:750,selected:false};
const hard ={GOAL_CANS:40,timer:30,speed:500,selected:false};

//Adding event listeners to interactable DOM elements
easymode.addEventListener('click',easyMode);
mediummode.addEventListener('click',mediumMode);
hardmode.addEventListener('click',hardMode);
gamebutton.addEventListener('click', startGame);

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.id = i; // Each cell represents a grid square
    //Adds a click event listener to each cell
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
  //Chooses a random cell to place a can in 
  let randomCell = cells[Math.floor(Math.random() * cells.length)];
  //Places dom element of the water can in the grid cell
  if(randomCell.innerHTML===''){
    randomCell.innerHTML = `
    <div class="water-can-wrapper" id="wrapper">
      <div class="water-can"></div>
    </div>
  `;
  }
}
//Function to run when a can is clicked
//I is a passed through event dom, so it will return the dom is clicked with .target
function gainCan(i){
      if(!gameActive)return;
      //If the clicked object is the water can, then it removes it from the grid
      if(i.target.className==="water-can")
      {
        i.target.parentNode.parentNode.innerHTML='';
      }
      else
      {
        //Anything else just stops the function so clicking a grid cell doesnt automatically give you points
        return;
      }
      //Increments cans by 1
      currentCans++;
      //Updates textContent element to display current Cans
      cansElement.textContent=currentCans;
      //Increase the speed every time you click a can
      speed-=25;
      //Clears and updates spawnInterval to set speed changes
      clearInterval(spawnInterval);
      spawnInterval=setInterval(spawnWaterCan,speed);
      //Once currentCans reaches the goal, ends game
      if(currentCans>=GOAL_CANS)
      {
        endGame();
        document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML=''));
      }
}
//Timer function that runs in setInterval(countDown,1000);
function countDown(){
  timer--;
  timerElement.textContent=timer;
  //if timer ends or goal is reached ends game
  if(timer<=0||currentCans>=GOAL_CANS)
  {
    endGame();
    document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML=''));
  }
}

//Functions to handle difficulty settings
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







