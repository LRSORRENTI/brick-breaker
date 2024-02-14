"use strict";
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
// Function to update the ball's position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Check for wall collisions
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
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
// Update the game loop to include drawing and updating the paddle and bricks
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw and update the ball, paddle, and bricks
    drawBall();
    updateBall();
    drawPaddle();
    updatePaddle();
    drawBricks();
    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}
// Start the game
gameLoop();
