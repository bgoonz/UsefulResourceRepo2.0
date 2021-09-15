'use strict';

/**
 * Shape class.
 * 
 * @constructor
 * @param {String} id - The id.
 * @param {Number} x  - The x coordinate.
 * @param {Number} y  - The y coordinate.
 */
function Shape(id, x, y) {
    this.id = id;
    this.setLocation(x, y);
}

/**
 * Set shape location.
 * 
 * @param {Number} - The x coordinate.
 * @param {Number} - The y coordinate.
 */
Shape.prototype.setLocation = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Get shape location.
 * 
 * @return {Object}
 */
Shape.prototype.getLocation = function() {
    return {
        x: this.x,
        y: this.y
    };
};

/**
 * Get shape description.
 * 
 * @return {String}
 */
Shape.prototype.toString = function() {
    return 'Shape("' + this.id + '")';
};

/**
 * Circle class.
 * 
 * @constructor
 * @param {String} id     - The id.
 * @param {Number} x      - The x coordinate.
 * @param {Number} y      - The y coordinate.
 * @param {Number} radius - The radius.
 */
function Circle(id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

/**
 * Get circle description.
 * 
 * @return {String}
 */
Circle.prototype.toString = function() {
    return 'Circle > ' + Shape.prototype.toString.call(this);
};

// test the classes
var myCircle = new Circle('mycircleid', 100, 200, 50); // create new instance
console.log(myCircle.toString()); // Circle > Shape("mycircleid")
console.log(myCircle.getLocation()); // { x: 100, y: 200 }