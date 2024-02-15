"use strict";
var _a, _b, _c;
// DON'T FORGET TO RUN 'tsc --watch' before starting 
// work
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Set up the canvas dimensions
canvas.width = 800;
canvas.height = 600;
// Create Game Entities
// Ball properties
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    dx: 5,
    dy: -5
};
// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#99ff00';
    ctx.fill();
    ctx.closePath();
}
function isColliding(ball, brick) {
    return (ball.x + ball.size > brick.x &&
        ball.x - ball.size < brick.x + brickWidth &&
        ball.y + ball.size > brick.y &&
        ball.y - ball.size < brick.y + brickHeight);
}
// Function to update the ball's position and check for collisions
// Function to update the ball's position and check for collisions
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Check for wall collisions
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    // Check for collision with the paddle
    if (ball.y + ball.size > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        ball.dy *= -1;
    }
    // Check for game over
    if (ball.y + ball.size > canvas.height) {
        alert('Game Over');
        resetGame();
    }
    // Check for collision with bricks
    brickLoop: for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brick = bricks[c][r];
            if (brick.status === 1) {
                if (isColliding(ball, brick)) {
                    ball.dy *= -1;
                    brick.status = 0;
                    break brickLoop; // Break out of the loop after breaking one brick
                }
            }
        }
    }
}
// Paddle properties
var paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 30,
    width: 80,
    height: 10,
    dx: 0
};
// Function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
// Bricks properties
var brickRowCount = 5;
var brickColumnCount = 9;
var brickWidth = 73;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// Function to draw the bricks
// Function to draw the bricks
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// Function to set ball velocity based on difficulty
// Function to set ball velocity based on difficulty
function setBallVelocity() {
    var difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'easy':
            ball.dx = 2; // Slower than before
            ball.dy = -2;
            break;
        case 'regular':
            ball.dx = 3; // Now the same as the old easy mode
            ball.dy = -3;
            break;
        case 'hard':
            ball.dx = 5; // Now the same as the old regular mode
            ball.dy = -5;
            break;
    }
}
// Listen for changes in the difficulty selector
(_a = document.getElementById('difficulty')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    setBallVelocity();
});
// Set initial ball velocity based on default difficulty
setBallVelocity();
// Listen for changes in the difficulty selector
(_b = document.getElementById('difficulty')) === null || _b === void 0 ? void 0 : _b.addEventListener('change', function () {
    setBallVelocity();
});
// Set initial ball velocity based on default difficulty
setBallVelocity();
// Handle user input
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        paddle.dx = 5;
    }
    else if (e.key === 'ArrowLeft') {
        paddle.dx = -5;
    }
});
document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
});
// Function to update the paddle's position
function updatePaddle() {
    paddle.x += paddle.dx;
    // Prevent the paddle from going out of bounds
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    else if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}
// Game state
var gameStarted = false;
// Function to start the game
function startGame() {
    gameStarted = true;
    // Hide the start button
    document.getElementById('startButton').style.display = 'none';
}
// Listen for clicks on the start button
(_c = document.getElementById('startButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', startGame);
// Update the game loop to check if the game has started
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw the paddle and bricks
    drawPaddle();
    drawBricks();
    // Update the paddle's position
    updatePaddle();
    // Update and draw the ball only if the game has started
    if (gameStarted) {
        updateBall();
        drawBall();
    }
    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}
function resetGame() {
    // Reset ball position and velocity
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    setBallVelocity();
    // Reset bricks
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r].status = 1;
        }
    }
    // Reset game state
    gameStarted = false;
    document.getElementById('startButton').style.display = 'block';
}
// Start the game
gameLoop();
