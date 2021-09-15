(function () {
  "use strict";
  function ParticleImage(clip, startX, startY, floor) {
    this.Container_constructor();
    this.init(clip, startX, startY, floor);
  }

  var p = createjs.extend(ParticleImage, createjs.Container);
  p.velX = null;
  p.velY = null;
  p.time = null;
  p.startX = null;
  p.startY = null;
  p.clip = null;
  p.floor = null;

  p.init = function (clip, startX, startY, floor) {
    this.velX = g.getRange(-10, 10);
    this.velY = g.getRange(-40, -20);
    this.time = g.getRange(0, 60);
    this.startX = startX;
    this.startY = startY;

    this.x = startX;
    this.y = startY;

    this.clip = clip;

    this.floor = floor != null ? floor : null;

    this.addChild(clip);
  };

  p.update = function (delta) {
    this.velY *= 0.98;
    this.x += this.velX * delta;
    this.y += this.velY * delta;
    this.velY += 3.95 * delta;

    //this.rotation += this.spin;
    this.rotation = Math.atan2(this.velY, this.velX) * (180 / Math.PI);
    if (this.floor != null) {
      if (this.y >= this.floor) {
        this.y = this.floor;
        this.rotation = this.spin;
        this.velX = 0;
      }
    }
  };

  p.reset = function () {
    this.velX = g.getRange(-5, 5);
    this.velY = g.getRange(-25, 1);
    this.x = this.startX;
    this.y = this.startY;
  };

  window.ParticleImage = createjs.promote(ParticleImage, "Container");
})();
