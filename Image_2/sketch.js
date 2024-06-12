let img;
let x, y;

function preload() {
  img = loadImage('ice cream.jpg');
}

function setup() {
  createCanvas(1020, 1020);
  background(0);
  noStroke();
}

function draw() {
  for (let i = 0; i < 100; i++) { // Increase the number of ellipses drawn per frame
    x = int(random(width));
    y = int(random(height));
    
    // Sample color directly from the image
    let c = img.get(x, y);
    
    // Set alpha value
    c[3] = 50;
    
    fill(c);
    ellipse(x, y, 30, 30);
  }
}
