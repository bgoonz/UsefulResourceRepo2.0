// 4.3. List of Depths: Given a binary tree, design an algorithm which creates a linked 
// list of all the nodes at each depth 
// (e.g., if you have a tree with depth D, you'll need D linked lists).

class LinkedListNode(data) {
	constructor(data, next){
		this.data = data || null;
  	this.next = next || null;
	}
}
class LinkedList() {
	constructor(){
  	this.head = null;
  	this.tail = null;
	}

	append(value){
		if(this.head === null){
			this.head = new LinkedListNode(value);
			this.tail = this.head;
		} else {
			this.tail.next = new LinkedListNode(value);
			this.tail = this.tail.next;
		}
}

class BinaryTreeNode(value) {
  constructor(){
    this.value = value;
    this.left  = null;
    this.right = null;
  }

  whoAmI(){
    return `Node ${this.value}`;
  }
}

class BinaryTreeNode(value) {
  constructor(){
    this.value = value;
    this.parent = this.left = this.right = null;
  }
}
class BinaryTree(){
  constructor(value){
    this.root = value || null;
  }
}

const createList = (root) => {
	let lists = [];
	if(!root) return lists;
	addToList(lists, root, 0);
	
	return lists;
}

function addToList(lists, node, depth){
	if(node){
		if(!lists[depth]){
			lists[depth] = new LinkedList();
		}


		lists[depth].append(node.val);
		addToList(lists, node.left, depth + 1);
		addToList(lists, node.right, depth + 1);
	}
}
