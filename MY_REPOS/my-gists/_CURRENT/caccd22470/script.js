//variable declaration for the global repeated animations
var gear = $("#gear1, #gear2, #gear3"),
  wind = $("#windmill"),
  needle1 = $("#needle3, #needle4"),
  needle2 = $("#needle2"),
  needle3 = $("#needle1, #needle5"),
  panelSq = $("#panel path"),
  light = $("#light"),
  graph = $("#graphline"),
  smoke = $("#smoke circle, #smoke path"),
  aim = $("#aim1, #aim2, #aim3");

TweenMax.set(smoke, {
  visibility: "visible"
});
TweenMax.set(graph, {
  drawSVG: "0 0"
});

//animation that's repeated for all of the sections
function revolve() {
  var tl = new TimelineMax();

  tl.add("begin");
  tl.to(gear, 4, {
      transformOrigin: "50% 50%",
      rotation: 360,
      repeat: -1,
      ease: Linear.easeNone
    }, "begin")
    .to(wind, 2, {
      transformOrigin: "50% 50%",
      rotation: 360,
      repeat: -1,
      ease: Linear.easeNone
    }, "begin")
    .to(needle1, 2, {
      transformOrigin: "50% 80%",
      rotation: -30,
      repeat: -1,
      yoyo: true,
      ease: Elastic.easeOut
    }, "begin")
    .to(needle2, 1, {
      transformOrigin: "50% 75%",
      rotation: -40,
      repeat: -1,
      yoyo: true,
      ease: Back.easeOut
    }, "begin")
    .to(needle3, 5, {
      transformOrigin: "50% 50%",
      rotation: 150,
      repeat: -1,
      yoyo: true,
      ease: Back.easeOut
    }, "begin")
    .staggerTo(panelSq, 1, {
      opacity: 0.4,
      repeat: -1,
      yoyo: true,
      ease: Back.easeOut
    }, 0.2, "begin")
    .staggerFromTo(smoke, 1, {
      scale: 0
    }, {
      scale: 1
    }, 0.1, "begin")
    .staggerFromTo(smoke, 1, {
      opacity: 0.6,
      y: 40
    }, {
      opacity: 0,
      y: -50,
      repeat: -1,
      repeatDelay: -2,
      ease: Circ.easeOut
    }, 0.1, "begin")
    .fromTo(aim, 2, {
      opacity: 0.6,
      scale: 0,
      transformOrigin: "50% 50%"
    }, {
      scale: 2,
      opacity: 0,
      repeat: -1,
      transformOrigin: "50% 50%",
      ease: Expo.easeOut
    }, "begin")
    .to(graph, 4, {
      drawSVG: "100% 120%",
      opacity: 0.3,
      repeat: -1,
      ease: Expo.easeInOut
    }, "begin")
    .to(light, 2, {
      fill: "#ffffff",
      repeat: -1,
      yoyo: true,
      ease: Elastic.easeInOut
    }, "begin");

  return tl;
}

var repeat = new TimelineMax();
repeat.add(revolve());

//variable declaration for the painted panda
var panda1 = $("#panda"),
  colorParts = $("#features path, #limbs path"),
  panda2 = $("#panda2"),
  lh = $("#l-hand"),
  rh = $("#r-hand"),
  tubeHeart = $("#tubeheart"),
  paint = $("#paint circle, #paint path"),
  aim2O = $(".aim2-off");

TweenMax.set([panda, panda2], {
  visibility: "visible"
});
TweenMax.set(panda, {
  x: -70
});
TweenMax.set(panda2, {
  y: 70,
  scale: 0.78
});
TweenMax.set(tubeheart, {
  x: 15,
  scale: 0
});
TweenMax.set(colorParts, {
  fill: "white"
});
TweenMax.set(paint, {
  visibility: "visible",
  x: 80,
  scale: 0
});

