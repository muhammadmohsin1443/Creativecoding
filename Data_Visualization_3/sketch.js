let data = [45, 78, 120, 200, 90, 50, 100]; // Sample data values
let barWidth = 50;
let barHeight = 200;
let xSpacing = 100;

function setup() {
  createCanvas(800, 400);
  background(255); // Set background to white
  noStroke();
  colorMode(HSB, 360, 100, 100); // Color mode using HSB

  // Define a gradient color
  let gradient = [];
  for (let i = 0; i < 100; i++) {
    gradient.push(color(240 - i * 2, 100, 100)); // Adjusting hue for gradient
  }

  // Draw bars based on data
  for (let i = 0; i < data.length; i++) {
    drawBar(i);
  }
}

function drawBar(index) {
  let x = 50 + index * xSpacing;
  let y = height - 50;
  let h = -data[index]; // Negative height to flip bars upwards

  // Calculate the color based on the data value
  let col = color(240 - data[index], 100, 100);
  
  // Draw the bar
  fill(col);
  rect(x, y, barWidth, h);

  // Add text labels
  fill(0);
  textAlign(CENTER);
  text(data[index], x + barWidth/2, y + h - 10);
}

function mouseMoved() {
  // Highlight bars on hover
  for (let i = 0; i < data.length; i++) {
    let x = 50 + i * xSpacing;
    let y = height - 50;
    let h = -data[i];

    if (mouseX > x && mouseX < x + barWidth && mouseY > y + h && mouseY < y) {
      fill(255, 0, 0, 150); // Highlight on hover
      rect(x, y, barWidth, h);
    } else {
      fill(240 - data[i], 100, 100); // Regular color
      rect(x, y, barWidth, h);
    }
  }
}

function mouseClicked() {
  // Adjust data values on click
  for (let i = 0; i < data.length; i++) {
    let x = 50 + i * xSpacing;
    let y = height - 50;
    let h = -data[i];

    if (mouseX > x && mouseX < x + barWidth && mouseY > y + h && mouseY < y) {
      data[i] += 10; // Increase data value by 10 on click
    }
  }
  
  // Redraw canvas with updated values
  background(255); // Clear canvas
  for (let i = 0; i < data.length; i++) {
    drawBar(i);
  }
}
