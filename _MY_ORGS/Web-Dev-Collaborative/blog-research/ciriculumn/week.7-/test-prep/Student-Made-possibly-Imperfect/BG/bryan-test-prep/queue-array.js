//!Queue Array:
// Using the first element of the array as the "front" of the queue
class QueueArray {
	constructor() {
		this.queue = [];
	}
	enqueue( value ) {
		this.queue.push( value );
	}
	dequeue() {
		return this.queue.shift();
	}
	peek() {
		return this.queue[ 0 ];
	}
}
// Using the last element of the array as the "front" of the queue
class QueueArray {
	constructor() {
		this.queue = [];
	}
	enqueue( value ) {
		this.queue.unshift( value );
	}
	dequeue() {
		return this.queue.pop();
	}
	peek() {
		return this.queue[ this.queue.length - 1 ];
	}
}
