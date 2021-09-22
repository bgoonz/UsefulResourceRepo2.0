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

// Time: O(n^2)
// Space: O(1)

int main()
{
	int a = 0, b = 0, N = 10, M = 10;   
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
				a = a + j; // O(n^2)
		}
	}
	for (int k = 0; k < N; k++) {
		b = b + k; 	// O(N)
	} 
	return 0;
}
