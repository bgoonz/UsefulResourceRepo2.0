/**
 * Created by Ashish Patel
 * Copyright © 2017 ashish.me
 * ashishsushilpatel@gmail.com 
 */

/**
 * Problem:
 * Find the time and space complexity of the following program
 */

#include <stdlib.h>  
#include <iostream>
using namespace std;

// Time: O(N)
// Space: O(1)

int main()
{
	int count = 0, N = 6;

	// Outer loop has time complexity of O(log n)
	// Inner loop has time complexity of O(n). As n + n/2 + n/4 ... = O(n)
	for (int i = N; i > 0; i /= 2) {
			for (int j = 0; j < i; j++) {
					count += 1; // O(n) 
					cout << "I = " << i << " Count = " << count;
					cout << "\n";
			}
	}
	return 0;
}
