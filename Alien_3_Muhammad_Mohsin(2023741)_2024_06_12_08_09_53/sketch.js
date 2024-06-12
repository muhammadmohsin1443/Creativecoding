// This function runs once when the program starts
function setup() {
  // Create a 400x400 pixel canvas
  createCanvas(400, 400);

  // Set the background color to white
  background(255);

  // Draw the character at position (200, 200)
  drawCharacter(200, 200);
}

// Function to draw the character at position (x, y)
function drawCharacter(x, y) {
  // Draw the head
  fill(255, 220, 180); // skin color
  ellipse(x, y - 100, 80, 100); // head as an ellipse

  // Draw the eyes
  fill(255); // white color
  ellipse(x - 20, y - 110, 20, 20); // left eye
  ellipse(x + 20, y - 110, 20, 20); // right eye
  fill(0); // black color
  ellipse(x - 20, y - 110, 10, 10); // left pupil
  ellipse(x + 20, y - 110, 10, 10); // right pupil

  // Draw the mouth
  fill(255, 0, 0); // red color
  arc(x, y - 80, 40, 20, 0, PI); // mouth as a half circle

  // Draw the body
  fill(100, 150, 255); // blue color
  rect(x - 25, y - 50, 50, 100, 10); // body rectangle with rounded corners

  // Draw the arms
  fill(255, 220, 180); // skin color
  rect(x - 50, y - 50, 20, 80, 10); // left arm rectangle with rounded corners
  rect(x + 30, y - 50, 20, 80, 10); // right arm rectangle with rounded corners

  // Draw the legs
  fill(100, 150, 255); // blue color
  rect(x - 20, y + 50, 20, 80, 10); // left leg rectangle with rounded corners
  rect(x + 0, y + 50, 20, 80, 10); // right leg rectangle with rounded corners

  // Draw the hands
  fill(255, 220, 180); // skin color
  ellipse(x - 40, y + 30, 20, 20); // left hand as an ellipse
  ellipse(x + 40, y + 30, 20, 20); // right hand as an ellipse

  // Draw the feet
  fill(100, 150, 255); // blue color
  ellipse(x - 10, y + 130, 30, 20); // left foot as an ellipse
  ellipse(x + 10, y + 130, 30, 20); // right foot as an ellipse
}
