// In-order traversal

// Recursively visit the left sub tree
// Access the data of the current node
// Recursively visit the right sub tree


function inOrderArray(roo) {
  // if the root is null, return an empty array
    if (roo === null) {
        return [];
    }

    let inOrder = [];

    inOrder.push(...inOrderArray(roo.left));
    inOrder.push(roo.val);
    inOrder.push(...inOrderArray(roo.right));

    return inOrder;

    // let top = roo;
    // let current = roo;
    // let newArr = [];
    // while(current.left !== null) {
    //   current = current.left;
    //   if (current.left === null && !(newArr.includes(current.val))) {
    //       newArr.push(current.val)
    //       console.log("newArr:::::", newArr);
    //   } else {
    //    //  inOrderArray(top.left);
    //    inOrderArray(current.val)
    //   }
    // }

    // get the array for visiting the left node
    // get the array for visiting the right node


    // return the left array concatenated with the right array
    //   concatenated with the root value

}

// Post-order traversal

// Recursively visit the left sub tree
// Recursively visit the right sub tree
// Access the data of the current node

function postOrderArray(roo) {
  // if the root is null, return an empty array
    if (roo === null) {
        return [];
    }

    let postOrder = [];

    postOrder.push(...postOrderArray(roo.left));
    postOrder.push(...postOrderArray(roo.right));
    postOrder.push(roo.val);

    return postOrder;

  // get the array for visiting the left node
  // get the array for visiting the right node

  // return the left array concatenated with the right array
  //   concatenated with the root value

}


module.exports = {
  inOrderArray,
  postOrderArray
};
