const reverseBetween = (head, m, n) => {
  if (m >= n) return head;
  let currentNode = head;
  let previousNode = head;
  let temp = null,
    temp2 = null,
    tempStart = null;
  let countm = 0,
    countn = 0;
  if (!currentNode.next) return head;

  let startNode = head;

  //Move previousNode to m and currentNode to m+1
  let flag;
  while (countm < m && currentNode !== null) {
    if (!flag) flag = 1; //need to check whether m is whithin range
    //advance pointer and do nothing
    startNode = previousNode;
    previousNode = currentNode;
    currentNode = currentNode.next;
    countm++;
  }

  if (!flag) return head; //m doesn't exist within range

  //edge case when m=1
  if (startNode === previousNode) {
    while (countn < n - m && currentNode !== null) {
      //save original location
      temp = currentNode.next;

      //switch pointers
      currentNode.next = previousNode;
      startNode.next = temp;
      previousNode = currentNode;

      //advance node
      currentNode = temp;
      countn++;
    }
    return previousNode;
  }

  // when m>1
  while (flag === 1 && countn < n - m && currentNode !== null) {
    //save original locations for advancement after switching pointers
    temp = currentNode.next;
    temp2 = previousNode;

    //switch pointers
    currentNode.next = startNode.next;
    startNode.next = currentNode;
    previousNode.next = temp;

    //advance prev & cur using the original locations
    previousNode = temp2;
    currentNode = temp;
    countn++;
  }

  return head;
};
