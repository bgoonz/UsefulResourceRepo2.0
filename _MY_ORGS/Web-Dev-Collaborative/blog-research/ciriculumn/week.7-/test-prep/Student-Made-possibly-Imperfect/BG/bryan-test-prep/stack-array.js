//!Stack Array
// Using the last element of the array as the "top" of the stack
// This is more efficient than the second implementation because we can push and
// pop from an array in O(1) time since we don't have to reassign any indices.
class StackArray {
	constructor() {
		this.stack = [];
	}

	push( value ) {
		this.stack.push( value );
	}

	pop() {
		return this.stack.pop();
	}

	peek() {
		return this.stack[ this.stack.length - 1 ];
	}
}

// Using the first element of the array as the "top" of the stack
// This is not as efficient as the previous implementation since we have to
// reassign indices for a shift and unshift, but the user will see the same
// functionality.
class StackArray {
	constructor() {
		this.stack = [];
	}

	push( value ) {
		this.stack.unshift( value );
	}

	pop() {
		return this.stack.shift();
	}

	peek() {
		return this.stack[ 0 ];
	}
}
