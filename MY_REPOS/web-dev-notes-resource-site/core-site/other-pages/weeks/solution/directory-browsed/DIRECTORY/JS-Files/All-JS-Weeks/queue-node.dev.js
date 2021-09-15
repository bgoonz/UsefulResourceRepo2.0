"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//! Queue Node
var Node = function Node(val) {
  _classCallCheck(this, Node);

  this.value = val;
  this.next = null;
};

var Queue =
/*#__PURE__*/
function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.front = null;
    this.back = null;
    this.length = 0;
  }

  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(val) {
      var newNode = new Node(val);

      if (!this.front) {
        this.front = newNode;
        this.back = newNode;
      } else {
        this.back.next = newNode;
        this.back = newNode;
      }

      return ++this.length;
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (!this.front) {
        return null;
      }

      var temp = this.front;

      if (this.front === this.back) {
        this.back = null;
      }

      this.front = this.front.next;
      this.length--;
      return temp.value;
    }
  }, {
    key: "size",
    value: function size() {
      return this.length;
    }
  }]);

  return Queue;
}();