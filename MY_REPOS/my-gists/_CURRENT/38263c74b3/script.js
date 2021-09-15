// GFX Artwork by Gabriel Uribe
// https://www.gabrieluribe.com/portfolio/astral-city-parallax/
!(function () {
  "use strict";
  var Xi = 0,
    Yi = 0,
    Zi = 0,
    rotation,
    nParticles = 180;
  var faces,
    localTransform = [],
    particles = [];
  var screen = ge1doot.screen;
  var drag = ge1doot.drag;
  var perp = new ge1doot.Ease(0.05, 300);
  var pspd = new ge1doot.Ease(0.1, 1);
  // ==== particles constructor ====
  function Particle(img, x, y, z, life) {
    this.img = document.createElement("img");
    this.img.className = "particle";
    this.img.src = img.src;
    document.getElementById("scene").appendChild(this.img);
    this.img.style.visibility = "visible";
    this.maxLife = life;
    this.life = Math.random() * life;
    this.pos = { x: x, y: y, z: z };
    this.vel = { x: 0, y: 0, z: 0 };
    this.ini = { x: x, y: y, z: z };
  }
  // ==== particles animation ====
  Particle.prototype.anim = function () {
    var a = 0.5 / this.life;
    this.life -= pspd.value;
    this.pos.x += this.vel.x += (Math.random() * 50 - 25) * a * pspd.value;
    this.pos.y += this.vel.y += (Math.random() * 50 - 25) * a * pspd.value;
    this.pos.z += this.vel.z += (Math.random() * 50 - 25) * a * pspd.value;
    if (this.life < 0) {
      this.pos.x = this.ini.x;
      this.pos.y = this.ini.y;
      this.pos.z = this.ini.z;
      this.life = Math.random() * this.maxLife;
      this.vel.x = 0;
      this.vel.y = 0;
      this.vel.z = 0;
    }
  };

  // ==== init script ====
  screen.init("screen", function () {}, true);
  drag.init(screen);
  faces = document.getElementById("scene").getElementsByTagName("img");
  localTransform = [];
  rotation = {
    ex: 0,
    ey: 0,
    ry: 90,
    x: 0,
    y: 0,
    ease: function (x, y) {
      this.ry *= 0.98;
      this.y = -(this.ey += (x - this.ey) * 0.06) / 3;
      this.x = (this.ex += (y - this.ex) * 0.06) / 3 - this.ry;
    },
  };
  // ==== init faces ====
  for (var i = 0, n = faces.length; i < n; i++) {
    var elem = faces[i];
    var s = elem.getAttribute("data-transform");
    elem.style.transform = s;
    elem.style.webkitTransform = s;
    elem.style.visibility = "visible";
    localTransform.push(s);
  }
  // ==== create particles ====
  var particle = document.getElementById("particle");
  for (var i = 0; i < nParticles; i++) {
    particles.push(new Particle(particle, -5, -20, 80, 200));
  }

  // ==== main loop ====
  function run() {
    requestAnimationFrame(run);
    perp.ease(drag.active ? 200 : 300);
    pspd.ease(drag.active ? 0.05 : 1);
    rotation.ease(drag.x, drag.y);
    var globalRotation =
      "perspective(" +
      perp.value +
      "px) scale(0.7) rotateX(" +
      rotation.x +
      "deg) " +
      "rotateY(" +
      rotation.y +
      "deg) ";
    // ==== anim faces ====
    for (var i = 0, n = faces.length; i < n; i++) {
      var elem = faces[i];
      var s = globalRotation + localTransform[i];
      elem.style.transform = s;
      elem.style.webkitTransform = s;
    }
    // ==== anim particles ====
    for (var i = 0; i < nParticles; i++) {
      var part = particles[i];
      part.anim();
      var s =
        globalRotation +
        "translate3d(" +
        part.pos.x +
        "px," +
        part.pos.y +
        "px," +
        part.pos.z +
        "px) rotateY(" +
        -rotation.y +
        "deg) rotateX(" +
        -rotation.x +
        "deg)";
      part.img.style.transform = s;
      part.img.style.webkitTransform = s;
    }
  }

  // ==== start animation ====
  requestAnimationFrame(run);
})();
