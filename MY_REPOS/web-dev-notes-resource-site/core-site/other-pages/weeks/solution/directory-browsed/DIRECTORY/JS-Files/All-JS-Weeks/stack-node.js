class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class StackNode {
	constructor() {
		this.top = null;
		this.length = 0;
	}

	push(val) {
		const newNode = new Node(val);
		if (!this.top) {
			this.top = newNode;
		} else {
			const temp = this.top;
			this.top = newNode;
			this.top.next = temp;
		}
		this.length++;
		return this.length;
	}

	pop() {
		if (!this.top) {
			return null;
		}
		const temp = this.top;
		this.top = this.top.next;
		this.length--;
		return temp.value;
	}

	peek() {
		if (!this.top) {
			return null;
		}
		return this.top.value;
	}

	size() {
		return this.length;
	}
}
