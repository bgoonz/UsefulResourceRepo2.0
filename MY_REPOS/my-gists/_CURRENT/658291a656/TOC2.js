// Shear transform:
//   x' = x + kx*y;
//   y' = ky*x + y;
function shear(c, kx, ky) {
  c.transform(1, ky, kx, 1, 0, 0);
}

// Rotate theta radians counterclockwise around the point (x,y)
// This can also be accomplished with a translate, rotate, translate sequence
function rotateAbout(c, theta, x, y) {
  let ct = Math.cos(theta);
  let st = Math.sin(theta);
  c.transform(ct, -st, st, ct, -x * ct - y * st + x, x * st - y * ct + y);
}

// Recursively traverse the Document or Element e, invoking the function
// f on e and on each of its descendants
function traverse(e, f) {
  f(e); // Invoke f() on e
  for (let child of e.children) {
    // Iterate over the children
    traverse(child, f); // And recurse on each one
  }
}

function traverse2(e, f) {
  f(e); // Invoke f() on e
  let child = e.firstElementChild; // Iterate the children linked-list style
  while (child !== null) {
    traverse2(child, f); // And recurse
    child = child.nextElementSibling;
  }
}

class TypedMap extends Map {
  constructor(keyType, valueType, entries) {
    // If entries are specified, check their types
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }

    // Initialize the superclass with the (type-checked) initial entries
    super(entries);

    // And then initialize this subclass by storing the types
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // Now redefine the set() method to add type checking for any
  // new entries added to the map.
  set(key, value) {
    // Throw an error if the key or value are of the wrong type
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }

    // If the types are correct, we invoke the superclass's version of
    // the set() method, to actually add the entry to the map. And we
    // return whatever the superclass method returns.
    return super.set(key, value);
  }
}

// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.
uniqueInteger.counter = 0;

// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
  return uniqueInteger.counter++; // Return and increment counter property
}
uniqueInteger(); // => 0
uniqueInteger(); // => 1

let uniqueInteger = (function () {
  // Define and invoke
  let counter = 0; // Private state of function below
  return function () {
    return counter++;
  };
})();
uniqueInteger(); // => 0
uniqueInteger(); // => 1

// The canvas.toBlob() function is callback-based.
// This is a Promise-based wrapper for it.
async function getCanvasBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(resolve);
  });
}

// Here is how we upload a PNG file from a canvas
async function uploadCanvasImage(canvas) {
  let pngblob = await getCanvasBlob(canvas);
  let formdata = new FormData();
  formdata.set("canvasimage", pngblob);
  let response = await fetch("/upload", { method: "POST", body: formdata });
  let body = await response.json();
}

function wait(duration) {
  // Create and return a new Promise
  return new Promise((resolve, reject) => {
    // These control the Promise
    // If the argument is invalid, reject the Promise
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }
    // Otherwise, wait asynchronously and then resolve the Promise.
    // setTimeout will invoke resolve() with no arguments, which means
    // that the Promise will fulfill with the undefined value.
    setTimeout(resolve, duration);
  });
}

// Begin by creating an audioContext object. Safari still requires
// us to use webkitAudioContext instead of AudioContext.
let audioContext = new (this.AudioContext || this.webkitAudioContext)();

// Define the base sound as a combination of three pure sine waves
let notes = [293.7, 370.0, 440.0]; // D major chord: D, F# and A

// Create oscillator nodes for each of the notes we want to play
let oscillators = notes.map((note) => {
  let o = audioContext.createOscillator();
  o.frequency.value = note;
  return o;
});

// Shape the sound by controlling its volume over time.
// Starting at time 0 quickly ramp up to full volume.
// Then starting at time 0.1 slowly ramp down to 0.
let volumeControl = audioContext.createGain();
volumeControl.gain.setTargetAtTime(1, 0.0, 0.02);
volumeControl.gain.setTargetAtTime(0, 0.1, 0.2);

// We're going to send the sound to the default destination:
// the user's speakers
let speakers = audioContext.destination;

// Connect each of the source notes to the volume control
oscillators.forEach((o) => o.connect(volumeControl));

// And connect the output of the volume control to the speakers.
volumeControl.connect(speakers);

// Now start playing the sounds and let them run for 1.25 seconds.
let startTime = audioContext.currentTime;
let stopTime = startTime + 1.25;
oscillators.forEach((o) => {
  o.start(startTime);
  o.stop(stopTime);
});

// If we want to create a sequence of sounds we can use event handlers
oscillators[0].addEventListener("ended", () => {
  // This event handler is invoked when the note stops playing
});

