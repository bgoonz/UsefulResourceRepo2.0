// Google and Apple ask you to design a stack that, in addition to the push and
// pop functions, has a function min that returns the minimum element in the stack
// without removing it. All three functions push, pop, and min should operate in
// O(1) time.

//
// .What are we coding?
// Are there any constraints on the input/output?
// What edge cases can we expect?
// .

LIFO
has a top and length
if we have a stack with many elements in it, to find elements in 0(1), we want a pointer to track min element

Edge cases

this.length === 0 {

}

this.length === 1 {


}

when min value gets popped {
    calculate the new min value
}
let currentNode = this.top
while(currentNode) {

    if(currentNode.next.value > currentNode.value) {
        this.min = currentNode.next.value
    }
    currentNode = currentNode.next
}

constructor instance variables
-top
-length
-min

->push(input) {
    -initialize new Node
    -If they dont meet edge cases,
    -initialize new Node to top

    -otherwise,
    -the Node below this one will be the top
    --update length ++

}

->pop () {
    -save top to a variable (removedTop)

    -if (there are no elements in this stack)
    =return undefined
    -if(there is only one element in the stack)
    -this.top = null
    -min = null

    -otherwise, we do our normal behavior
    -reassign our top pointer from removedTop to point to the one
    next in line

    -if removedTop === minimum, then we reassign new min

    -update length --
    -return the value of the removed top
}
[5,7,4,10,1,12]
[5,4,1]

->min() {
    minArray = [infinity,]

    if this.top.value < this.min
    this.min = this.top.value

    if this.top is removed,

    {
    calculate the new min value
}
let currentNode = this.top
-if (there are no elements in the stack)
this.min = currentNode.value
minArray.push(currentNode.value)

-if


}

-> this.min = Infinity
if(this element is less than min), then
assign this.min to current element
