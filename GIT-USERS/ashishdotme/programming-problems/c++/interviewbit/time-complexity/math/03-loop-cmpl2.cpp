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

// Time: O(nLog n)
// Space: O(1)

int main()
{
	int i, j, k = 0, n = 5;

	// n is added to k log n times as inner loop runs for log n times
	// So time complexity is inner multiplied by outer loop complexity i.e O(nlogn)
	for (i  = n/2; i <= n; i++) {   // O(n/2)
		for (j = 2; j <= n; j = j * 2) { //O(log n)
			k = k + n/2;
			cout << "i = " << i << " j = " <<j;
			cout << "\n";
		}
	}
	return 0;
}
