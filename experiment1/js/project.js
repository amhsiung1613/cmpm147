// project.js - purpose and description here
// Author: Amber
// Date: 4/6/2024

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file


function main() {
  const fillers = {
    starters: [
      "in my opinion, $celeberties is $adjective",
      "according to their start sign and moon phase, $celeberties is  $adjective",
      "$celeberties is too $adjective2",
      "have you heard, $celeberties is so $adjective2"
    ],
    celeberties: [
      "Obama",
      "Hellen Keller",
      "Ronald Reagan",
      "Robert Dinero",
      "John Cena",
      "Bill Hader",
      "Andrew Garfield",
      "Emma Watson",
      "Robin Williams",
      "Kristen Stewart",
      "Toby Mcguire",
      "Madonna",
      "Tupac",
    ],
    adjective: [
      "overrated",
      "underwhelming",
      "disappointing",
      "spiteful",
      "hateful",
      "ignorant",
      "idiotic",
      "prissy",
      "positive",
      "mid",
    ],
    verb: [
      "eat",
      "sleep",
      "think",
      "talk",
      "express themselves",
      "jump",
      "skip",
      "cook",
      "paint",
      "sweep",
      "act",
    ],
    adjective2: [
      "silly",
      "funny",
      "dirty",
      "clean",
      "sweet",
      "outrageous",
      "confusing",
      "annoying",
      "gross",
      "exhausting",
      "frustrating",
      "cringey",
      
    ],
   
  };
  
  const template = `$starters, there's something about the way they $verb, it's just so $adjective2.
  
  
  `;
  
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  
  function generate() {
    let story = template;  
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
    
  
    /* global box */
    box.innerText = story;
  }
  
  /* global clicker */
  clicker.onclick = generate;
  
  generate();
  
}

// let's get this party started - uncomment me
main();