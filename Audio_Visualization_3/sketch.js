// Variables for mic input and FFT
let mic, fft;

// Variables for gradient background
let bgColor1, bgColor2;

// Variables for circle colors
let circleColors = [];

// Setup function runs once at the beginning
function setup() {
  // Canvas size and background setup
  createCanvas(windowWidth, windowHeight);
  
  // Define gradient colors for background
  bgColor1 = color(43, 4, 48);  // Purple
  bgColor2 = color(153, 0, 86);  // Magenta

  // Get microphone input
  mic = new p5.AudioIn();
  mic.start();

  // Create FFT analyzer
  fft = new p5.FFT();

  // Set up FFT to analyze microphone input
  fft.setInput(mic);

  // Generate random colors for circles
  for (let i = 0; i < 100; i++) {
    let col = color(random(255), random(255), random(255));
    circleColors.push(col);
  }
}

// Draw function runs every frame
function draw() {
  // Calculate amplitude from microphone input
  let micLevel = mic.getLevel();
  
  // Map micLevel to a reasonable range
  let circleSize = map(micLevel, 0, 1, 10, 200);

  // Calculate FFT spectrum analysis
  let spectrum = fft.analyze();

  // Set the background gradient based on mic input
  setGradient(0, 0, width, height, bgColor1, bgColor2, "Y");

  // Draw circles based on spectrum analysis
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let spectrumValue = spectrum[i];
    let index = floor(map(i, 0, spectrum.length, 0, circleColors.length));
    let circleColor = circleColors[index];
    fill(circleColor);
    ellipse(width / 2, height / 2, circleSize + spectrumValue);
  }

  // Add some text
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Mic Input Oscillator", width / 2, 50);
  textSize(16);
  text("Sing or make noise to see the effect!", width / 2, 80);
}

// Function to create gradient background
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  
  if (axis === "Y") {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
