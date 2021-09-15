/**
 * @constructor
 */
class Queue {
 constructor() {
     this.stack = [];
 }

 /**
  * @param {number} x
  * @returns {void}
  */
 push(x) {
     this.stack.push(x);
 }

 /**
  * @returns {void}
  */
 pop() {
     this.stack.shift();
 }

 /**
  * @returns {number}
  */
 peek() {
     return this.stack[0];
 }

 /**
  * @returns {boolean}
  */
 empty() {
     const length = this.stack.length;
     if (length === 0) return true;
     return false;
 }
}
