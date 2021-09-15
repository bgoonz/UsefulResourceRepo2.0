class _Node {

  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }

}

class _LinkedList {

  constructor() {
    this.head = null;
  }

  size() {
    let node = this.head;
    let count = 0;

    while (node) {
      count++;
      node = node.next;
    }

    return count;
  }

  get(key) {
    let node = this.head;

    while (node) {
      if (node.key === key) return node;
      node = node.next;
    }

    return false;
  }

  add(key, value) {
    if (!this.head) {
      this.head = new _Node(key, value);
    } else {
      this._add(key, value);
    }
  }

  _add(key, value) {
    let curr = this.head;

    while (curr.next) {
      curr = curr.next;
    }

    curr.next = new _Node(key, value);
  }

  deleteAt(key) {
    if (this.head.key === key) {
      let prevHead = this.head;
      this.head = prevHead.next;
    } else {
      this._deleteAt(key);
    }
  }

  _deleteAt(key) {
    let nodeToDelete = this.head;

    while (nodeToDelete) {
      const prev = nodeToDelete;
      nodeToDelete = nodeToDelete.next;

      if (nodeToDelete.key === key) {
        prev.next = nodeToDelete.next;
        break;
      }
    }
  }

  forEach(cb) {
    let node = this.head;

    while (node) {
      cb(node);
      node = node.next;
    }
  }

}

class HashTable {

  constructor(numBuckets = 8) {
    this.store = new Array(numBuckets);
    this.count = 0;
    this.initializeBuckets();
  }

  initializeBuckets() {
    let i = 0;

    while (i < this.numBuckets()) {
      this.store[i] = new _LinkedList();
      i++
    }
  }

  numBuckets() {
    return this.store.length;
  }

  hash(word) {
    let i = 0;
    let digest = 0;

    while (i < word.length) {
      digest += word[i].charCodeAt(0);
    }

    return digest;
  }

  bucket(digest) {
    return this.store[digest % this.numBuckets()];
  }

  set(key, value) {
    this.count++;

    const digest = this.hash(key);
    const bucket = this.bucket(digest);

    bucket.add(key, value);

    if (this.count > this.numBuckets()) this.resizeStore();
  }

  get(key) {
    const digest = this.hash(key);
    const bucket = this.bucket(digest);
    const res = bucket.get(key);

    if (res) {
      return res.value;
    } else {
      return res;
    }
    // ternery operator
    // return res ? res.value : res;
  }

  resizeStore() {
    const oldStore = this.store;
    this.store = new Array(this.numBuckets() * 2);
    this.initializeBuckets();
    this.count = 0;

    oldStore.forEach( bucket => {
      bucket.forEach( node => this.set(node.key, node.value) )
    })
  }

}

// const obj = {};

// obj["foo"] = 1;

// console.log(obj["foo"]);

// obj["foo"] = 2;
