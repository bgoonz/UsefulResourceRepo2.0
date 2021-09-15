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

// Time: O(Log n)
// Space: O(1)

int main()
{
	int n = 81, m = 27;
	if (n%m ==0) return m;
	if (n < m) swap(n, m);
	while (m > 0) {
		n = n%m;
		swap(n, m);
	}
	cout << n;
	return n;
}
