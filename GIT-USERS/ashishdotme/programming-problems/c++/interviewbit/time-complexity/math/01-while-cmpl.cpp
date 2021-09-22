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

// Time: O(log N)
// Space: O(1)

int main()
{
	int a = 0;   
	int i = 5;

	// The input size is divided into half in every iteration
	while (i > 0) {
			a += i;
			i /= 2; // O(n)
			cout << i;
	}
	return 0;
}

