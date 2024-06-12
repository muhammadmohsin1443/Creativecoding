function setup() {
  // Set up the canvas
  let canvasSize = 3200;  // Size of the canvas
  createCanvas(canvasSize, canvasSize);  // Create a square canvas
  noLoop();  // Draw only once
}

function draw() {
  // Draw function that runs once
  background(30);  // Set the background color

  let numDesigns = 4;  // Number of designs per row/column
  let spacing = width / numDesigns;  // Calculate spacing between designs

  // Loop through each row and column of designs
  for (let x = 0; x < numDesigns; x++) {
    for (let y = 0; y < numDesigns; y++) {
      push();  // Save the current transformation state
      translate(x * spacing + spacing / 2, y * spacing + spacing / 2);  // Position each design
      drawDesign(spacing / 2);  // Draw a single design
      pop();  // Restore the previous transformation state
    }
  }
}

function drawDesign(size) {
  // Function to draw a single design
  let layers = 6;  // Number of layers in the design
  let step = size / layers;  // Calculate step size for each layer

  // Loop through each layer of the design
  for (let i = layers; i > 0; i--) {
    let layerSize = step * i;  // Calculate size of the current layer
    drawLayer(layerSize, i);  // Draw the current layer
  }
}

function drawLayer(size, layer) {
  // Function to draw a single layer of the design
  let numShapes = 6 + layer;  // Number of shapes in the layer
  let angleStep = TWO_PI / numShapes;  // Calculate angle step between shapes

  // Loop through each shape in the layer
  for (let i = 0; i < numShapes; i++) {
    let angle = i * angleStep;  // Calculate rotation angle for the shape

    push();  // Save the current transformation state
    rotate(angle);  // Rotate the coordinate system
    translate(size / 2, 0);  // Translate to the position of the shape
    drawShape(layer, size / 2);  // Draw the shape
    pop();  // Restore the previous transformation state
  }
}

function drawShape(layer, size) {
  // Function to draw a single shape
  let numSides = 3 + layer % 4;  // Number of sides of the shape (triangle, square, etc.)
  let clr = color(255 - layer * 30, layer * 40, 200, 150);  // Color of the shape
  let gradientSteps = 10;  // Number of gradient steps

  noStroke();  // No outline for the shape

  // Loop through each gradient step
  for (let i = gradientSteps; i > 0; i--) {
    fill(lerpColor(clr, color(30), i / gradientSteps));  // Set gradient color
    polygon(0, 0, size * (i / gradientSteps), numSides);  // Draw the polygon
  }
}

function polygon(x, y, radius, npoints) {
  // Function to draw a polygon
  let angle = TWO_PI / npoints;  // Calculate angle between points
  beginShape();  // Begin drawing a shape
  for (let a = 0; a < TWO_PI; a += angle) {  // Loop through each angle
    let sx = x + cos(a) * radius;  // Calculate x position of the vertex
    let sy = y + sin(a) * radius;  // Calculate y position of the vertex
    vertex(sx, sy);  // Set vertex position
  }
  endShape(CLOSE);  // End the shape and close it
}
