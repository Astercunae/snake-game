//board
/** @type {HTMLCanvasElement} */
let board;

let blockSize = 28;
let rows = 25;
let cols = 32;

//drawing object
let context;

//Змея
let snakeX = Math.floor(Math.random() * cols) * blockSize;
let snakeY = Math.floor(Math.random() * rows) * blockSize;

let speedX = 0;
let speedY = 0;

let snakeBody = [];
//Еда
let foodX;
let foodY;

//Игровые переменные
let gameOver = false;
let gameSpeed = 9;

//Счёт
let scoreText = document.getElementById("scoreText");
let score = 0;

//Таймер
let timer = document.getElementById("timer");
let sec = 0;
let min = 0;

//Звуки
const pickUpSound = new Audio("./audio/pickUp.mp3");
const gameOverSound = new Audio("./audio/gameOver.mp3");

window.onload = () => {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;

  //Для рисования на доске
  context = board.getContext("2d");

  // Спавним еду
  placeFood();
  //Движения по нажатию на стрелочки
  document.addEventListener("keydown", changeDirection);

  const t = setInterval(tick, 1000);
  setInterval(update, 1000 / gameSpeed);
};

async function tick() {
  sec++;
  if (sec != 60 && sec < 10) {
    timer.innerHTML = `0${min}:0${sec}`;
  } else if (sec === 60) {
    sec = 0;
    min++;
    timer.innerHTML = `0${min}:0${sec}`;
  } else {
    timer.innerHTML = `0${min}:${sec}`;
  }
}

function update() {
  if (gameOver) return;

  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
  if (
    score == 2 ||
    score == 4 ||
    score == 8 ||
    score == 12 ||
    score == 16 ||
    score == 20 ||
    score == 24 ||
    score == 28 ||
    score == 30 ||
    score == 35 ||
    score == 40 ||
    score == 45 ||
    score == 46 ||
    score == 47 ||
    score == 48 ||
    score == 49 ||
    score == 50
  )
    gameSpeed++;

  if (snakeX == foodX && snakeY == foodY) {
    pickUpSound.play();
    snakeBody.push([foodX, foodY]);
    score++;
    scoreText.innerHTML = `Score: ${score}`;
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) snakeBody[i] = snakeBody[i - 1];
   
  if (snakeBody.length) snakeBody[0] = [snakeX, snakeY];

  context.fillStyle = "lime";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //Конец игры
  if (
    snakeX < 0 ||
    snakeX > (cols - 1) * blockSize ||
    snakeY < 0 ||
    snakeY > (rows - 1) * blockSize
  ) {
    gameOverSound.play();
    alert(`Игра окончена \nВы продержались: ${min} минут ${sec} секунд\nctrl+r для рестарта`);
    gameOver = true;
    clearInterval(t);
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOverSound.play();
      alert(`Игра окончена \nВы продержались: ${min} минут ${sec} секунд\nctrl+r для рестарта`);
      gameOver = true;
      clearInterval(t);
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    speedX = 1;
    speedY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
