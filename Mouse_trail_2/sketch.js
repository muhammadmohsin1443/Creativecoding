// Define variables
let trail = []; // Array to store trail of mouse positions
const trailLength = 200; // Maximum number of positions in the trail (increased)
let backgroundColor; // Background color variable

function setup() {
  createCanvas(windowWidth, windowHeight); // Create canvas with full window size
  backgroundColor = color(255); // Set background color to white
}

function draw() {
  background(backgroundColor); // Clear background

  // Add current mouse position to trail
  trail.push({
    x: mouseX,
    y: mouseY,
    size: 40, // Initial size of each trail ellipse
    color: color(random(150, 255), random(100, 200), random(150, 255), 150), // Random color with transparency
  });

  // Remove oldest trail position if trail is too long
  if (trail.length > trailLength) {
    trail.shift(); // Remove the first element from the array
  }

  // Draw trail
  for (let i = 0; i < trail.length; i++) {
    let size = trail[i].size * (1 - i / trail.length); // Decrease size towards the end of the trail
    let c = trail[i].color; // Get color of this trail element
    fill(c); // Set fill color
    noStroke(); // No stroke around the ellipse
    ellipse(trail[i].x, trail[i].y, size, size); // Draw the ellipse at trail position
  }
}
