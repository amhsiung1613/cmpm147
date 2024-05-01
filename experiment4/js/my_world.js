"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 64;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

// function p3_tileClicked(i, j) {
//   let key = [i, j];
//   clicks[key] = 1 + (clicks[key] | 0);
// }
function p3_tileClicked(i, j) {
  let key = i + "," + j; // Use a string key for simplicity in handling coordinates
  clicks[key] = 1 + (clicks[key] || 0); // Record click counts
  const rippleRadius = 10; // Define the radius of the ripple effect
  const rippleDelay = 30; // Delay factor in milliseconds

  for (let dy = -rippleRadius; dy <= rippleRadius; dy++) {
    for (let dx = -rippleRadius; dx <= rippleRadius; dx++) {
      let dist = Math.sqrt(dx * dx + dy * dy);
      let delay = dist * rippleDelay;
      let targetX = i + dx;
      let targetY = j + dy;
      let key = targetX + "," + targetY;

      setTimeout(() => {
        clicks[key] = (clicks[key] || 0) + 1; // Increment to simulate a visual change
        if (clicks[key] >= 10) { // Reset or fade out after some time or number of increments
          clicks[key] = 0;
        }
      }, delay);
    }
  }
}


// function triggerRipple(clickedX, clickedY) {
//   const rippleRadius = 10; // Define the radius of the ripple effect
//   const rippleDelay = 30; // Delay factor in milliseconds

//   for (let dy = -rippleRadius; dy <= rippleRadius; dy++) {
//     for (let dx = -rippleRadius; dx <= rippleRadius; dx++) {
//       let dist = Math.sqrt(dx * dx + dy * dy);
//       let delay = dist * rippleDelay;
//       let targetX = clickedX + dx;
//       let targetY = clickedY + dy;
//       let key = targetX + "," + targetY;

//       setTimeout(() => {
//         clicks[key] = (clicks[key] || 0) + 1; // Increment to simulate a visual change
//         if (clicks[key] >= 10) { // Reset or fade out after some time or number of increments
//           clicks[key] = 0;
//         }
//       }, delay);
//     }
//   }
// }

function p3_drawBefore() {}



function p3_drawTile(i, j) {
  noStroke();

  let key = i + "," + j;
  let n = clicks[key] || 0; // Use the number of clicks to determine animation state
  
  // Determine the base color using a hash function for randomness
  let colorBase;
  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 === 0) {
    colorBase = color(90, 180, 255);
  } else if (XXH.h32("tile:" + [i, j], worldSeed) % 3 === 0) {
    colorBase = color(90, 160, 230);
  } else if (XXH.h32("tile:" + [i, j], worldSeed) % 2 === 0) {
    colorBase = color(90, 140, 200);
  } else {
    colorBase = color(100, 200, 254);
  }

  // Modify the color based on the ripple effect
  if (n > 0) {
    // Increase brightness or apply another visual effect based on clicks
    let brightnessIncrease = min(100, n * 10); // Prevents the color from becoming too bright
    fill(brightness(colorBase) - brightnessIncrease);
    fill(hue(colorBase)*.01*n, saturation(colorBase)*.1*n, brightness(colorBase)+10 * n);
    // fill(hue(colorBase), saturation(colorBase) * n, brightness(colorBase));
  } else {
    fill(colorBase);
  }

  // Draw the tile shape
  push();
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);
  pop();
}

function p3_drawSelectedTile(tw, th) {
  noFill();
  stroke(255, 0, 255, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
//   text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
