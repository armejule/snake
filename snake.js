// Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var intervalTimer = 300;
var Counter = 0;
var gameOver = false;

// Snake
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
var snakeImage = new Image();
snakeImage.src = 'snake.png';

// Food
var foodX;
var foodY;
var foodImage = new Image();
foodImage.src = 'pompoen.png'; 

function start() {
    // Variables resetten
    gameOver = false;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    Counter = 0;
    intervalTimer = 300;
    document.getElementById("Counter").textContent = "0";
    document.getElementById("Start").style.display = "none";
    document.getElementById("title").style.display = "none";
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    board.style.display = "inline";
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, intervalTimer);
}

function update() {
    if (gameOver) {
        document.getElementById("Start").style.display = "inline";
        document.getElementById("title").style.display = "inline";
        board.style.display = "none";
        return;
    }
    
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    
    for (let segment of snakeBody) {
        context.drawImage(snakeImage, segment[0], segment[1], blockSize, blockSize);
    }
    
    context.drawImage(snakeImage, snakeX, snakeY, blockSize, blockSize);
    
    context.drawImage(foodImage, foodX, foodY, blockSize, blockSize);
    
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        Counter += 10;
        document.getElementById("Counter").textContent = Counter;
        placeFood();
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }
}

function placeFood() {
    do {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    } while (snakeBody.some(segment => segment[0] === foodX && segment[1] === foodY));
}

function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
}
