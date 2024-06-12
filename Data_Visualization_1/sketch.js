// Initialize variables
let table;
let data;
let angles = [];
let colors = [];
let total = 0;
let labelSpace = 50; // Space for displaying labels

function preload() {
  // Load the CSV file containing the data
  table = loadTable('data.csv - Sheet1.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 400);
  background(255);

  // Read the data from the CSV file
  data = table.getRows();

  // Calculate total sum of all values
  for (let i = 0; i < data.length; i++) {
    let value = parseFloat(data[i].get('value'));
    total += value;
  }

  // Calculate angles for each slice
  let startAngle = 0;
  for (let i = 0; i < data.length; i++) {
    let value = parseFloat(data[i].get('value'));
    let angle = map(value, 0, total, 0, TWO_PI);
    angles.push(angle);
    
    // Generate a color for each slice
    let hue = map(i, 0, data.length, 0, 360);
    let c = color(hue % 360, 80, 80);
    colors.push(c);
  }

  // Display the pie chart
  drawPieChart(width/2, height/2, 200, angles, colors);
}

function drawPieChart(x, y, diameter, angles, colors) {
  let lastAngle = 0;
  for (let i = 0; i < angles.length; i++) {
    // Set fill color with gradient effect
    let c1 = colors[i];
    let c2 = lerpColor(c1, color(255), 0.2); // Lighter shade of the same color
    fill(c1);
    stroke(255);
    strokeWeight(1);

    // Draw the slice
    arc(x, y, diameter, diameter, lastAngle, lastAngle + angles[i]);

    // Draw label and percentage
    let labelAngle = lastAngle + angles[i] / 2;
    let labelX = x + cos(labelAngle) * (diameter / 2 + labelSpace);
    let labelY = y + sin(labelAngle) * (diameter / 2 + labelSpace);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(data[i].get('label'), labelX, labelY);
    let percent = nf(angles[i] / TWO_PI * 100, 1, 1);
    text(percent + '%', labelX, labelY + 20);

    lastAngle += angles[i];
  }
}