function words(s) {
  var r = /\s+|$/g; // Match one or more spaces or end
  r.lastIndex = s.match(/[^ ]/).index; // Start matching at first nonspace
  return {
    // Return an iterable iterator object
    [Symbol.iterator]() {
      // This makes us iterable
      return this;
    },
    next() {
      // This makes us an iterator
      let start = r.lastIndex; // Resume where the last match ended
      if (start < s.length) {
        // If we're not done
        let match = r.exec(s); // Match the next word boundary
        if (match) {
          // If we found one, return the word
          return { value: s.substring(start, match.index) };
        }
      }
      return { done: true }; // Otherwise, say that we're done
    },
  };
}

[...words(" abc def  ghi! ")]; // => ["abc", "def", "ghi!"]

function write(stream, chunk, callback) {
  // Write the specified chunk to the specified stream
  let hasMoreRoom = stream.write(chunk);

  // Check the return value of the write() method:
  if (hasMoreRoom) {
    // If it returned true, then
    setImmediate(callback); // invoke callback asynchronously.
  } else {
    // If it returned false, then
    stream.once("drain", callback); // invoke callback on drain event.
  }
}

// Given an array of iterables, yield their elements in interleaved order.
function* zip(...iterables) {
  // Get an iterator for each iterable
  let iterators = iterables.map((i) => i[Symbol.iterator]());
  let index = 0;
  while (iterators.length > 0) {
    // While there are still some iterators
    if (index >= iterators.length) {
      // If we reached the last iterator
      index = 0; // go back to the first one.
    }
    let item = iterators[index].next(); // Get next item from next iterator.
    if (item.done) {
      // If that iterator is done
      iterators.splice(index, 1); // then remove it from the array.
    } else {
      // Otherwise,
      yield item.value; // yield the iterated value
      index++; // and move on to the next iterator.
    }
  }
}

// Interleave three iterable objects
[...zip(oneDigitPrimes(), "ab", [0])]; // => [2,"a",0,3,"b",5,7]

// This utility function asynchronously obtains the database object (creating
// and initializing the DB if necessary) and passes it to the callback.
function withDB(callback) {
  let request = indexedDB.open("zipcodes", 1); // Request v1 of the database
  request.onerror = console.error; // Log any errors
  request.onsuccess = () => {
    // Or call this when done
    let db = request.result; // The result of the request is the database
    callback(db); // Invoke the callback with the database
  };

  // If version 1 of the database does not yet exist, then this event
  // handler will be triggered. This is used to create and initialize
  // object stores and indexes when the DB is first created or to modify
  // them when we switch from one version of the DB schema to another.
  request.onupgradeneeded = () => {
    initdb(request.result, callback);
  };
}

// withDB() calls this function if the database has not been initialized yet.
// We set up the database and populate it with data, then pass the database to
// the callback function.
//
// Our zip code database includes one object store that holds objects like this:
//
//   {
//     zipcode: "02134",
//     city: "Allston",
//     state: "MA",
//   }
//
// We use the "zipcode" property as the database key and create an index for
// the city name.
function initdb(db, callback) {
  // Create the object store, specifying a name for the store and
  // an options object that includes the "key path" specifying the
  // property name of the key field for this store.
  let store = db.createObjectStore(
    "zipcodes", // store name
    { keyPath: "zipcode" }
  );

  // Now index the object store by city name as well as by zip code.
  // With this method the key path string is passed directly as a
  // required argument rather than as part of an options object.
  store.createIndex("cities", "city");

  // Now get the data we are going to initialize the database with.
  // The zipcodes.json data file was generated from CC-licensed data from
  // www.geonames.org: https://download.geonames.org/export/zip/US.zip
  fetch("zipcodes.json") // Make an HTTP GET request
    .then((response) => response.json()) // Parse the body as JSON
    .then((zipcodes) => {
      // Get 40K zip code records
      // In order to insert zip code data into the database we need a
      // transaction object. To create our transaction object, we need
      // to specify which object stores we'll be using (we only have
      // one) and we need to tell it that we'll be doing writes to the
      // database, not just reads:
      let transaction = db.transaction(["zipcodes"], "readwrite");
      transaction.onerror = console.error;

      // Get our object store from the transaction
      let store = transaction.objectStore("zipcodes");

      // The best part about the IndexedDB API is that object stores
      // are *really* simple. Here's how we add (or update) our records:
      for (let record of zipcodes) {
        store.put(record);
      }

      // When the transaction completes successfully, the database
      // is initialized and ready for use, so we can call the
      // callback function that was originally passed to withDB()
      transaction.oncomplete = () => {
        callback(db);
      };
    });
}

