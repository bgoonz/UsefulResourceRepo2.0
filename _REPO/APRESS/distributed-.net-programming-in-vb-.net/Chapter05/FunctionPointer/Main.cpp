// C++ code! Don't try this in C#!!

// Some includes for console I/O
#include <iostream>
using namespace std;

// FooBar refers to any function that takes a single int 
// argument and returns an int.
typedef int FooBar(int);

// Foo returns the given int
int Foo(int i) {return i;}

// Bar adds two ints
int Bar(int i, int j) {return i + j;}

// This is our function that requires a pointer to any
// function matching the FooBar signature
int DoIt(FooBar* f, int value) 
{
	return f(value);
}

int main(int argc, char* argv[])
{
	cout << DoIt(Foo, 6) << endl;

   // Use Bar(int,int) by typecasting to FooBar(int)
	cout << DoIt((FooBar*)Bar, 6) << endl;
	
	cin.get();
}
