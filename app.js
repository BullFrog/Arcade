
//Board
var blocksize = 25;
var rows = 20;
var columns = 20;
var board
var context

//Snake
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//Food
var foodX;
var foodY;

//Game
var scoreboard = 0; 
var highScore = localStorage.getItem("high-score") || 0;
var gameOver = false;

//Loading
window.onload = function game() {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = columns * blocksize;
    context = board.getContext("2d");
    document.addEventListener("keydown", changeDirection);

    writeScoreboard();
    writeHighScore();
    placeFood();
}

//Main code
function running() {

    //Board style
    context.fillStyle = "rgb(30, 30, 30)";
    context.fillRect(0, 0, board.width, board.height);

    //Food style
    context.fillStyle = "red";
    context.strokeStyle = "black"
    context.fillRect(foodX, foodY, blocksize, blocksize);
    context.strokeRect(foodX, foodY, blocksize, blocksize);

    //GameOver function
    if (gameOver) {
        displayGameOver();
        return;  
    }

    //Consuming Food & scoreboards
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        scoreboard = scoreboard + 1;
        highScore = scoreboard >= highScore ? scoreboard : highScore;
        localStorage.setItem("high-score", highScore);

        writeScoreboard();
        writeHighScore();
        placeFood();
    }

    //Makes it so the tail follows the snakes path
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
        if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //Snake style
    context.fillStyle = "black";
    context.strokeStyle = "white";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    context.strokeRect(snakeX, snakeY, blocksize, blocksize);

   
    //GameOver requirements
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
        context.strokeRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);

    }
        if (snakeX < 0 || snakeX >= columns * blocksize || snakeY < 0 || snakeY >= rows * blocksize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {

        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        }
    }
}

function changeDirection(move) {
    if (move.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
    }
    else if (move.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
    }
    else if (move.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
    }
    else if (move.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}

function writeScoreboard() {
    document.getElementById("scoreboardDiv").innerHTML = "Score: " + scoreboard;
}

function writeHighScore() {
    document.getElementById("highScoreScoreboardDiv").innerHTML = "Best: " + highScore;
}

function displayGameOver() {
    context.font = "60px MV Boli";
    context.fillStyle = "white";
    context.textAlign = "bottom";
    context.fillText("GAME OVER!", 55, 200);
    gameOver = true;
}

function restart() {
    blocksize = 25;
    rows = 20;
    columns = 20;
    board;
    context;
    snakeX = blocksize * 5;
    snakeY = blocksize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    foodX;
    foodY;
    scoreboard = 0;
    gameOver = false;

    writeScoreboard();
    writeHighScore();
    placeFood();
    running();
}

let game = setInterval(running, 100);