// Given a zip code, use the IndexedDB API to asynchronously look up the city
// with that zip code, and pass it to the specified callback, or pass null if
// no city is found.
export function lookupCity(zip, callback) {
  withDB((db) => {
    // Create a read-only transaction object for this query. The
    // argument is an array of object stores we will need to use.
    let transaction = db.transaction(["zipcodes"]);

    // Get the object store from the transaction
    let zipcodes = transaction.objectStore("zipcodes");

    // Now request the object that matches the specified zipcode key.
    // The lines above were synchronous, but this one is async.
    let request = zipcodes.get(zip);
    request.onerror = console.error; // Log errors
    request.onsuccess = () => {
      // Or call this function on success
      let record = request.result; // This is the query result
      if (record) {
        // If we found a match, pass it to the callback
        callback(`${record.city}, ${record.state}`);
      } else {
        // Otherwise, tell the callback that we failed
        callback(null);
      }
    };
  });
}

// Given the name of a city, use the IndexedDB API to asynchronously
// look up all zip code records for all cities (in any state) that have
// that (case-sensitive) name.
export function lookupZipcodes(city, callback) {
  withDB((db) => {
    // As above, we create a transaction and get the object store
    let transaction = db.transaction(["zipcodes"]);
    let store = transaction.objectStore("zipcodes");

    // This time we also get the city index of the object store
    let index = store.index("cities");

    // Ask for all matching records in the index with the specified
    // city name, and when we get them we pass them to the callback.
    // If we expected more results, we might use openCursor() instead.
    let request = index.getAll(city);
    request.onerror = console.error;
    request.onsuccess = () => {
      callback(request.result);
    };
  });
}

import { lookupCity, lookupZipcodes } from "./zipcodeDatabase.js";

window.addEventListener("load", () => {
  let zipcodeInput = document.querySelector("#zipcodeInput");
  let cityOutput = document.querySelector("#cityOutput");
  zipcodeInput.onchange = () => {
    lookupCity(zipcodeInput.value, (city) => {
      cityOutput.value = city || "Unknown zip code";
    });
  };

  let cityInput = document.querySelector("#cityInput");
  let zipcodesOutput = document.querySelector("#zipcodesOutput");
  cityInput.onchange = () => {
    zipcodesOutput.textContent = "Matching zipcodes:";
    lookupZipcodes(cityInput.value, (zipcodes) => {
      zipcodes.forEach((zip) => {
        let item = document.createElement("li");
        item.append(`${zip.zipcode}: ${zip.city}, ${zip.state}`);
        zipcodesOutput.append(item);
      });
    });
  };
});

// Return the plain-text content of element e, recursing into child elements.
// This method works like the textContent property
function textContent(e) {
  let s = ""; // Accumulate the text here
  for (let child = e.firstChild; child !== null; child = child.nextSibling) {
    let type = child.nodeType;
    if (type === 3) {
      // If it is a Text node
      s += child.nodeValue; // add the text content to our string.
    } else if (type === 1) {
      // And if it is an Element node
      s += textContent(child); // then recurse.
    }
  }
  return s;
}

const fs = require("fs");
let filename = "./streetNames.txt";
let finalArr = [];
fs.readFile(filename, (err, text) => {
  if (err) throw err;

  const arr = text.toString().replace(/\r\n/g, "\n").split("\n");

  for (let i of arr) {
    console.log(i);
    finalArr.push(`"${i}"`);
  }
  console.log("finalArr: ", finalArr);
  fs.writeFile(
    `${filename}.js`,
    `let ${filename
      .slice(2)
      .split(".")
      .slice(0, -1)
      .join(".")}Arr = [${finalArr}];`,
    (err) => {
      // In case of a error throw err.
      if (err) throw err;
    }
  );
});

