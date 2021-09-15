#include <iostream>
#include <stdlib.h>
#include <cmath>
using namespace std;



//SIZE OF HEAP
const size_t N = 1000;



//Fills the array of size N with random integers [0-1000]
void fillArray(int (&arr)[N]) {
	for (int i = 1;i <= N;i++) {
		arr[i] = rand() % 1000;
	}
	return;
}

//prints the input array to terminal
void printArray(int (&arr)[N]) {
	cout<<'[';
	for (int i = 0; i < N; i++) {
		cout << arr[i] << ", ";
	}
	cout<<arr[N]<< ']' <<endl;
}


//swaps values of two indices in an array
void Swap(int (&arr)[N], int i, int j) {
	int tmp=arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
	return;
}

//returns the index attributed to the max of two values in an array
int maxIndex(int (&arr)[N], int leftidx, int rightidx) {
	if (arr[leftidx] > arr[rightidx]) { return leftidx; }
	else { return rightidx; }
}


//Helper function to check the functionality of BuildHeap
bool checkMaxHeap(int (&arr)[N], int i, int nodes) {
	if (2 * i + 1 > nodes) {
		if (2 * i > nodes) {return true;}
		else {
			if (arr[i] < arr[2 * i]) { return false; }
			else { return true; }
		}
	}
	else {
		int maxindx = maxIndex(arr, 2 * i, 2 * i + 1);
		if (arr[i] < arr[maxindx]) {return false;}
		else { return (checkMaxHeap(arr, 2 * i, nodes) && checkMaxHeap(arr, 2 * i + 1, nodes)); }
	}
}





//Recursive function to percolate down from node i
//percolate assumes left and right subtrees of node i
//are themselves heaps
void PercDown(int (&arr)[N], int i, int nodes) {
	if (2*i + 1 > nodes) {
		//LEAF NODE --> PercDown Traversal complete
		if (2*i > nodes) {return;}
		//Left child, no right child
		else {
			if (arr[i] < arr[2 * i]) {
				Swap(arr, i, 2 * i);
				return PercDown(arr, 2 * i, nodes);
			}
			//Max prop achieved --> PercDown Complete
			else {return;}
		}
	}
	else {
		int maxindx = maxIndex(arr, 2 * i, 2 * i + 1);
		if (arr[i] < arr[maxindx]) {
			Swap(arr, i, maxindx);
			return PercDown(arr, maxindx, nodes);
		}
		//Max prop achieved --> PercDown complete
		else {return;}
	}
}


//calls percolare on all interior nodes of the arbitrary array
//OUTPUT: a Heap 
void BuildHeap(int (&arr)[N]) {
	int nodes = arr[0];
	for (int p = floor(nodes / 2);p >= 1;p--) {
		PercDown(arr, p, nodes);
	}
	return;
}





//INPUT: an arbitary array with the first position the number of nodes
//OUTPUT: a sorted array
void HeapSort(int (&arr)[N]) {
	int nodes = arr[0];
	if ((nodes == 0) || (nodes == 1)) { return; }
	BuildHeap(arr);
	while (nodes >= 1) {
		Swap(arr, 1, nodes);
		arr[0] = nodes - 1;
		nodes = arr[0];
		PercDown(arr, 1, nodes);
	}
	return;
}



int main() {;
	int A[N];
	int nodes = N ;
	A[0] = nodes;
	
	cout << "Constructing array of size " << N << endl;
	fillArray(A);
	printArray(A);

	cout << "Heap constructed" << endl;
	BuildHeap(A);
	printArray(A);

	cout << "Sort complete." << endl;
	HeapSort(A);
	printArray(A);


	system("pause");
	return 0;
}