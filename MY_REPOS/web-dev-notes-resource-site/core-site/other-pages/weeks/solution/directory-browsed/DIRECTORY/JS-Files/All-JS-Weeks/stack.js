// ============================================================================
// Implementation Exercise: Stack
// ============================================================================
//
// -------
// Prompt:
// -------
//
// Implement a Stack and all of its methods below!
//
// ------------
// Constraints:
// ------------
//
// Make sure the time and space complexity of each is equivalent to those
// in the table provided in the Time and Space Complexity Analysis section
// of your Stack reading!
//
// -----------
// Let's Code!
// -----------

class Node {
//properties:  value,next
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor(){
        this.top = null;
        this.length = 0;
    }

    push(value){
        let newNode = new Node(value);
        if (this.length === 0){
            this.top = newNode;
            this.length = 1;
        }
        else {
            newNode.next = this.top;
            this.top = newNode;

            this.length += 1;
        }
        return this.length;
    }



    //pop : Should remove the newest node after newer nodes have already been added and removed
    //      Should not accept any input parameters
    //      Should not throw an error when calling pop on an empty stack
    //      Should return null if called on an empty stack
    //      Should reassign the top pointer to null if there is only one node in the stack
    //size
    pop () {
        if (this.length === 0) {
            return null;
        }

        let popped = this.top;
        this.top = this.top.next;
        if (this.length === 1) {
            this.top = null;
        }
        this.length -= 1;
        return popped.value;
    }

    size() {
        return this.length;
        // muahahahahahahaha
    }
}

exports.Node = Node;
exports.Stack = Stack;
