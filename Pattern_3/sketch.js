// This function runs once when the program starts
function setup() {
  // Create an 800x800 pixel canvas
  createCanvas(800, 800);

  // Ensure the draw function only runs once
  noLoop();
}

// This function runs once to draw on the canvas
function draw() {
  // Set the background color to white
  background(255);

  // Set the number of columns and rows
  let cols = 10;
  let rows = 10;

  // Calculate the size of each cell in the grid
  let cellSize = width / cols;

  // Define an array of colors
  let colors = [
    color(255, 204, 204), // light red
    color(204, 255, 204), // light green
    color(204, 204, 255), // light blue
    color(255, 255, 204), // light yellow
    color(204, 255, 255), // light cyan
    color(255, 204, 255)  // light magenta
  ];

  // Loop through each column
  for (let i = 0; i < cols; i++) {
    // Loop through each row
    for (let j = 0; j < rows; j++) {
      // Calculate the x and y position for each cell
      let x = i * cellSize;
      let y = j * cellSize;

      // Draw the pattern at the calculated position
      drawPattern(x, y, cellSize, colors);
    }
  }
}

// Function to draw a pattern at (x, y) with the given size and colors
function drawPattern(x, y, size, colors) {
  // Save the current drawing style settings
  push();

  // Move the origin to the center of the cell
  translate(x + size / 2, y + size / 2);

  // Rotate the drawing context by a random angle
  rotate(radians(random(360)));

  // Draw multiple gradient circles decreasing in size
  for (let i = size; i > 0; i -= size / 5) {
    // Pick two random colors from the array
    let c1 = colors[int(random(colors.length))];
    let c2 = colors[int(random(colors.length))];

    // Create a radial gradient
    let gradient = drawingContext.createRadialGradient(0, 0, i, 0, 0, 0);
    gradient.addColorStop(0, c1.toString()); // start color
    gradient.addColorStop(1, c2.toString()); // end color

    // Set the fill style to the gradient
    drawingContext.fillStyle = gradient;

    // Draw an ellipse with the gradient fill
    ellipse(0, 0, i, i);
  }

  // Restore the original drawing style settings
  pop();
}
