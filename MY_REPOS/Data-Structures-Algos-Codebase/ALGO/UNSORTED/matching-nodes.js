/* global isMatchingNode */

// Make the function accept the node from the first tree and the second tree
// where we need to find the matching node
export default ( node, tree ) => {
  // Easiest way to optimize this is to store the path from the node to the root
  // and then we can traverse back down the second tree following the same path
  const path = [ node ];

  let // Use the child variable to find the matching node in the second tree
    child = tree;

  // Loop through all the parent nodes, pushing it into the stack as the pathway
  while ( node = node.parentNode ) {
    path.push( node );
  }

  // Pop the last thing we pushed onto the path since it'll be the root node
  // E.g. It'll be the tree that we are passing in anyway
  path.pop();

  // Once the loop is done, we have the root node and can go back down the tree
  while ( node = path.pop() ) {
    for ( let i = 0; i < child.childNodes.length; i++ ) {
      // Here we assume we have a function called `isMatchingNode` that returns
      // us a boolean in the case of two nodes matching each other
      if ( isMatchingNode( node, child.childNodes[ i ] ) ) {
        child = child.childNodes[ i ];
        break; // Break looping over more nodes
      }
    }
  }

  return child;
};
