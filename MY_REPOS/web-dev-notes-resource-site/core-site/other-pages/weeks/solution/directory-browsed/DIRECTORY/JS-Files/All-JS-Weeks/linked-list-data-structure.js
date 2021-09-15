//PART 1
// const n1 = {
//     data: 100
// }

// const n2 = {
//     data: 200
// }

// const n3 = {
//     data: 300
// }

// const n4 = {
//     data: 400
// }

// const n5 = {
//     data: 500
// }

// const n6 = {
//     data: 600
// }

// n1.next = n2;
// n2.next = n3;
// n3.next = n4;
// n4.next = n5;
// n5.next = n6;

// console.log(n1);
// console.log(n2);
// console.log(n3);
// console.log(n4);
// console.log(n5); //are there ll node limits in read-outs?

/******************************************************** */

//PART 2

// class Node {
//     constructor(data, next = null) {
//         this.data = data
//         this.next = next
//     }
// }

// const n1 = new Node(100);
// console.log(n1)

// class LinkedList {
//     constructor() {
//         this.head = null;
//         this.size = 0;
//     }

//     //Insert first node
//     insertFirst(data) {
//         this.head = new Node(data, this.head);
//         this.size++;

//     }

//     //Insert last node
//     insertLast(data) {
//         let node = new Node(data);
//         let current;

//         if(!this.head) {
//             this.head = node;
//         } else {
//             current = this.head

//             while(current.next) {
//                 current = current.next;
//             }
//             current.next = node;
//         }

//         this.size++;
//     }

//     //Insert at index
//     insertAt(data, index) {
//         if(index > 0 && index > this.size) { //if index is out of range
//         return;
//         }

//         if(index === 0) {
//             this.head = new Node(data, this.head); //if it's the first
//             return;
//         }
        
//         const node = new Node(data);
//         let current, previous;

//         current = this.head;  //set current to first
//         let count = 0;
//         while(count < index) {
//             previous = current; //node before index to insert;
//             count++;
//             current = current.next //node after index
//         }

//         node.next = current;
//         previous.next = node;

//         this.size++
//     }

//     //Get at index
//     getAt(index) {
//         let current = this.head;
//         let count = 0;

//         while(current){
//             if(count === index) {
//                 console.log(current.data)
//             }
//             count++;
//             current = current.next;
//         }
//        return;    
//     }   
    
//     //Remove at index
//     removeAt(index) {
//         if(index > 0 && index > this.size) { //if out of range
//             return;
//         }

//         let current = this.head;
//         let previous;
//         let count = 0;

//         if (index === 0) { //remove first
//             this.head = current.next;
//         } else {
//             while(count < index) {
//                 count++;
//                 previous = current;
//                 current = current.next;
//             }

//             previous.next = current.next;
//         }    

//         this.size--;
//     }

//     //Clear List
//     clearList() {
//         this.head = null;
//         this.size = 0
//     }

//     //Print list data
//     printListData() {
//         let current = this.head;

//         while(current) {
//             console.log(current.data);
//             current = current.next;
//         }
//     }
// }

// const ll = new LinkedList();
// ll.insertFirst(100);
// ll.insertFirst(200);
// ll.insertFirst(300); //reason 300 is first, bc it's the last insertFirst we called

// ll.clearList();

// ll.insertLast(400); //prints at the end!

// ll.insertAt(500, 2); //insert 500 at index 2

// ll.removeAt(0); //remove this index

// ll.getAt(0);

// ll.printListData();
