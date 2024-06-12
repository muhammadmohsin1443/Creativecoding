let particles_a = []; // Array to store the first set of particles
let particles_b = []; // Array to store the second set of particles
let particles_c = []; // Array to store the third set of particles
let nums = 200; // Number of particles in each array
let noiseScale = 800; // Scale for the noise function to control particle movement
let logo; // Variable to store the logo image
let sound; // Variable to store the sound file
let fft; // Variable for the Fast Fourier Transform to analyze audio
let amplitude; // Variable to get the amplitude of the audio
let logoSize = 200; // Size of the logo to be displayed

function preload() {
  logo = loadImage('meta (1).png'); // Load the logo image before the program starts
  sound = loadSound('AriaMath.mp3'); // Load the sound file before the program starts
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the window
  background(255, 255, 255); // Set the initial background to white
  width = 1024; // Set canvas width
  height = 768; // Set canvas height
  background(0); // Set the background to black
  
  // Initialize the particles arrays with Particle objects
  for (var i = 0; i < nums; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
  }

  fft = new p5.FFT(); // Initialize the FFT object
  amplitude = new p5.Amplitude(); // Initialize the amplitude object
  sound.loop(); // Start playing the sound file in a loop
}

function draw() {
  background(0, 100); // Set a semi-transparent black background to create a fade effect
  filter(BLUR, 2); // Apply a blur filter to the entire canvas for a smooth effect

  smooth(); // Enable anti-aliasing for smoother graphics
  noStroke(); // Disable drawing outlines for shapes

  // Loop through each particle and update its position and display it
  for (let i = 0; i < nums; i++) {
    let radius = map(i, 0, nums, 1, 2); // Map particle index to radius size
    let alpha = map(i, 0, nums, 0, 250); // Map particle index to alpha value for transparency

    fill(255, 41, 86, alpha); // Set fill color for particles_a with transparency
    particles_a[i].move(); // Move the particle
    particles_a[i].display(radius, 2); // Display the particle with a specific radius
    particles_a[i].checkEdge(); // Check if the particle is out of bounds

    fill(0, 0, 255, alpha); // Set fill color for particles_b with transparency
    particles_b[i].move(); // Move the particle
    particles_b[i].display(radius); // Display the particle with a specific radius
    particles_b[i].checkEdge(); // Check if the particle is out of bounds

    fill(0, 183, 208, alpha); // Set fill color for particles_c with transparency
    particles_c[i].move(); // Move the particle
    particles_c[i].display(radius); // Display the particle with a specific radius
    particles_c[i].checkEdge(); // Check if the particle is out of bounds
  }

  // Audio visualization
  let spectrum = fft.analyze(); // Analyze the sound spectrum
  let audioLevel = amplitude.getLevel(); // Get the current amplitude level of the sound
  let maxRadius = 300; // Maximum radius for the audio visualization circles

  stroke(255); // Set stroke color to white
  noFill(); // Disable filling shapes
  for (let i = 0; i < 5; i++) {
    let r = map(audioLevel, 0, 1, 100, maxRadius) * (i + 1); // Map audio level to radius size
    ellipse(width / 2, height / 2, r, r); // Draw an ellipse centered at the canvas with the calculated radius
  }

  // Draw waves around the logo
  let wave = fft.waveform(); // Get the waveform data from the FFT
  beginShape(); // Start defining a shape
  stroke(27, 41, 180); // Set stroke color for the waveform
  strokeWeight(2); // Set stroke weight for the waveform
  for (let i = 0; i < wave.length; i++) {
    let angle = map(i, 0, wave.length, 0, TWO_PI); // Map waveform index to an angle around a circle
    let r = map(wave[i], -1, 1, logoSize / 2, maxRadius); // Map waveform value to radius size
    let x = width / 2 + r * cos(angle); // Calculate x position based on angle and radius
    let y = height / 2 + r * sin(angle); // Calculate y position based on angle and radius
    vertex(x, y); // Define a vertex at the calculated position
  }
  endShape(CLOSE); // Close the shape

  // Draw the logo in the center
  imageMode(CENTER); // Set image mode to center
  image(logo, width / 2, height / 2, logoSize, logoSize); // Draw the logo image at the center with the specified size
}

function Particle(x, y) {
  this.dir = createVector(0, 0); // Direction vector for the particle
  this.vel = createVector(0, 0); // Velocity vector for the particle
  this.pos = createVector(x, y); // Position vector for the particle
  this.speed = 0.4; // Speed of the particle

  this.move = function() {
    var angle = noise(this.pos.x / noiseScale, this.pos.y / noiseScale) * TWO_PI * noiseScale; // Calculate angle based on noise
    this.dir.x = cos(angle); // Calculate x component of direction based on angle
    this.dir.y = sin(angle); // Calculate y component of direction based on angle
    this.vel = this.dir.copy(); // Copy direction to velocity
    this.vel.mult(this.speed); // Scale velocity by speed
    this.pos.add(this.vel); // Update position by adding velocity
  }

  this.checkEdge = function() {
    if (this.pos.x > windowWidth || this.pos.x < 0 || this.pos.y > windowHeight || this.pos.y < 0) { // Check if the particle is out of bounds
      this.pos.x = random(50, windowWidth); // Reset x position randomly within the window
      this.pos.y = random(50, windowHeight); // Reset y position randomly within the window
    }
  }

  this.display = function(r) {
    ellipse(this.pos.x, this.pos.y, r, r); // Draw the particle as an ellipse at its position with the specified radius
  }
}
