/**
 * this question is super easy, 80ms used
 * @constructor
 */
class Stack {
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
     this.stack.pop();
 }

 /**
  * @returns {number}
  */
 top() {
     return this.stack[this.stack.length - 1];
 }

 /**
  * @returns {boolean}
  */
 empty() {
     return this.stack.length === 0;
 }
}
