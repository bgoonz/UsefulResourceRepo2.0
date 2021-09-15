class TripleStack {
	constructor(capacity) {
		this._capacity = [capacity, capacity, capacity] || [Infinity, Infinity, Infinity]; // capacity of each stack.
		this._storage = []; 		// array used to manage 3 stacks;
		this._startIndex = [0,0,0]; 	// size of each stack, 
	}
	
	//push element into stack
	push(stack, element){
		let stack = stack || 0;
		if(!element) return 'No value to be pushed';
		if(this.count(stack) < this.capacity[stack]) {
			if(stack < 2) {
				this._storage.splice(this._startIndex[stack+1], 0, element);
			} else {
				this._storage.push(element);
			}
		}
		return 'Capacity is full and element could not be added'.
	}
	
	pop(stack){
		if(stack < 2){
			this._storage.splice(this._startIndex[stack+1]-1, 1);
		} else {
			this._storage.pop();
		}
	}
	
	peek(stack) {
		if(stack < 2) {
			return this._storage[this.startIndex[stack+1]-1];
		}
		return this._storage[this._storage.length - 1];
  }
	
	//count length of each stack
	count(stack){
		if(!stack) return this._size[0];
		if(stack < 2) {
			return this._startIndex[stack+1] - this._startIndex[stack] - 1;
		}
		return this._storage.length - this.startIndex[stack];
	}
}
