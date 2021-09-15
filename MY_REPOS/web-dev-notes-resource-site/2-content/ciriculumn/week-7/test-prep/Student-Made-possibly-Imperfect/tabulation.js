function fib( n ) {
	//! memoization is usually recursive whereas tabulation is often iterative/
	//! Tabulation
	let table = new Array( n + 1 ); //! this line is in most tabulation problems... the argument is the length of the new array
	//* and array is stored in concurrent memory locations so
	//table[0]=0;
	table[ 1 ] = 1; //fib(0)=0
	table[ 2 ] = 1; //fib(1)=1
	for ( let i = 2; i <= n; i++ ) { // one loop that goes through entire input so time complexity is O(n)
		//table[2]=table[0]+table[1];
		table[ i ] = table[ i - 1 ] + table[ i - 2 ];
		/* 				
		if(n===1 || n===2)return 1;
		return fib(n-1)+fib(n-2)l;
		*/
	}

	return table[ n ]; //fib(n)

}
//
