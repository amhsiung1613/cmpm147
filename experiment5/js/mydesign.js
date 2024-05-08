// project.js - purpose and description here
// Author: Your Name
// Date:

function getInspirations() {
  return [
    // {
    //   name: "Lunch atop a Skyscraper", 
    //   assetUrl: "img/lunch-on-a-skyscraper.jpg",
    //   credit: "Lunch atop a Skyscraper, Charles Clyde Ebbets, 1932"
    // },
    // {
    //   name: "Train Wreck", 
    //   assetUrl: "img/train-wreck.jpg",
    //   credit: "Train Wreck At Monteparnasse, Levy & fils, 1895"
    // },
    // {
    //   name: "Migrant mother", 
    //   assetUrl: "img/migrant-mother.jpg",
    //   credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936"
    // },
    // {
    //   name: "Disaster Girl", 
    //   assetUrl: "img/girl-with-fire.jpg",
    //   credit: "Four-year-old Zoë Roth, 2005"
    // },
    {
      name: "Beagle in a Basket", 
      assetUrl: "img/dog.jpg",
      credit: "Unknown, altprocess, 2009"
    },
    {
      name: "Generative Dhalia", 
      assetUrl: "img/flower.jpg",
      credit: "Photographic details of a white dahlia fresh flower. Photo in high contrast black and white that emphasizes texture, contrast, and complex floral geometric patterns. Generative AI, AkuAku, Unknown"
    },
    {
      name: "Misty Rocks", 
      assetUrl: "img/rocks-in-the-mist.png",
      credit: "Unknown, Team Skylum, 2023"
    },
    {
      name: "Trees and Mountains", 
      assetUrl: "img/dramatic-nature.jpg",
      credit: "Dramatic nature landscape by swarm of clouds, supriyanto 96, unknown"
    },
    {
      name: "Sunset", 
      assetUrl: "img/sunset.jpg",
      credit: "Dock Under Cloudy Sky in Front of Mountain, Pixabay, unknown"
    },
    {
      name: "Sunset and Trees", 
      assetUrl: "img/sunset-tree.jpg",
      credit: "Unknown, Unknown, unknown"
    },
    {
      name: "Mountains and Lakes", 
      assetUrl: "img/glacier-lake.jpg",
      credit: "Moraine Lake in Banff National Park, Alica Strelkov, unknown"
    },
  ];
}

function initDesign(inspiration) {
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  
  let design = {
    bg: 128,
    fg: []
  }
  
  for(let i = 0; i < 100; i++) {
    design.fg.push({
      x: random(width),   // Center x-coordinate
      y: random(height),  // Center y-coordinate
      r: random(width/8), // Radius, half of the width/2 to make it more proportional
      red: random(255),
      green: random(255),
      blue: random(255),   // Color
    });

    // design.fg.push({x: random(width),
    //                 y: random(height),
    //                 w: random(width/2),
    //                 h: random(height/2),
    //                 fill: random(255)})
  }
  return design;
}

function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  for(let circle of design.fg) {
    fill(circle.red, circle.green, circle.blue);
    ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  for(let circle of design.fg) {
    // let x = floor(random(image.width));
    // let y = floor(random(image.height));
    // let sampledColor = image.get(x, y);
    // let mutatedColor = mutateColor(sampledColor, rate); // Mutate the sampled color
    // fill(mutatedColor);
    // ellipse(100, 100, 50, 50);
    circle.fill = mut(circle.fill, 0, 255, rate);
    circle.x = mut(circle.x, 0, width, rate);
    circle.y = mut(circle.y, 0, height, rate);
    circle.r = mut(circle.r, 0, width/4, rate); // Update to mutate the radius
  }
}

// function mutateDesign(design, inspiration, rate) {
//   design.bg = mut(design.bg, 0, 255, rate);
//   for(let box of design.fg) {
//     box.fill = mut(box.fill, 0, 255, rate);
//     box.x = mut(box.x, 0, width, rate);
//     box.y = mut(box.y, 0, height, rate);
//     box.w = mut(box.w, 0, width/2, rate);
//     box.h = mut(box.h, 0, height/2, rate);
//   }
// }

// function mutateColor(color, rate) {
//   let r = mut(red(color), 0, 255, rate);
//   let g = mut(green(color), 0, 255, rate);
//   let b = mut(blue(color), 0, 255, rate);
//   return color(r, g, b);
// }

function mut(num, min, max, rate) {
  let sd = (rate * (max - min)) / 10;
  let mutated = randomGaussian(num, sd);
  return constrain(mutated, min, max);
}

// function mut(num, min, max, rate) {
//     return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
// }
