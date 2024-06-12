var img;
var blurred = true;

function preload(){
  img=loadImage("ben10.jpg");
}

function setup() {
  createCanvas(510, 510);
  background (0);
}

function draw() {
  background(220);
  if(blurred){
    image(img,0,0, img.width/2, img.height/2);
    filter(BLUR, 3); 
  } else {
    image(img,0,0, img.width/2, img.height/2);
  }
}

function mousePressed() {
  if(mouseX > 0 && mouseX < img.width/2 && mouseY > 0 && mouseY < img.height/2){
    blurred = !blurred; 
  }
}
