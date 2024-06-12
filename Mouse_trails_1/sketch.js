// Array to store trail segments
let trail = [];
// Initial size of the trail segments
let originalSize = 20;
// Maximum size the trail segments can grow to
let maxSize = 50;
// Number of steps in the gradient
let gradientResolution = 20;

function setup() {
  // Create a canvas that fills the window
  createCanvas(windowWidth, windowHeight);
  // No fill for shapes
  noFill();
}

function draw() {
  // Semi-transparent background to create a trailing effect
  background(0, 10);

  // Add new trail segment
  let segment = {
    x: mouseX, // X-coordinate of the mouse
    y: mouseY, // Y-coordinate of the mouse
    size: originalSize, // Size of the segment
    hue: random(0, 360), // Random color hue
    saturation: 80, // Color saturation
    brightness: 90 // Color brightness
  };
  trail.push(segment);

  // Remove oldest segment if the trail gets too long
  if (trail.length > 30) {
    trail.shift();
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 0, 255); // Calculate transparency
    let size = trail[i].size; // Size of the segment
    let hue = trail[i].hue; // Color hue
    let saturation = trail[i].saturation; // Color saturation
    let brightness = trail[i].brightness; // Color brightness

    // Calculate gradient parameters
    let gradientRadius = size * 2; // Radius of the gradient
    let centerX = trail[i].x; // X-coordinate of the center of the segment
    let centerY = trail[i].y; // Y-coordinate of the center of the segment

    // Create radial gradient
    for (let j = 0; j <= gradientResolution; j++) {
      let inter = map(j, 0, gradientResolution, 0, 1); // Interpolation value
      let interColor = lerpColor(color(0, 0, 0, 0), color(hue, saturation, brightness, alpha), inter); // Calculate interpolated color
      fill(interColor); // Set fill color
      noStroke(); // No outline

      // Calculate size of the gradient circle
      let gradientSize = map(j, 0, gradientResolution, 0, gradientRadius);
      // Draw the gradient circle
      ellipse(centerX, centerY, gradientSize * 2);
    }
  }
}

function mousePressed() {
  // Change the color of the trail segments on mouse press
  for (let i = 0; i < trail.length; i++) {
    trail[i].hue = random(0, 360); // Randomize color hue
  }
}

function mouseClicked() {
  if (mouseButton === LEFT) {
    // Increase the size of the trail segments on single click
    originalSize = maxSize;
  }
}

function doubleClicked() {
  // Reset the size and color of the trail segments on double click
  originalSize = 20; // Reset size
  for (let i = 0; i < trail.length; i++) {
    trail[i].hue = random(0, 360); // Randomize color hue
  }
}

function windowResized() {
  // Resize the canvas to fill the window if it's resized
  resizeCanvas(windowWidth, windowHeight);
}
