//  js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called  js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const w1 = function(w) {
  /* exported preload, setup, draw, placeTile */

  /* global generateGrid drawGrid */

  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;

  w.preload = function() {
    w.tilesetImage = w.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
    );
  }

  w.reseed = function() {
    w.seed = (w.seed | 0) + 1109;
    w.randomSeed(w.seed);
    w.noiseSeed(w.seed);
    w.select("#seedReport").html("seed " + w.seed);
    w.regenerateGrid();
  }

  w.regenerateGrid = function() {
    w.select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
    w.reparseGrid();
  }

  w.reparseGrid = function() {
    w.currentGrid = stringToGrid(w.select("#asciiBox").value());
    // console.log(w.currentGrid);
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    // console.log(grid)
    return grid;
  }

  w.setup = function() {
    numCols = w.select("#asciiBox").attribute("rows") | 0;
    numRows = w.select("#asciiBox").attribute("cols") | 0;

    w.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
    w.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    w.select("#reseedButton").mousePressed(w.reseed);
    w.select("#asciiBox").input(w.reparseGrid);

    w.reseed();
  }


  w.draw = function() {
    w.randomSeed(w.seed);
    w.drawGrid(w.currentGrid);

  }

  function placeTile(i, j, ti, tj) {
    w.image(w.tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }



/* exported generateGrid, drawGrid */
/* global placeTile */

  function gridCheck(grid, i, j, target) {
    //used help from chatgpt
    // Check if within bounds
    // if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
      // Check if the cell matches the target
    return grid[i][j] === target;
    // }
    // return false;
  }


  function gridCode(grid, i, j, target) {
    //used help from chatgpt
    let northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0; // North
    let southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0; // South
    let eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;  // East
    let westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;  // West

    // Combine bits to form the code
    return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
  }


  function drawContext(grid, i, j, target, ti, tj) {
    //used help from chatgpt
    const code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }


  const lookup = [
    [[10, 13]], // N/A
    [[10, 12]], // N
    [[10, 14]], // S
    [[10, 12],[10, 14]], // N + S
    [[11, 13]], // E
    [[11, 12]], // NE
    [[11, 14]], // SE
    [[11, 12], [11, 14]], // NE + SE
    [[9, 13]], // W
    [[9, 12]], // NW
    [[9, 14]], // SW
    [[9, 12], [9, 14]], // NW + SW
    [[9, 13], [11, 13]], // W + E
    [[9, 12], [11, 12]], // NW + NE
    [[9, 14], [11, 14]], // SW + SE
    [[9, 12], [11, 12], [9, 14], [11, 14]] // NW + NE + SW + SE
  ];
    

  function generateGrid(numCols, numRows) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        if (w.noise(i/10, j/10) > 0.5) {
          row.push("_");
        } else {
          row.push(".");
        }
        
      }
      grid.push(row);
    }
    // console.log(grid);
    return grid;
  }

  w.drawGrid = function(grid) {
    w.background("#fff6eb");
    // console.log(grid.length);
    for(let i = 0; i < grid.length; i++) {
      // console.log(grid.length)
      for(let j = 0; j < grid[i].length; j++) {
        // console.log(grid[i].length)
        if (grid[i][j] == '_') {
          // console.log("grid[i][j] = '_'")
          placeTile(i, j, (w.floor(w.random(15, 20))), 14);
        } else if(gridCheck(grid, i, j, ".")) {
          placeTile(i, j, (w.floor(w.random(4))) | 0, 12);
        } else {
          drawContext(grid, i, j, ".", 4, 0);
        }
      }
    }
    
    
    const scrub = w.mouseY / w.height;
    w.noStroke();
    w.fill("#0660c7");
    for (let i = 0; i < 50; i++) {
      let r = 9 * w.random();
      let z =  w.random();
      let y =  w.height * (((scrub / 50 +  w.millis() / 5000.0) / z) % 1);
      let x =  w.width * w.random();
      w.circle(x, y, r);
    }
  }
}
var world1 = new p5(w1, "overworld");

