// This function runs once when the program starts
function setup() {
  // Create a 400x400 pixel canvas
  createCanvas(400, 400);

  // Set the background color to white
  background(255);

  // Draw Patrick's body
  fill(255, 105, 180); // pink color
  beginShape(); 
  vertex(200, 100); // top point
  vertex(150, 250); // bottom left point
  vertex(200, 300); // bottom center point
  vertex(250, 250); // bottom right point
  endShape(CLOSE); // close the shape

  // Draw Patrick's shorts
  fill(0, 255, 0); // green color
  beginShape();
  vertex(170, 250); // top left point of shorts
  vertex(150, 300); // bottom left point of shorts
  vertex(250, 300); // bottom right point of shorts
  vertex(230, 250); // top right point of shorts
  endShape(CLOSE); // close the shape

  // Draw Patrick's eyes
  fill(255); // white color
  ellipse(180, 150, 40, 40); // left eye
  ellipse(220, 150, 40, 40); // right eye

  fill(0); // black color
  ellipse(180, 150, 10, 10); // left pupil
  ellipse(220, 150, 10, 10); // right pupil

  // Draw Patrick's mouth
  fill(255, 0, 0); // red color
  arc(200, 200, 60, 30, 0, PI); // mouth as a half circle

  // Draw Patrick's legs
  fill(255, 105, 180); // pink color
  rect(170, 300, 20, 50); // left leg
  rect(210, 300, 20, 50); // right leg

  // Draw Patrick's feet
  fill(0); // black color
  rect(160, 350, 40, 10); // left foot
  rect(200, 350, 40, 10); // right foot
}

// The draw function runs continuously, but here it does nothing
function draw() {
  // Drawing is done in the setup function for a static image
}
