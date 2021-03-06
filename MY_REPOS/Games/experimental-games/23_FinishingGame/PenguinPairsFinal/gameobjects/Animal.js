"use strict";

function Animal(color, sprite, layer) {
  powerupjs.SpriteGameObject.call(this, sprite, layer);

  this.initialPosition = powerupjs.Vector2.zero;
  this.boxed = color === color.toUpperCase();
  this.initialEmptyBox = this.boxed && color.toLowerCase() === "x";
  this.sheetIndex = "brgyopmx".indexOf(color.toLowerCase());
}

Animal.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Object.defineProperty(Animal.prototype, "currentBlock", {
  get: function () {
    var tileField = this.root.find(ID.tiles);
    var p = new powerupjs.Vector2(
      Math.floor(this.position.x / tileField.cellWidth),
      Math.floor(this.position.y / tileField.cellHeight)
    );
    if (this.velocity.x > 0) p.x++;
    if (this.velocity.y > 0) p.y++;
    return p;
  },
});

Animal.prototype.reset = function () {
  this.position = this.initialPosition.copy();
  this.velocity = powerupjs.Vector2.zero;
  this.visible = true;
  if (this.initialEmptyBox) this.sheetIndex = 7;
};

Animal.prototype.handleInput = function (delta) {
  if (
    !this.visible ||
    this.boxed ||
    this.velocity.x != 0 ||
    this.velocity.y != 0
  )
    return;
  if (powerupjs.Touch.isTouchDevice) {
    if (!powerupjs.Touch.containsTouchPress(this.boundingBox)) return;
  } else {
    if (
      !powerupjs.Mouse.left.pressed ||
      !this.boundingBox.contains(powerupjs.Mouse.position)
    )
      return;
  }
  var animalSelector = this.root.find(ID.animalSelector);
  if (animalSelector.visible) return;

  animalSelector.position = this.position;
  animalSelector.visible = true;
  animalSelector.selectedAnimal = this;
  powerupjs.Mouse.reset();
  powerupjs.Touch.reset();
};

Animal.prototype.update = function (delta) {
  powerupjs.SpriteGameObject.prototype.update.call(this, delta);
  if (!this.visible || this.velocity.isZero) return;

  var target = this.currentBlock;
  var tileField = this.root.find(ID.tiles);

  if (tileField.getTileType(target) == TileType.background) {
    this.visible = false;
    this.velocity = powerupjs.Vector2.zero;
    sounds.lost.play();
  } else if (tileField.getTileType(target) == TileType.wall) this.stopMoving();
  else {
    var a = this.root.findAnimalAtPosition(target);
    if (a != null && a.visible) {
      if (a.isSeal()) this.stopMoving();
      else if (a.isEmptyBox()) {
        this.visible = false;
        a.sheetIndex = this.sheetIndex;
      } else if (
        a.sheetIndex == this.sheetIndex ||
        this.isMulticolor() ||
        a.isMulticolor()
      ) {
        a.visible = false;
        this.visible = false;
        this.root.find(ID.pairList).addPair(this.sheetIndex);
        sounds.pair.play();
      } else this.stopMoving();
    }

    var s = this.root.findSharkAtPosition(target);
    if (s != null && s.visible) {
      s.visible = false;
      this.visible = false;
      this.stopMoving();
      sounds.eat.play();
    }
  }
};

Animal.prototype.stopMoving = function () {
  var tileField = this.root.find(ID.tiles);
  this.velocity.normalize();
  var currBlock = this.currentBlock;
  this.position = new powerupjs.Vector2(
    Math.floor(currBlock.x - this.velocity.x) * tileField.cellWidth,
    Math.floor(currBlock.y - this.velocity.y) * tileField.cellHeight
  );
  this.velocity = powerupjs.Vector2.zero;
};

Animal.prototype.isSeal = function () {
  return this.sheetIndex === 7 && !this.boxed;
};

Animal.prototype.isMulticolor = function () {
  return this.sheetIndex === 6 && !this.boxed;
};

Animal.prototype.isEmptyBox = function () {
  return this.sheetIndex === 7 && this.boxed;
};
