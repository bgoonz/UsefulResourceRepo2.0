function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, prev, next) {
  this.value = value;
  this.prev = prev;
  this.next = next;
}

LinkedList.prototype.addHead = function (value) {
  var newNode = new Node(value, null, this.head);

  if (this.head) {
    this.head.prev = newNode;
  } else {
    this.tail = newNode;
  }
  this.head = newNode;
};

LinkedList.prototype.addTail = function (value) {
  var newNode = new Node(value, this.tail, null);
  if (this.tail) {
    this.tail.prev = newNode;
  } else {
    this.head = newNode;
  }
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function () {
  if (!this.head) {
    return null;
  }
  var val = this.head.value;
  //remove head from ll
  var newHead = this.head.next;
  //find newHead to replace
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  return val + " <=removed";
};

LinkedList.prototype.removeTail = function () {
  //if there is no tail then it should return null
  if (!this.tail) {
    return null;
  }
  //if there is a tail it needs to become the previous tail
  var val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  return val;
};

LinkedList.prototype.search = function (searchValue) {
  //need to find if the searchValue === to the node value
  //default case;
  if (!this.head) {
    return null;
  }

  //iterate through nodes
  //check to see if the value of each match the searchValue
  //if so return found
  var currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === searchValue) {
      return "found!";
    }
    //keep the currentNode value tue, looking at its next Node
    currentNode = currentNode.next;
  }
  return null;
};

LinkedList.prototype.indexOf = function (searchValue) {
  //default case
  if (!this.head) {
    return null;
  }
  //start at head of list
  var counter = 0;
  var currentNode = this.head;
  var indexArray = [];

  while (currentNode) {
    if (currentNode.value === searchValue) {
      indexArray.push(counter);
    }
    counter++;
    currentNode = currentNode.next;
  }
  return indexArray;
};

var ll = new LinkedList();

ll.addHead(3);
ll.addHead(5);
ll.addHead(1);
ll.addHead(3);
ll.addHead(8);

ll.indexOf(3);
