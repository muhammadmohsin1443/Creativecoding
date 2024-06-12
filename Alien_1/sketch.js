// This function runs once when the program starts
function setup() {
  // Create a 400x400 pixel canvas
  createCanvas(400, 400);

  // Set the background color to white
  background(255);

  // Draw SpongeBob's body
  fill(255, 255, 0); // yellow color
  rect(100, 50, 200, 250, 20); // body rectangle with rounded corners

  // Draw SpongeBob's pants
  fill(139, 69, 19); // brown color
  rect(100, 225, 200, 75); // pants rectangle

  // Draw SpongeBob's eyes
  fill(255); // white color
  ellipse(150, 120, 50, 50); // left eye
  ellipse(250, 120, 50, 50); // right eye

  fill(0, 0, 255); // blue color
  ellipse(150, 120, 25, 25); // left iris
  ellipse(250, 120, 25, 25); // right iris

  fill(0); // black color
  ellipse(150, 120, 10, 10); // left pupil
  ellipse(250, 120, 10, 10); // right pupil

  // Draw SpongeBob's mouth
  fill(255, 0, 0); // red color
  arc(200, 180, 100, 50, 0, PI); // mouth as a half circle

  // Draw SpongeBob's teeth
  fill(255); // white color
  rect(185, 180, 15, 10); // left tooth
  rect(200, 180, 15, 10); // right tooth

  // Draw SpongeBob's nose
  fill(255, 255, 0); // yellow color
  ellipse(200, 140, 20, 40); // nose as an ellipse

  // Draw SpongeBob's tie
  fill(255, 0, 0); // red color
  beginShape();
  vertex(200, 225); // top of the tie
  vertex(190, 275); // bottom left of the tie
  vertex(210, 275); // bottom right of the tie
  endShape(CLOSE); // close the shape
  rect(195, 225, 10, 25); // tie knot

  // Draw SpongeBob's legs
  fill(255, 255, 0); // yellow color
  rect(140, 300, 20, 50); // left leg
  rect(240, 300, 20, 50); // right leg

  // Draw SpongeBob's shoes
  fill(0); // black color
  rect(130, 350, 40, 10); // left shoe
  rect(230, 350, 40, 10); // right shoe
}

// The draw function runs continuously, but here it does nothing
function draw() {
  // Drawing is done in the setup function for a static image
}