const w2 = function(w2) {
  /* exported preload, setup, draw, placeTile */

  /* global generateGrid drawGrid */

  let seed = 0;
  let tilesetImage;
  let currentGrid = [];
  let numRows, numCols;

  w2.preload = function() {
     w2.tilesetImage =  w2.loadImage(
      "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2Ftileset.png?v=1611654020438"
    );
  }

  w2.reseed = function() {
    w2.seed = ( w2.seed | 0) + 1109;
    w2.randomSeed( w2.seed);
    w2.noiseSeed( w2.seed);
    w2.select("#seedReport").html("seed " + w2.seed);
    w2.regenerateGrid();
  }

  w2.regenerateGrid = function() {
    w2.select("#asciiBox2").value(gridToString(generateGrid(numCols, numRows)));
    w2.reparseGrid();
  }

  w2.reparseGrid = function() {
    w2.currentGrid = stringToGrid(w2.select("#asciiBox2").value());
    // console.log(w2.currentGrid);
  }

  function gridToString(grid) {
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }

  function stringToGrid(str) {
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    // console.log(grid)
    return grid;
  }

  w2.setup = function() {
    numCols = w2.select("#asciiBox").attribute("rows") | 0;
    numRows = w2.select("#asciiBox").attribute("cols") | 0;

    w2.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer2");
    w2.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

    w2.select("#reseedButton").mousePressed(w2.reseed);
    w2.select("#asciiBox").input(w2.reparseGrid);

    w2.reseed();
  }


  w2.draw = function() {
    w2.randomSeed(w2.seed);
    w2.drawGrid(w2.currentGrid);

  }

  function placeTile(i, j, ti, tj) {
    w2.image(w2.tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
  }



/* exported generateGrid, drawGrid */
/* global placeTile */

  function gridCheck(grid, i, j, target) {
    //used help from chatgpt
    // Check if within bounds
    // if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length) {
      // Check if the cell matches the target
    return grid[i][j] === target;
    // }
    // return false;
  }


  function gridCode(grid, i, j, target) {
    //used help from chatgpt
    let northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0; // North
    let southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0; // South
    let eastBit = gridCheck(grid, i, j + 1, target) ? 1 : 0;  // East
    let westBit = gridCheck(grid, i, j - 1, target) ? 1 : 0;  // West

    // Combine bits to form the code
    return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
  }


  function drawContext(grid, i, j, target, ti, tj) {
    //used help from chatgpt
    const code = gridCode(grid, i, j, target);
    const [tiOffset, tjOffset] = lookup[code];
    placeTile(i, j, ti + tiOffset, tj + tjOffset);
  }


  const lookup = [
    [[22, 5]], // N/A
    [[21, 5]], // N
    [[23, 5]], // S
    [[21, 5],[23, 5]], // N + S
    [[22, 6]], // E
    [[21, 6]], // NE
    [[23, 6]], // SE
    [[21, 6], [23, 6]], // NE + SE
    [[22, 4]], // W
    [[21, 4]], // NW
    [[23, 4]], // SW
    [[21, 4], [23, 4]], // NW + SW
    [[22, 4], [22, 6]], // W + E
    [[21, 4], [21, 6]], // NW + NE
    [[23, 4], [23, 6]], // SW + SE
    [[21, 4], [21, 6], [23, 4], [23, 6]] // NW + NE + SW + SE
  ];
    

  function generateGrid(numCols, numRows) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        // if (noise(i/10, j/10) > 0.5) {
        row.push("_");
        // } else {
        //   row.push(".");
        // }
        
      }
      grid.push(row);
    }
    
    // for (let i = 5; i < 15; i++) {
    //   for (let j = 3; j < 18; j++) {
    //     grid[i][j] = ".";
    //   }
    // }
    
    for(let i = 0; i < numRows; i++){
      for(let j = 0; j < numCols; j++) {
        if(w2.noise(i/5, j/5) > 0.5) {
          grid[i][j] = "~";
        }
      }
    }
    
    let room1StartX = w2.random(0, 6)|0;
    let room1EndX = w2.random(room1StartX+9, 11)|0;
    let room1h = w2.random(room1StartX+18, 11)|0;
    
    // Placing room one
    for(let i = room1StartX; i < room1h; i++) {
      for (let j = room1StartX; j < room1EndX; j++) {
        grid[i][j] = ".";
      }
    }
    
    // Road to room one
    let room1MidX = ((room1EndX + room1StartX) / 2)|0;
    for(let i = 0; i < room1StartX; i++) {
      grid[i][room1MidX] = ".";
    }
    
    let room2StartX = w2.random(room1EndX+7, 16)|0;
    let room2EndX = w2.random(room2StartX+9, 20)|0;
    let room2h = w2.random(room2StartX+10, 20)|0; 
    
    // Placing room two
    for(let i = room2StartX; i < room2h; i++) {
      for (let j = room2StartX; j < room2EndX; j++) {
        grid[i][j] = ".";
      }
    }
    
    // Road to room two
    let room2MidY = ((room2StartX + room2h) / 2)|0;
    for(let i = room2EndX; i < 20; i++) {
      grid[room2MidY][i] = ".";
    }
    
    // Road connecting two rooms
    for(let i = room1h; i < room2MidY; i++) {
      grid[i][room1MidX] = ".";
    }
    for(let i = room1MidX; i < room2StartX; i++) {
      grid[room2MidY][i] = ".";
    }
    
    
    return grid;
  }

  w2.drawGrid = function(grid) {
    w2.background(128);
    // console.log(grid.length);
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == '_') {
          placeTile(i, j, (w2.floor(w2.random(4))), 15);
        } else if(gridCheck(grid, i, j, "~")) {
          placeTile(i, j, (w2.floor(w2.random(12, 19))), 24);
        } else if(gridCheck(grid, i, j, ".")) {
          placeTile(i, j, (w2.floor(w2.random(1, 5))) | 0, 21);
        } else {
          drawContext(grid, i, j, ".", 4, 0);
        }
      }
    }
    
    
    const scrub = w2.mouseY / w2.height;
    w2.noStroke();
    w2.fill("383838");
    for (let i = 0; i < 50; i++) {
      let r = 9 * w2.random();
      let z =  w2.random();
      let y =  w2.height * (((scrub / 50 +  w2.millis() / 5000.0) / z) % 1);
      let x =  w2.width * w2.random();
      w2.circle(x, y, r);
    }
  }
}
var world2 = new p5(w2, "dungeon");
