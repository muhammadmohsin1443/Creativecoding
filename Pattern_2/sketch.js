// This function runs once when the program starts
function setup() {
  // Create a 600x600 pixel canvas
  createCanvas(600, 600);

  // Ensure the draw function only runs once
  noLoop(); 
}

// This function runs once to draw on the canvas
function draw() {
  // Set the background color to white
  background(255);

  // Call the function to draw the pattern
  drawPattern();
}

// Function to draw a pattern of gradient circles
function drawPattern() {
  // Set the number of rows and columns
  let rows = 10;
  let cols = 10;

  // Calculate the size of each cell in the grid
  let cellSize = width / cols;

  // Loop through each row
  for (let y = 0; y < rows; y++) {
    // Loop through each column
    for (let x = 0; x < cols; x++) {
      // Calculate the x and y position for each cell
      let xPos = x * cellSize;
      let yPos = y * cellSize;

      // Draw a gradient circle at the calculated position
      drawGradientCircle(xPos, yPos, cellSize);
    }
  }
}

// Function to draw a gradient circle at (x, y) with the given size
function drawGradientCircle(x, y, size) {
  // Create a radial gradient
  let gradient = drawingContext.createRadialGradient(
    x + size / 2, y + size / 2, size * 0.1,  // inner circle
    x + size / 2, y + size / 2, size / 2     // outer circle
  );

  // Add color stops to the gradient
  gradient.addColorStop(0, color(255, 204, 0)); // yellow at the center
  gradient.addColorStop(1, color(0, 102, 204)); // blue at the edge

  // Set the fill style to the gradient
  drawingContext.fillStyle = gradient;

  // Disable stroke
  noStroke();

  // Draw an ellipse with the gradient fill
  ellipse(x + size / 2, y + size / 2, size, size);
}