function paintPanda() {
  var tl = new TimelineMax();

  tl.add("paintIt");
  tl.to(aim2O, 0.25, {
    opacity: 0
  }, "paintIt");
  tl.to(panda, 2, {
    x: 0,
    ease: Circ.easeOut
  }, "paintIt");
  tl.staggerFromTo(paint, 0.5, {
    scale: 0,
    opacity: 0,
    x: 40
  }, {
    scale: 1,
    opacity: 1,
    x: -40,
    repeat: 4,
    ease: Circ.easeOut
  }, 0.1, "paintIt+=2");
  tl.to(lh, 1, {
    scaleY: 1.2,
    rotation: -5,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=1");
  tl.to(rh, 1, {
    scaleY: 1.2,
    rotation: 5,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=1");
  tl.to(lh, 0.5, {
    scaleY: 1,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=2");
  tl.to(rh, 0.5, {
    scaleY: 1,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=2");
  tl.to(panda, 0.5, {
    y: -5,
    ease: Circ.easeOut
  }, "paintIt+=2");
  tl.to(lh, 0.5, {
    scaleY: 1.2,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=3.5");
  tl.to(rh, 0.5, {
    scaleY: 1.2,
    transformOrigin: "50% 0",
    ease: Circ.easeOut
  }, "paintIt+=3.5");
  tl.to(panda, 0.5, {
    y: 0,
    ease: Circ.easeOut
  }, "paintIt+=3.5");
  tl.to(rh, 1, {
    scaleY: 1,
    rotation: 0,
    transformOrigin: "50% 0",
    ease: Circ.easeIn
  }, "paintIt+=4");
  tl.to(lh, 1, {
    scaleY: 1,
    rotation: 0,
    transformOrigin: "50% 0",
    ease: Circ.easeIn
  }, "paintIt+=4");
  tl.staggerTo(paint, 0.5, {
    opacity: 0,
    ease: Circ.easeIn
  }, 0.1, "paintIt+=3.5");
  tl.to(paint, 0.5, {
    x: 40,
    opacity: 0
  }, "paintIt+=6");
  tl.to(panda, 2, {
    x: -70,
    ease: Circ.easeIn
  }, "paintIt+=4.5");
  tl.fromTo(colorParts, 3, {
    fill: "#fff"
  }, {
    fill: "#000",
    ease: Expo.easeOut
  }, "paintIt+=3");
  tl.to(aim2O, 0.25, {
    opacity: 1
  }, "paintIt+=5");

  return tl;
}

//create a timeline but initially pause it so that we can control it via click
var triggerPaint = new TimelineMax({
  paused: true
});
triggerPaint.add(paintPanda());

//this button kicks off the panda painting timeline
$("#button").on("click", function(e) {
  e.preventDefault();
  triggerPaint.restart();
});

//variable declaration for the painted panda
var handle2 = $("#handle2"),
  hgrow = $(".g-hearts path"),
  aim3O = $(".aim3-off");

function heartPanda() {
  var tl = new TimelineMax();

  tl.add("hearts");
  tl.to(aim3O, 0.25, {
    opacity: 0
  }, "hearts");
  tl.to(handle2, 1, {
    rotation: -60,
    transformOrigin: "0 50%",
    ease: Expo.easeOut
  }, "hearts");
  tl.fromTo(panda2, 2, {
    y: 70,
    scale: 0.78
  }, {
    scale: 1,
    y: 0,
    ease: Circ.easeOut
  }, "hearts");
  tl.fromTo(tubeheart, 2, {
    x: 30,
    scale: 0,
    opacity: 1
  }, {
    scale: 7,
    x: -20,
    opacity: 0,
    transformOrigin: "100% 50%",
    ease: Circ.easeOut
  }, "hearts+=2");
  tl.staggerFromTo(hgrow, 2, {
    scale: 0,
    opacity: 1
  }, {
    scale: 12,
    opacity: 0,
    transformOrigin: "50% 50%",
    ease: Circ.easeOut
  }, 0.7, "hearts+=2.4");
  tl.to(panda2, 2, {
    y: 70,
    scale: 0.78,
    ease: Circ.easeIn
  }, "hearts+=5");
  tl.to(handle2, 1, {
    rotation: 0,
    transformOrigin: "0 50%",
    ease: Expo.easeIn
  }, "hearts+=6");
  tl.to(aim3O, 0.25, {
    opacity: 1
  }, "hearts+=7");

  return tl;
}

//create a timeline but initially pause it so that we can control it via click
var triggerHeart = new TimelineMax({
  paused: true
});
triggerHeart.add(heartPanda());

//this toggle kicks off the panda hearts timeline
handle2.on("click", function(e) {
  e.preventDefault();
  triggerHeart.restart();
});

//third one
//variable declaration for the laser panda
var handle1 = $("#handle1"),
  chip = $("#chip"),
  lasers = $("#lasers line"),
  aim1O = $(".aim1-off"),
  panda3 = $("#panda3");

TweenMax.set(lasers, {
  rotation: 150,
  drawSVG: "0 0",
  opacity: 0
});
TweenMax.set(panda3, {
  x: 80,
  visibility: "visible"
});

function laserPanda() {
  var tl = new TimelineMax();

  tl.add("laserIn");
  tl.to(aim1O, 0.25, {
    opacity: 0
  }, "laserIn");
  tl.to(handle1, 1, {
    rotation: 30,
    transformOrigin: "20% 50%",
    ease: Expo.easeOut
  }, "laserIn");
  tl.fromTo(panda3, 2, {
    x: 80
  }, {
    x: 0,
    ease: Circ.easeOut
  }, "laserIn");
  tl.to(chip, 0.75, {
    x: 20,
    ease: Circ.easeOut
  }, "laserIn+=2.5");
  tl.fromTo(lasers, 1, {
    drawSVG: "0 0",
    opacity: 0
  }, {
    drawSVG: true,
    opacity: 0.8
  }, "laserIn+=2.5");
  tl.to(chip, 0.2, {
    opacity: 0
  }, "laserIn+=3");
  tl.to(chip, 0.2, {
    x: -5
  }, "laserIn+=3.5");
  tl.fromTo(lasers, 2, {
    rotation: 150
  }, {
    rotation: 0,
    ease: Power3.easeIn
  }, "laserIn+=3.5");
  tl.fromTo(lasers, 0.75, {
    drawSVG: true
  }, {
    drawSVG: "0 0"
  }, "laserIn+=5.5");
  tl.to(chip, 0.75, {
    x: 0,
    opacity: 1,
    ease: Circ.easeOut
  }, "laserIn+=8");
  tl.to(panda3, 2, {
    x: 80,
    ease: Circ.easeIn
  }, "laserIn+=6.5");
  tl.to(handle1, 1, {
    rotation: 0,
    transformOrigin: "20% 50%",
    ease: Expo.easeIn
  }, "laserIn+=7.5");
  tl.to(aim1O, 0.25, {
    opacity: 1
  }, "laserIn+=8.25");

  return tl;
}

//create a timeline but initially pause it so that we can control it via click
var triggerLaser = new TimelineMax({
  paused: true
});
triggerLaser.add(laserPanda());

//this toggle kicks off the panda laser timeline
handle1.on("click", function(e) {
  e.preventDefault();
  triggerLaser.restart();
});