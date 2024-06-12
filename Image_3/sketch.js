var flower;

function preload(){
  flower = loadImage("art.jpg");
}

function setup() {
  createCanvas(400, 400);
  flower.resize(width, height); // Resize the image to fit the canvas
}

function draw() {
  background(220);
  
  image(flower, 0, 0);
  
  var m = map(mouseX, 0, width, 2, 20);
  
  filter(POSTERIZE, m);
}
