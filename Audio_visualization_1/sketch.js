// Initialize microphone and FFT (Fast Fourier Transform) for frequency analysis
let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize the microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Initialize the FFT object for frequency analysis
  fft = new p5.FFT();
  fft.setInput(mic);
  
  // Set color mode to HSB for more vibrant colors
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  // Set the background color to black
  background(0);
  
  // Get the frequency spectrum data from the FFT
  let spectrum = fft.analyze();
  noStroke();
  
  // Calculate the width of each spectrum bar
  let barWidth = width / spectrum.length;
  
  // Draw spectrum analyzer bars based on the amplitude of each frequency band
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    
    // Map the amplitude to a height value
    let y = map(amp, 0, 255, height, 0);
    
    // Map the amplitude to a hue value for color gradient
    let hue = map(amp, 0, 255, 200, 360);
    fill(hue, 80, 100);
    
    // Draw the bar
    rect(i * barWidth, y, barWidth, height - y);
  }
  
  // Draw additional features
  drawCenterCircle(); // Draw a pulsating circle in the center
  drawWaveform();     // Draw the audio waveform at the bottom
}

// Function to draw a center circle with pulsating effect based on microphone input level
function drawCenterCircle() {
  // Get the RMS (Root Mean Square) level from the microphone
  let rms = mic.getLevel();
  
  // Map the RMS value to determine the diameter and color of the circle
  let diameter = map(rms, 0, 1, 100, 400);
  let hue = map(rms, 0, 1, 200, 360);
  fill(hue, 80, 100);
  
  // Draw the pulsating circle in the center of the canvas
  ellipse(width/2, height/2, diameter);
}

// Function to draw the audio waveform at the bottom of the canvas
function drawWaveform() {
  // Get the waveform data from the FFT
  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255);         // Set stroke color to white
  strokeWeight(2);     // Set stroke weight to 2 pixels
  
  // Draw the waveform by connecting vertices
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height - 200, height - 100);
    vertex(x, y);
  }
  
  endShape(); // End the shape drawing
}

// Resize the canvas when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
