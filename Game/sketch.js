var screen = 0;
var y = -20;
var x = 200;
var speed = 2;
var score = 0;
var level = 1;
var levelSpeed = 2;
var bgMusic, catchSound, gameOverSound;

function preload() {
  // Load sound files
  bgMusic = loadSound('background.mp3');
  catchSound = loadSound('catch.mp3');
  gameOverSound = loadSound('game-over-39-199830.mp3');
}

function setup() {
  createCanvas(600, 400);
  bgMusic.loop();
  bgMusic.setVolume(0.1); // Set background music volume
}

function draw() {
  if (screen == 0) {
    startScreen();
  } else if (screen == 1) {
    gameOn();
  } else if (screen == 2) {
    endScreen();
  }
}

function startScreen() {
  drawGradientBackground(color(173, 216, 230), color(75, 0, 130));
  textAlign(CENTER);
  drawGradientText('WELCOME TO MY CATCHING GAME', width / 2, height / 2 - 20, color(255, 0, 0), color(0, 0, 255));
  fill(255);
  textSize(16);
  text('Click to start', width / 2, height / 2 + 20);
  reset();
}

function drawGradientBackground(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawGradientText(txt, x, y, color1, color2) {
  let steps = 10;
  textSize(32);
  for (let i = 0; i < steps; i++) {
    let inter = map(i, 0, steps, 0, 1);
    let c = lerpColor(color1, color2, inter);
    fill(c);
    text(txt, x, y);
    y += 0.5; // Slightly shift the text down for a gradient effect
  }
}

function gameOn() {
  drawBackground();
  fill(255);
  textSize(16);
  text("Score: " + score, 50, 30);
  text("Level: " + level, 50, 50);

  fill(255, 0, 0);
  ellipse(x, y, 20, 20);

  drawBasket();

  y += speed;
  if (y > height - 15 && x > mouseX - 50 && x < mouseX + 50) {
    y = -20;
    score += 1;
    catchSound.play();
    if (score % 5 == 0) { // Increase level every 5 points
      level += 1;
      levelSpeed += 1;
    }
    pickRandomSpeed();
  } else if (y > height) {
    gameOverSound.play();
    screen = 2;
  }
  if (y == -20) {
    pickRandom();
  }
}

function drawBackground() {
  background(0);
  for (let i = 0; i < width; i += 20) {
    stroke(255, 255, 255, 50);
    line(i, 0, i, height);
  }
  for (let j = 0; j < height; j += 20) {
    stroke(255, 255, 255, 50);
    line(0, j, width, j);
  }
}

function drawBasket() {
  fill(0, 255, 0);
  noStroke();
  rect(mouseX - 50, height - 15, 100, 30, 20); // Center the basket on the mouse
  fill(0, 200, 0);
  rect(mouseX - 50, height - 10, 100, 20, 20);
}

function pickRandom() {
  x = random(20, width - 20);
}

function pickRandomSpeed() {
  speed = random(2, levelSpeed);
}

function endScreen() {
  drawGradientBackground(color(50, 50, 50), color(0, 0, 0));
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('GAME OVER', width / 2, height / 2 - 20);
  textSize(16);
  text("SCORE: " + score, width / 2, height / 2 + 20);
  text('Click to play again', width / 2, height / 2 + 50);
}

function mousePressed() {
  if (screen == 0) {
    screen = 1;
  } else if (screen == 2) {
    screen = 0;
  }
}

function reset() {
  score = 0;
  level = 1;
  levelSpeed = 2;
  speed = 2;
  y = -20;
}
