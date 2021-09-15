// the following is a greedy algorithm that assumes the large bill will always be
// larger than $20

#include <iostream>
#include <math.h>
using namespace std;

int main() {
	float tobepaid,
		amountdue,
		largebill;

	int transition,
		numerals,
		decimals,
		twenties,
		tens,
		fives,
		ones,
		quarters,
		dimes,
		nickles,
		pennies;

	

	//read in the amount to be paid and the large bill given by customer
	cout << "Total to be paid?" << endl;
	cin >> tobepaid;
	cout << "Bill Received?" << endl;
	cin >> largebill;

	//Calculate total amount due to customer
	amountdue = largebill - tobepaid;

	//print out change due
	cout << endl << "Total change due: " << amountdue << endl;


	

	//convert the double to two integers so we can do remainder calculation
	transition = amountdue * 100;
	decimals = transition % 100;
	numerals = (transition - decimals)/100;


	// subtract the remainder to ensure the assignment is a true integer
	twenties = (numerals - numerals % 20) / 20;

	//reassign the remaining money to amountdue variable
	numerals = numerals - (twenties * 20);

	//assign for tens
	tens = (numerals - numerals % 10) / 10;

	//reassign totaldue after tens are given
	numerals = numerals - (tens * 10);

	//assign for fives
	fives = (numerals - numerals % 5) / 5;

	//reassign amountdue
	numerals = numerals - (fives * 5);

	//assign ones
	ones = (numerals - numerals % 1) / 1;


	//assign quarters
	quarters = (decimals - decimals % 25) / 25;

	//reassign amountdue
	decimals = decimals - (quarters * 25);
	


	//assign dimes
	dimes = (decimals - decimals % 10) / 10;

	//reassign amountdue
	decimals = decimals - (dimes * 10);
	

	//assign nickles
	nickles = (decimals - decimals % 5) / 5;

	//reassign amountdue
	decimals = decimals - (nickles * 5);
	


	//assign pennies for some reason it always came up one less than needed. (hence the add one)
	pennies = decimals / 1;
	decimals = decimals - pennies;



	//output statements
	cout << "Twenties: " << twenties << endl;
	cout << "Tens: " << tens << endl;
	cout << "Fives: " << fives << endl;
	cout << "Ones: " << ones << endl;
	cout << "Quarters: " << quarters << endl;
	cout << "Dimes: " << dimes << endl;
	cout << "Nickles: " << nickles << endl;
	cout << "Pennies: " << pennies << endl;
	system("pause");
	return 0;
	//program doesnt work for $14.47

}