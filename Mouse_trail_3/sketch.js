// Array to store trail objects
let trails = [];

// Background color variable
let bgColor;

function setup() {
  // Create canvas with the size of the window
  createCanvas(windowWidth, windowHeight);

  // Set color mode to HSB for easier color management
  colorMode(HSB, 360, 100, 100, 1);

  // Define a dark background color
  bgColor = color(10, 10, 20);

  // Create initial trail objects
  for (let i = 0; i < 20; i++) {
    trails.push(new Trail(random(width), random(height)));
  }
}

function draw() {
  // Set the background to the dark color
  background(bgColor);

  // Update and display each trail
  for (let i = trails.length - 1; i >= 0; i--) {
    trails[i].update();
    trails[i].display();

    // Remove trails that are off screen
    if (trails[i].offscreen()) {
      trails.splice(i, 1);
    }
  }

  // Add new trail objects on mouse press
  if (mouseIsPressed) {
    trails.push(new Trail(mouseX, mouseY));
  }
}

// Trail class definition
class Trail {
  constructor(x, y) {
    // Array to store the trail's path history
    this.history = [];

    // Initial size of the trail
    this.size = random(20, 80);

    // Random hue for color variation
    this.hue = random(0, 360);

    // Initial opacity of the trail
    this.opacity = 100;

    // Maximum number of history points
    this.maxHistory = int(random(100, 300));

    // Initial position of the trail
    this.x = x;
    this.y = y;

    // Initial angle and rotation speed of the trail
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.05, 0.05);

    // Speed of the trail
    this.speed = random(1, 3);

    // Flag to control growing and shrinking
    this.growing = true;

    // Maximum size of the trail
    this.maxSize = this.size * 4;
  }

  // Update the trail's position and properties
  update() {
    this.angle += this.rotationSpeed;
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    let v = createVector(this.x, this.y);
    this.history.push(v);

    // Limit the number of history points
    if (this.history.length > this.maxHistory) {
      this.history.splice(0, 1);
    }

    // Grow and shrink effect
    if (this.growing) {
      this.size += 0.5;
      if (this.size > this.maxSize) {
        this.growing = false;
      }
    } else {
      this.size -= 0.5;
      if (this.size < 1) {
        this.size = 1;
      }
    }
  }

  // Display the trail
  display() {
    noFill();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let alpha = map(i, 0, this.history.length, 0, this.opacity);
      strokeWeight(map(i, 0, this.history.length, this.size, 0));
      stroke(this.hue, 80, 80, alpha);
      vertex(pos.x, pos.y);
    }
    endShape();
  }

  // Check if the trail is off screen
  offscreen() {
    return (this.x < -this.size ||
            this.x > width + this.size ||
            this.y < -this.size ||
            this.y > height + this.size);
  }
}
