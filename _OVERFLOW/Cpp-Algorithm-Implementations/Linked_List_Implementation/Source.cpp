#include <array>
#include<iostream>
using namespace std;


class intNode {
//Class for individual nodes.
private:
	int val;
	intNode* next;
	friend class SinglyLinkedList;
};


class SinglyLinkedList {
//Class for a SLL object
public:
	SinglyLinkedList();
	void addFront(int n);
	int getNth(int n);
	void TraverseNPrint();
	void swapNodes(int i, int j);
	void Sort();
private:
	intNode* head;
	int length = 0;
};

//Constructor
SinglyLinkedList::SinglyLinkedList() :head(NULL) {}


void SinglyLinkedList::addFront(int n) {
	//Input: an integer
	//links a new node with value=n as the head of the SLL.
	intNode* node = new intNode;
	node->val = n;
	node->next = head;
	head = node;
	length += 1;
}

int SinglyLinkedList::getNth(int n) {
	//returns the value of the nth node in the SLL.
	if (n >= length) { 
		cout << "Error index out of range"; 
		return -999; 
	}
	intNode* currentNode = head;
	int k = 0;
	while (k != n) {
		currentNode = currentNode->next;
		k++;
	}
	return currentNode->val;
}

void SinglyLinkedList::TraverseNPrint() {
	//traverses the SLL and prints the value of each node.
	intNode* currentNode = head;
	if (currentNode == NULL) { return; }
	while ((currentNode->next) != NULL) {
		cout << currentNode->val << endl;
		currentNode = currentNode->next;
	}
	cout << currentNode->val << endl;
	return;
};

void SinglyLinkedList::swapNodes(int i, int j) {
	//Swaps the ith and jth node in the SLL. Where i<=j.

	intNode* currentNode = head;
	intNode* beforeI=NULL;
	intNode* NodeI=NULL;
	intNode* beforeJ=NULL;
	intNode* NodeJ=NULL;
	intNode*tmp = NULL;

	//Pass through the LL and save pointers to the (I-1)th,(Ith), (J-1)th, and Jth Node
	//If the i=0 then there is not (I-1)th node and the pointer is NULL
	//If i=j-1 then the (Ith) and (J-1)th pointer are equivalent
	int k = 0;
	while((*currentNode).next != NULL) {
		if ((i==0)&&(k==0)) {
			beforeI = NULL;
			NodeI = currentNode;
		}
		if (k == i-1) {
			beforeI = currentNode;
			NodeI = currentNode->next;
		}
		if (k == j-1) {
			beforeJ = currentNode;
			NodeJ = currentNode->next;
		}
		k++;
		currentNode = (currentNode->next);
	}

	//connect connect (I-1)th and (J-1)th nodes to (I+1)th node and (J+1)th node
	//If (I-1)th node=NULL point head to (I+1)th Node
	if (beforeI==NULL) {head = NodeI->next;}
	else { beforeI->next = NodeI->next;}
	beforeJ->next = NodeJ->next;

	//if i=j-1 just connect Jth Node to Ith Node and return
	if (i == j - 1) {
		NodeJ->next = NodeI;
		return;
	}

	// if i<j we swap the connections of the Ith and Jth Node
	else {
		//Save the node after J so we can connect it to I
		tmp = NodeJ->next;
		NodeJ->next = NodeI->next;
		NodeI->next = tmp;

		//Then we connect (I-1)/head to the Jth Node
		if (beforeI == NULL) { head = NodeJ;}
		else { beforeI->next = NodeJ;}
		//connect (J-1)node too the Ith node
		beforeJ->next = NodeI;
		return;
	}
	return;
}


void SinglyLinkedList::Sort() {
	//Uses selection sort to sort the values contained within the SLL
	//helper functions: getNth, swapNodes
	int i,j, minIndex;
	for (i = 0;i < length;i++) {
		minIndex = i;
		for (j = i + 1;j < length;j++) {
			if (getNth(j) < getNth(minIndex)) { minIndex = j; }
		}
		swapNodes(i, minIndex);
	}
}

int main() {
	SinglyLinkedList SLL;
	SLL.addFront(15);
	SLL.addFront(14);
	SLL.addFront(13);
	SLL.addFront(13);
	SLL.addFront(14);
	SLL.addFront(111);
	SLL.addFront(4);
	SLL.addFront(5);

	SLL.TraverseNPrint();
	cout << endl;
	SLL.Sort();
	SLL.TraverseNPrint();

	do {
		cout << '\n' << "Press the Enter key to continue.";
	} while (cin.get() != '\n');

	return 0;
}