class Node {
	constructor( val ) {
		this.value = val;
		this.next = null;
		this.previous = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	addToTail( val ) {
		const newNode = new Node( val );

		if ( !this.head ) {
			this.head = newNode;
		} else {
			this.tail.next = newNode;
			newNode.previous = this.tail;
		}

		this.tail = newNode;
		this.length++;
		return this;
	}

	removeTail() {
		if ( !this.tail ) return undefined;
		let current = this.tail;
		this.tail = current.previous;
		if ( this.tail ) {
			this.tail.next = null;
		} else {
			this.head = null;
		}
		this.length--;
		return current.value;
	}

	addToHead( val ) {
		let newNode = new Node( val );
		if ( this.head ) {
			this.head.previous = newNode;
			newNode.next = this.head;
			newNode.next = this.head;
		} else {
			this.tail = newNode;
		}
		this.head = newNode;
		this.length++;
		return this;
	}

	removeHead() {
		if ( !this.head ) return undefined;
		const currentHead = this.head;
		this.head = currentHead.next;
		if ( this.head ) {
			this.head.previous = null;
		} else {
			this.tail = null;
		}
		this.length--;
		return currentHead.value;
	}

	contains( target ) {
		let node = this.head;
		while ( node ) {
			if ( node.value === target ) return true;
			node = node.next;
		}
		return false;
	}

	get( index ) {
		if ( index < 0 || index >= this.length ) return null;
		let counter = 0;
		let current = this.head;
		while ( counter !== index ) {
			current = current.next;
			counter++;
		}
		return current;
	}

	set( index, val ) {
		const foundNode = this.get( index );
		if ( foundNode ) {
			foundNode.value = val;
			return true;
		}
		return false;
	}

	insert( index, val ) {
		if ( index < 0 || index > this.length ) return false;
		if ( index === this.length ) return !!this.addToTail( val );
		if ( index === 0 ) return !!this.addToHead( val );

		const newNode = new Node( val );
		const prev = this.get( index - 1 );
		const temp = prev.next;
		prev.next = newNode;
		newNode.next = temp;
		this.length++;
		return true;
	}

	remove( index ) {
		if ( index < 0 || index >= this.length ) return undefined;
		if ( index === 0 ) return this.removeHead();
		if ( index === this.length - 1 ) return this.removeTail();
		const previousNode = this.get( index - 1 );
		const removed = previousNode.next;
		previousNode.next = removed.next;
		this.length--;
		return removed;
	}

	size() {
		return this.length;
	}

	peakHead() {
		if ( !this.head ) {
			return undefined;
		}
		return this.head.value;
	}

	peakTail() {
		if ( !this.tail ) {
			return undefined;
		}
		return this.tail.value;
	}
}

exports.Node = Node;
exports.LinkedList = LinkedList;
