#include <vector>

using namespace std;

void swap(vector<int> &T, int a, int b) {
	int temp = T[a];
	T[a] = T[b];
	T[b] = temp;
}

void quickSort(vector<int> &T, int begin, int end) {
	int left = begin - 1;
	int right = end + 1;
	int pivot = T[begin]
	
	// If T is empty => nothing to do
	if (begin >= end) return;

	/*
		Else we go left to right and right to left
		If an element is at a wrong place => swap 
		If left is higher than right => STOP
	*/
	while(1) {
		do right--; while(T[right] > pivot);
		do left++; while(T[left] < pivot);

		if(left < right) {
			swap(T, left, right);
		}
		
		else break;
	}

	// Reorder the two tabs
	quickSort(T, left, right);
	quickSort(T, right + 1, end);
}
