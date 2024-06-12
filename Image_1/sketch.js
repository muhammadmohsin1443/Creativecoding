var img, x,y;
function preload () {
  img = loadImage('pancake.jpg');
}


function setup() {
  createCanvas (400, 400);
}


function draw() {
  background (220);
  x = mouseX;
  y = mouseY;
  image(img,0,0,img.width/1, img.height/1);
  var c = get(x,y);
  fill(c);
  ellipse(x,y,50,50);
  }