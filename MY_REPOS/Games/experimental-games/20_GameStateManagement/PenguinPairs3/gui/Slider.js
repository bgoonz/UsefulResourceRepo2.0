"use strict";

function Slider(sliderback, sliderfront, layer) {
  GameObjectList.call(this, layer);
  this.dragging = false;
  this.draggingId = -1;
  this.leftmargin = 5;
  this.rightmargin = 7;

  this.back = new SpriteGameObject(sliderback);
  this.front = new SpriteGameObject(sliderfront, 1);
  this.front.position = new Vector2(this.leftmargin, 8);
  this.add(this.back);
  this.add(this.front);
}

Slider.prototype = Object.create(GameObjectList.prototype);

Object.defineProperty(Slider.prototype, "value", {
  get: function () {
    return (
      (this.front.position.x - this.back.position.x - this.leftmargin) /
      (this.back.width - this.front.width - this.leftmargin - this.rightmargin)
    );
  },
  set: function (value) {
    var newxpos =
      value *
        (this.back.width -
          this.front.width -
          this.leftmargin -
          this.rightmargin) +
      this.back.position.x +
      this.leftmargin;
    this.front.position = new Vector2(newxpos, this.front.position.y);
  },
});

Slider.prototype.handleInput = function (delta) {
  GameObjectList.prototype.handleInput.call(this, delta);
  if (Mouse.left.down || Touch.isTouching) {
    if (Touch.isTouchDevice) {
      if (Touch.containsTouch(this.back.boundingBox))
        this.draggingId = Touch.getIndexInRect(this.back.boundingBox);
      if (Touch.containsTouch(this.back.boundingBox) || this.dragging) {
        var touchPos = Touch.getPosition(this.draggingId);
        this.front.position = new Vector2(0, this.front.position.y);
        this.front.position.x = Math.clamp(
          touchPos.x - this.back.worldPosition.x - this.front.width / 2,
          this.back.position.x + this.leftmargin,
          this.back.position.x +
            this.back.width -
            this.front.width -
            this.rightmargin
        );
        this.dragging = true;
      }
    } else {
      var mousePos = Mouse.position;
      if (this.back.boundingBox.contains(mousePos) || this.dragging) {
        this.front.position = new Vector2(0, this.front.position.y);
        this.front.position.x = Math.clamp(
          mousePos.x - this.back.worldPosition.x - this.front.width / 2,
          this.back.position.x + this.leftmargin,
          this.back.position.x +
            this.back.width -
            this.front.width -
            this.rightmargin
        );
        this.dragging = true;
      }
    }
  } else {
    this.dragging = false;
    this.draggingId = -1;
  }
};
