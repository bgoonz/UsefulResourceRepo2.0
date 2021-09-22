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
	int a = 0, b = 0, N = 5, M = 5;   
	for (int i = 0; i < N; i++) {
		for (int j = N; j > i; j--) { 
			a = a + i + j;		// O(n^2)
			cout << "A = "<< a << " i = " << i << " j = " << j;
			cout << "\n";
		}
  }
	return 0;
}

