#include "Header.h"
#include <vector>

using namespace std;


MobilePhone::MobilePhone() :  TelephoneNumber("000-000-0000"){
	RingTone = "Ring";
}

void MobilePhone::setter(string num, string ring) {
	TelephoneNumber = num;
	RingTone = ring;
}

void MobilePhone::ShowNumber() {
	cout << TelephoneNumber << endl;
}






DoorsPhone::DoorsPhone(string num) {
	setter(num, "brt!");
}

void DoorsPhone::Ring() {
	cout << TelephoneNumber << ": " << RingTone << endl;
}



GogglePhone::GogglePhone(string num) {
	setter(num, "Beep!");
}

void GogglePhone::Ring() {
	cout << TelephoneNumber << ": " << RingTone << endl;
}



RobotPhone::RobotPhone(string num) {
	setter(num, "Go! Go! Ro! Bot! Phone!");
}

void RobotPhone::Ring() {
	cout << TelephoneNumber << ": " << RingTone << endl;
}









/* prints out name, assignment number, and date*/
void name_function() {
	cout << "Harrison Jansma" << endl;
	cout << "Program #5" << endl;
	cout << "11/16/2018" << endl;
	cout << "==============" << endl;
	return;
}

/*
Displays a menu function to select program to run.
*/
void menu_function() {
	vector<MobilePhone *> v;
	bool Nexit = true;
	int input = 0;
	while (Nexit) {
		cout << endl;
		cout << "1. Load the container." << endl;
		cout << "2. Traverse" << endl;
		cout << "3. Quit" << endl;
		cout << "--------------" << endl;
		cin >> input;
		if (input == 1) {
			cout << endl;
			string num = "210-251-150";
			for (int i = 0; i < 37; i++) {
				if (i>9)
					num = num.substr(0,10);
				if (i % 3 == 0)
					 v.push_back(new GogglePhone(num + to_string(i)));
				if (i % 3 == 1)
					v.push_back(new DoorsPhone(num + to_string(i)));
				if (i % 3 == 2)
					v.push_back(new RobotPhone(num + to_string(i)));
			}
			cout << endl;
		}
		else if (input == 2) {
			cout << endl;
			for (int i = 0; i < 37; i++) {
				v[i]->Ring();
			}
			cout << endl;
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

