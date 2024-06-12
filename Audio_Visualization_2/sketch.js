// Declare variables for the song, FFT, and spectrum
let song;
let fft;
let spectrum;

// Preload the song file before setup
function preload() {
  song = loadSound('AriaMath.mp3'); // Load the song file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES); // Set angle mode to degrees
  
  // Create an FFT (Fast Fourier Transform) object
  fft = new p5.FFT();
  
  // Start playing the song
  song.play();
}

function draw() {
  background(10); // Dark background
  
  // Get the audio spectrum data
  spectrum = fft.analyze();
  
  // Draw the audio visualization
  translate(width / 2, height / 2); // Translate to the center of the canvas
  rotate(-90); // Rotate by -90 degrees for correct orientation
  
  // Set up the gradient colors
  let baseColor = color('#2E2E2E'); // Base color (dark grey)
  let colorTop = color('#08F5D7'); // Gradient top color (gold)
  let colorBottom = color('#2233B9'); // Gradient bottom color (tomato)
  
  // Iterate over the spectrum data
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i]; // Get amplitude value
    let y = map(amp, 0, 255, 0, height / 2); // Map amplitude to a height range
    
    // Calculate gradient color based on the amplitude index
    let inter = map(i, 0, spectrum.length, 0, 1); // Interpolation value
    let gradientColor = lerpColor(colorTop, colorBottom, inter); // Gradient color
    
    // Draw bars with gradient color
    stroke(gradientColor); // Set stroke color
    strokeWeight(2); // Set stroke weight
    noFill(); // No fill inside the rectangles
    rect(0, 0, y, 10); // Draw rectangles with varying heights based on amplitude
    rotate(3); // Rotate each rectangle for a spiral effect
  }
  
  // Display the song title
  textAlign(CENTER); // Center text alignment
  fill(255); // White text color
  textSize(24); // Text size
  text(song.title, 0, height / 2 - 50); // Display song title at the top of the canvas
}

// Function to handle file upload (not used in this version)
function handleFile(file) {
  if (file.type === 'audio') {
    song = loadSound(file, () => {
      song.play(); // Play the uploaded song
    });
  } else {
    console.error('Not a valid audio file.'); // Log an error if the uploaded file is not an audio file
  }
}

// Resize canvas on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}
