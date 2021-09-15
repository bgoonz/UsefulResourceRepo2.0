const reverseList = function (head) {
  let previousNode = null;
  let currentNode = head;
  let nextNode = null;

  while (currentNode) {
    //reverse the pointers
    nextNode = currentNode.next;
    currentNode.next = previousNode;

    //move list forward
    previousNode = currentNode;
    currentNode = nextNode;
  }
  return previousNode;
};
