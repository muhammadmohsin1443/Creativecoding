let table; // CSV table object
let bars = []; // Array to store Bar objects

function preload() {
  // Load the CSV file
  table = loadTable('data.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 600);

  // Parse the CSV file and create Bar objects
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let name = row.getString('name');
    let value = row.getNum('value');
    bars.push(new Bar(name, value, i));
  }

  // Sort bars by value (descending order)
  bars.sort((a, b) => b.value - a.value);

  // Define colors and other parameters
  let barColor = color('#4CAF50'); // Base color for bars
  let textColor = color('#FFFFFF'); // Text color
  let barWidth = 50; // Width of each bar
  let maxBarHeight = height - 100; // Maximum height for bars
  let padding = 20; // Padding between bars
  let maxValue = bars[0].value; // Maximum value in the dataset

  // Draw the bars and labels
  for (let i = 0; i < bars.length; i++) {
    let bar = bars[i];
    let x = padding * (i + 1) + i * barWidth; // X position of the bar
    let barHeight = map(bar.value, 0, maxValue, 0, maxBarHeight); // Height of the bar
    let y = height - barHeight - padding; // Y position of the bar
    
    // Draw the bar
    fill(lerpColor(barColor, color(255), i / bars.length)); // Gradient fill color
    rect(x, y, barWidth, barHeight); // Draw the rectangle for the bar
    
    // Draw the name label
    fill(textColor); // Text color
    textAlign(CENTER, CENTER); // Center align text
    text(bar.name, x + barWidth / 2, y + barHeight + 20); // Display the name label
    
    // Draw the value label
    text(bar.value, x + barWidth / 2, y - 10); // Display the value label above the bar
  }
}

// Class to represent a bar in the bar chart
class Bar {
  constructor(name, value, index) {
    this.name = name; // Name of the bar
    this.value = value; // Value of the bar
    this.index = index; // Index of the bar
  }
}
