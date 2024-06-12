// This array will hold all the sprinkle objects
let sprinkles = [];

// The setup function runs once when the program starts
function setup() {
  // Create a 400x400 pixel canvas
  createCanvas(400, 400);
  
  // Create 100 sprinkle objects and add them to the sprinkles array
  for (let i = 0; i < 100; i++) {
    sprinkles.push(new Sprinkle());
  }
}

// The draw function runs continuously to create animations
function draw() {
  // Set the background color to a light blue
  background(200, 220, 255);
  
  // Draw the cone
  drawCone();
  
  // Draw the ice cream scoops
  drawIceCream();
  
  // Loop through each sprinkle object
  for (let sprinkle of sprinkles) {
    // Update the position of each sprinkle
    sprinkle.update();
    
    // Display each sprinkle on the canvas
    sprinkle.display();
  }
}

// Function to draw the ice cream cone
function drawCone() {
  // Set the fill color to a cone-like brown
  fill(204, 136, 0);
  
  // Set the outline color and weight for the cone
  stroke(150, 100, 50);
  strokeWeight(2);
  
  // Begin drawing the cone shape
  beginShape();
  vertex(200, 300); // Top point of the cone
  vertex(170, 380); // Bottom left point of the cone
  vertex(230, 380); // Bottom right point of the cone
  endShape(CLOSE);  // Close the shape
  
  // Draw texture lines on the cone
  stroke(150, 100, 50);
  for (let i = 175; i < 230; i += 5) {
    line(200, 300, i, 380);
  }
}

// Function to draw the ice cream scoops
function drawIceCream() {
  // Remove the outline from the shapes
  noStroke();
  
  // Draw the bottom scoop with a pink color
  fill(255, 182, 193);
  ellipse(200, 270, 140, 140);
  
  // Draw the middle scoop with a darker pink color
  fill(255, 105, 180);
  ellipse(200, 220, 120, 120);
  
  // Draw the top scoop with an even darker pink color
  fill(255, 20, 147);
  ellipse(200, 170, 100, 100);
  
  // Add shading to make the scoops look more 3D
  fill(0, 0, 0, 50);
  ellipse(200, 280, 140, 60);
  ellipse(200, 230, 120, 50);
  ellipse(200, 180, 100, 40);
}

// Class definition for a sprinkle
class Sprinkle {
  // Constructor function to initialize a new sprinkle
  constructor() {
    // Reset the sprinkle's properties
    this.reset();
  }

  // Function to reset the sprinkle's properties
  reset() {
    // Randomly set the horizontal position of the sprinkle
    this.x = random(100, 300);  // Spread out the sprinkles horizontally
    
    // Randomly set the vertical position of the sprinkle
    this.y = random(-200, 160); // Spread out the sprinkles vertically
    
    // Randomly set the size of the sprinkle
    this.size = random(4, 8);
    
    // Randomly set the color of the sprinkle
    this.color = color(random(255), random(255), random(255));
    
    // Randomly set the speed at which the sprinkle falls
    this.fallSpeed = random(2, 5);
  }

  // Function to update the sprinkle's position
  update() {
    // Move the sprinkle down by its fall speed
    this.y += this.fallSpeed;
    
    // If the sprinkle goes off the bottom of the ice cream, reset its position
    if (this.y > 160) {  // Match the reset condition to the new range
      this.reset();
    }
  }

  // Function to display the sprinkle on the canvas
  display() {
    // Set the fill color to the sprinkle's color
    fill(this.color);
    
    // Draw the sprinkle as a small ellipse (circle)
    ellipse(this.x, this.y, this.size, this.size);
  }
}
