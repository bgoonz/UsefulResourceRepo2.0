# Javascript Animations

random color and shape generator using canvas, Javascript and the Paper.js library

## Getting Started

> git clone https://github.com/bgoonz/jsanimate

> launch index.html using the vscode live server extension

# DEMO:

![](images/demo.gif)

### Code

#### JS

```js
let can = document.getElementById("canvas");
can.style.width = window.innerWidth + "px";
can.style.height = window.innerHeight + "px";

// Install paper to the global scope
paper.install(window);
paper.setup("canvas");
let rotation = 0;
let pathArray = [];
let grower = false;

let createNewPattern = function (position, step, grower) {
  // Create new Circle Path with Paper.js
  let path = new Path.Circle({
    center: [80, 50],
    radius: step,
    strokeColor: "white",
    fillColor: "pink",
    grower: grower,
  });

  path.position = position;

  // Generate random shape movement
  path.movementX = Math.round(Math.random()) * 2 - 1;
  path.movementY = Math.round(Math.random()) * 2 - 1;

  // Store path
  pathArray.push(path);

  // Rotate shapes
  path.rotate(rotation);

  // Update position
  path.originalPosition = position;
};

// Grow shape while holding mouse down
view.onMouseDown = function (e) {
  grower = true;
};

// Stop growing shape when releasing mouse
view.onMouseUp = function (e) {
  grower = false;
};

view.onMouseMove = function (e) {
  // event.delta describes = vector btwn the current & last pos of the mouse when event fired
  if (e.delta) {
    // The smaller the number the quicker the growth of the shape pattern (also more circular)
    // Interesting note: grow the circle by mousing over on the left side of the screen, crossing across another window as a bridge and entering page again on the right side!
    let step = Math.min(e.delta.length / 10, 12);
    createNewPattern(e.point, step, grower);
  }
};

view.onFrame = function (e) {
  pathArray.forEach(function (line, index) {
    // Rate of color change. Beware of any # above 20! Photosensitive epilepsy trigger.
    line.fillColor.hue += 2;

    for (let i = 0; i < line.segments.length; i++) {
      let segment = line.segments[i];

      // Randomize x and y movement. Comment out for an equally cool pattern that persists for a set time before disappearing
      segment.point.x += line.movementX * Math.random();
      segment.point.y += line.movementY * Math.random();
    }
    // Change the y position of the segment point:
    line.grower ? line.scale(1.04) : line.scale(0.999);

    // Rotate elements in the line
    line.rotate(2);
    if (!grower) {
      line.grower = false;
    }
    // Clear screen after a limited path or line length
    if (pathArray.length > 200 || line.length > 1000) {
      line.remove();
      pathArray.splice(index, 1);
    }
  });
};

// Start with demo shapes and sizes
function createDemoShapes() {
  for (i = 0; i < 20; i++) {
    let maxPoint = new Point(view.size.width, view.size.height);
    let randomPoint = Point.random();
    let generationPoint = {
      x: maxPoint.x * randomPoint.x,
      y: maxPoint.y * randomPoint.y,
    };
    // Size of starter shapes
    let step = Math.random() * 100;
    let grower = Math.random() >= 5;
    createNewPattern(generationPoint, step, grower);
  }
}

createDemoShapes();
```

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Tricks</title>
    <link href="./style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <canvas id="canvas" resize> </canvas>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.10.2/paper-full.min.js"></script>
    <script src="./circles.js"></script>
  </body>
</html>
```

### CSS

```css
body {
  margin: 0;
}

#canvas {
  display: block;
  width: 100%;
  background: #0a0a0a;
  z-index: 10;
}
```
