// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let seed = 239;
// let yoff = 0.0;

const grassColor = "#81b387";
const skyColor = "#69ade4";
const mountainColor = "#035c4d";
const oceanColor = "#05367a";
const sandColor = "#b0a17b";
const rockColor = "#ccb999";

// class MyClass {
//     constructor(param1, param2) {
//         this.property1 = param1;
//         this.property2 = param2;
//     }

//     myMethod() {
//         // code to run when method is called
//     }
// }

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

$("#reimagine").click(function() {
  seed++;
});

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);

  background(skyColor);
  
  noStroke();
  
  fill(rockColor);
  bezier(
    689, 
    446, 
    280, 
    686, 
    -8888, 
    28, 
    689,
    95,
  );
  
  noStroke();
  
  fill(grassColor);
  // rect(0, 160, 650, 240);
  bezier(
    689, 
    346, 
    280, 
    286, 
    -796, 
    37, 
    989,
    113,
  );
  
  fill(sandColor);
  // rect(0, 230, 650, 240);
  bezier(
    689, 
    320, 
    280, 
    266, 
    -296, 
    37, 
    989,
    113,
  );
  
  noStroke();
  fill(oceanColor);
  const scrub = mouseX/width;
  let z = random();
  let x = width * (((random() + sin(scrub + millis() / 3000.0) + 150) / (z * 15)) % 1);
  let s = width / 50 / z;
  let y = height / 2 + height / 20 / z;
  
  bezier(x + 600, y - s + 100, (x - s / 4) + 100, y,( x + s / 4) - 300, y - 180, 689, 95);
  
  fill(mountainColor);
  beginShape();
  vertex(0, height / 4);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 4 - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 4);
  endShape(CLOSE);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}