// This function takes a function and returns a wrapped version
function timed(f) {
  return function (...args) {
    // Collect args into a rest parameter array
    console.log(`Entering function ${f.name}`);
    let startTime = Date.now();
    try {
      // Pass all of our arguments to the wrapped function
      return f(...args); // Spread the args back out again
    } finally {
      // Before we return the wrapped return value, print elapsed time.
      console.log(`Exiting ${f.name} after ${Date.now() - startTime}ms`);
    }
  };
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// Now invoke the timed version of that test function
timed(benchmark)(1000000); // => 500000500000; this is the sum of the numbers

/**
 * TOC.js: create a table of contents for a document.
 *
 * This script runs when the DOMContentLoaded event is fired and
 * automatically generates a table of contents for the document.
 * It does not define any global symbols so it should not conflict
 * with other scripts.
 *
 * When this script runs, it first looks for a document element with
 * an id of "TOC". If there is no such element it creates one at the
 * start of the document. Next, the function finds all <h2> through
 * <h6> tags, treats them as section titles, and creates a table of
 * contents within the TOC element. The function adds section numbers
 * to each section heading and wraps the headings in named anchors so
 * that the TOC can link to them. The generated anchors have names
 * that begin with "TOC", so you should avoid this prefix in your own
 * HTML.
 *
 * The entries in the generated TOC can be styled with CSS. All
 * entries have a class "TOCEntry". Entries also have a class that
 * corresponds to the level of the section heading. <h1> tags generate
 * entries of class "TOCLevel1", <h2> tags generate entries of class
 * "TOCLevel2", and so on. Section numbers inserted into headings have
 * class "TOCSectNum".
 *
 * You might use this script with a stylesheet like this:
 *
 *   #TOC { border: solid black 1px; margin: 10px; padding: 10px; }
 *   .TOCEntry { margin: 5px 0px; }
 *   .TOCEntry a { text-decoration: none; }
 *   .TOCLevel1 { font-size: 16pt; font-weight: bold; }
 *   .TOCLevel2 { font-size: 14pt; margin-left: .25in; }
 *   .TOCLevel3 { font-size: 12pt; margin-left: .5in; }
 *   .TOCSectNum:after { content: ": "; }
 *
 * To hide the section numbers, use this:
 *
 *   .TOCSectNum { display: none }
 **/
document.addEventListener("DOMContentLoaded", () => {
  // Find the TOC container element.
  // If there isn't one, create one at the start of the document.
  let toc = document.querySelector("#TOC");
  if (!toc) {
    toc = document.createElement("div");
    toc.id = "TOC";
    document.body.prepend(toc);
  }

  // Find all section heading elements. We're assuming here that the
  // document title uses <h1> and that sections within the document are
  // marked with <h2> through <h6>.
  let headings = document.querySelectorAll("h2,h3,h4,h5,h6");

  // Initialize an array that keeps track of section numbers.
  let sectionNumbers = [0, 0, 0, 0, 0];

  // Now loop through the section header elements we found.
  for (let heading of headings) {
    // Skip the heading if it is inside the TOC container.
    if (heading.parentNode === toc) {
      continue;
    }

    // Figure out what level heading it is.
    // Subtract 1 because <h2> is a level-1 heading.
    let level = parseInt(heading.tagName.charAt(1)) - 1;

    // Increment the section number for this heading level
    // and reset all lower heading level numbers to zero.
    sectionNumbers[level - 1]++;
    for (let i = level; i < sectionNumbers.length; i++) {
      sectionNumbers[i] = 0;
    }

    // Now combine section numbers for all heading levels
    // to produce a section number like 2.3.1.
    let sectionNumber = sectionNumbers.slice(0, level).join(".");

    // Add the section number to the section header title.
    // We place the number in a <span> to make it styleable.
    let span = document.createElement("span");
    span.className = "TOCSectNum";
    span.textContent = sectionNumber;
    heading.prepend(span);

    // Wrap the heading in a named anchor so we can link to it.
    let anchor = document.createElement("a");
    let fragmentName = `TOC${sectionNumber}`;
    anchor.name = fragmentName;
    heading.before(anchor); // Insert anchor before heading
    anchor.append(heading); // and move heading inside anchor

    // Now create a link to this section.
    let link = document.createElement("a");
    link.href = `#${fragmentName}`; // Link destination

    // Copy the heading text into the link. This is a safe use of
    // innerHTML because we are not inserting any untrusted strings.
    link.innerHTML = heading.innerHTML;

    // Place the link in a div that is styleable based on the level.
    let entry = document.createElement("div");
    entry.classList.add("TOCEntry", `TOCLevel${level}`);
    entry.append(link);

    // And add the div to the TOC container.
    toc.append(entry);
  }
});

// Replace the method named m of the object o with a version that logs
// messages before and after invoking the original method.
function trace(o, m) {
  let original = o[m]; // Remember original method in the closure.
  o[m] = function (...args) {
    // Now define the new method.
    console.log(new Date(), "Entering:", m); // Log message.
    let result = original.apply(this, args); // Invoke original.
    console.log(new Date(), "Exiting:", m); // Log message.
    return result; // Return result.
  };
}
