#include <iostream>
#include <string>
#include <list>
#include <vector>
#include <cmath>
#include <math.h>
#include <vector>
#include <iomanip>
#include <fstream>
using namespace std;


class OneStopFibonacciShop {
private:
	vector<double> myVec;
	double myArray[20];
	list<double> myList;

public:
	OneStopFibonacciShop() {
		calcFib();
	}

	void addAll(int loc, double number) {
		OneStopFibonacciShop::myVec.push_back(number);
		OneStopFibonacciShop::myArray[loc] = number;
		OneStopFibonacciShop::myList.push_back(number);
	}

	void calcFib() {
		double nextTerm, t1 = 0, t2 = 1;
		addAll(0, t1);
		addAll(1, t2);
		for (int i = 2; i < 20; ++i) {
			nextTerm = t1 + t2;
			t1 = t2;
			t2 = nextTerm;
			addAll(i, nextTerm);
		}
	}
	void print() {
		cout << setw(8) << left << "Vector:";
		for (int i = 0; i < 20; i++) {
			cout << myVec[i] << ",";
		}
		cout << endl;


		cout << setw(8) << left << "Array:";
		for (int i = 0; i < 20; i++) {
			cout << myArray[i] << ",";
		}
		cout << endl;

		cout << setw(8) << left << "List:  ";
		for (auto v : myList)
			cout << v << ",";
		cout << endl;
	}
};


class PrinceOfPointers {
private:
	unsigned long long int myArray[20];
	unsigned long long int *pointer;
public:
	PrinceOfPointers() {
		myArray[0] = 1;
		for (int i = 1; i < 20; i++) {
			myArray[i] = i*myArray[i - 1];
		}
	}
	void print() {
		pointer = myArray;
		for (int i = 0; i < 20; i++) {
			cout <<setw(8) <<left<<"Address: " << pointer << setw(8)<< right<<"  Value:"<< *(pointer) << endl;
			pointer++;
		}
	}


};



/* prints out name, assignment number, and date*/
void name_function() {
	cout << "Harrison Jansma" << endl;
	cout << "Program #4" << endl;
	cout << "10/26/2018" << endl;
	cout << "==============" << endl;
	return;
}

/*
Displays a menu function to select program to run.
*/
void menu_function() {
	vector <int> vec = {};
	vector <double> stats;
	bool Nexit = true;
	int input = 0;
	while (Nexit) {
		cout << endl;
		cout << "1. Test Containers" << endl;
		cout << "2. Test Pointers" << endl;
		cout << "3. Quit" << endl;
		cout << "--------------" << endl;
		cin >> input;
		if (input == 1) {
			cout << endl << endl;
			OneStopFibonacciShop osf;
			osf.print();
			cout << endl << endl;
		}
		else if (input == 2) {
			cout << endl << endl;
			PrinceOfPointers pop;
			pop.print();
			cout << endl << endl;
		}
		else if (input == 3) {
			Nexit = false;
		}
		else {
			cout << "Invalid Input. Choose from numbers 1, 2, or 3. " << endl << endl;
		}
}
return;
}



int main(int argument_count, char ** argument_vector) {
	name_function();
	menu_function();
	return 0;
}
