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

// Time: O(n+m)
// Space: O(1)

int main()
{
	int a = 0, b = 0, N = 10, M = 10;   
	
	// Space complexity is the extra space used by the algorithm
	// In Recursion we create stack so space complexity is O(n)
	// But in for loop space complexity is O(1) as space doesn't depend of input size

	for (int i = 0; i < N; i++) {
			a = a + rand();  // O(n)
	}
	for (int j = 0; j < M; j++) {
			b = b + rand();	// O(m)
	}
	return 0;
}
