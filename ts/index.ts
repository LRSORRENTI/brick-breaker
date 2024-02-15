// DON'T FORGET TO RUN 'tsc --watch' before starting 
// work
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;

// Set up the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Create Game Entities
// Ball properties
const ball = {
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

function isColliding(ball: any, brick: any) {
  return (
    ball.x + ball.size > brick.x &&
    ball.x - ball.size < brick.x + brickWidth &&
    ball.y + ball.size > brick.y &&
    ball.y - ball.size < brick.y + brickHeight
  );
}

/// Function to update the ball's position and check for collisions
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for wall collisions
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  // Check for collision with the paddle
  if (
    ball.y + ball.size > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    ball.dy *= -1;
  }
  // Check for game over
  if (ball.y + ball.size > canvas.height) {
    alert('Game Over');
    document.location.reload();
  }

  // Check for collision with bricks
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (isColliding(ball, brick)) {
          ball.dy *= -1;
          brick.status = 0;
        }
      }
    }
  }
}
// Paddle properties
const paddle = {
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
  const brickRowCount = 5;
  const brickColumnCount = 9;
  const brickWidth = 73;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;
  
  const bricks: { x: number; y: number; status: number }[][] = [];
  
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
  
  // Function to draw the bricks
  // Function to draw the bricks
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
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
function setBallVelocity() {
  const difficulty = (document.getElementById('difficulty') as HTMLSelectElement).value;
  switch (difficulty) {
    case 'easy':
      ball.dx = 3;
      ball.dy = -3;
      break;
    case 'regular':
      ball.dx = 5;
      ball.dy = -5;
      break;
    case 'hard':
      ball.dx = 7;
      ball.dy = -7;
      break;
  }
}

// Listen for changes in the difficulty selector
document.getElementById('difficulty')?.addEventListener('change', () => {
  setBallVelocity();
});

// Set initial ball velocity based on default difficulty
setBallVelocity();


// Listen for changes in the difficulty selector
document.getElementById('difficulty')?.addEventListener('change', () => {
  setBallVelocity();
});

// Set initial ball velocity based on default difficulty
setBallVelocity();

  // Handle user input
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      paddle.dx = 5;
    } else if (e.key === 'ArrowLeft') {
      paddle.dx = -5;
    }
  });
  
  document.addEventListener('keyup', (e) => {
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
    } else if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
    }
  }
  
 // Game state
let gameStarted = false;

// Function to start the game
function startGame() {
  gameStarted = true;
  // Hide the start button
  (document.getElementById('startButton') as HTMLButtonElement).style.display = 'none';
}

// Listen for clicks on the start button
document.getElementById('startButton')?.addEventListener('click', startGame);

  // Check for game over
if (ball.y + ball.size > canvas.height) {
  alert('Game Over');
  setBallVelocity(); // Reset ball velocity for the new game
  document.location.reload();
}

// Check for game over
if (ball.y + ball.size > canvas.height) {
  alert('Game Over');
  gameStarted = false;
  setBallVelocity(); // Reset ball velocity for the new game
  // Show the start button again
  (document.getElementById('startButton') as HTMLButtonElement).style.display = 'block';
  document.location.reload();
}

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

  // Start the game
  gameLoop();
  