#include <string>
#include <iostream>
#include <cmath>
#include <math.h>
#include <fstream>
#include <vector>
using namespace std;



void name_function() {
	cout << "Harrison Jansma" << endl;
	cout << "Program #3" << endl;
	cout << "10/12/2018" << endl;
	cout << "==============" << endl;
	return;
}


void load_from_file() {
	string file_name;
	cout << "File Name?";
	cin >> file_name;
	ifstream myfile;

	myfile.open(file_name);

	vector <int> myVector = {};
	char dummy;
	for (int i = 0; i < lines; ++i) {
		for (int i = 0; i < col; ++i) {
			cin >> x;
			myValues.push_back(x);
			// So the dummy won't eat digits
			if (i < (col - 1))
				cin >> dummy;
		}
	}

	}






vector <double> input_vector() {
	vector <double> vec = {};
	string words;
	double temp;
	bool keepon = true;
	cout << "Please enter one or more floating point numbers when finished, enter 'q'" << endl;
	while (keepon) {
		cin >> words;
		if (words == "q") {
			keepon = false;
		}
		else {
			temp = stod(words);
			vec.push_back(temp);
		}
	}
	return vec;
}




void show_vector(vector <double> vec) {
	int len = vec.size();
	for (int i = 0; i < len; i++) {
		cout << vec[i] << endl;
	}
	return;
}



void find_min(vector <double> vec) {
	double min = 10000;
	int len = vec.size();
	for (int i = 0; i < len; i++) {
		if (vec[i] < min) {
			min = vec[i];
		}
	}
	cout << "The minimum is " << min <<endl;
}

void find_max(vector<double> vec) {
	double max = -10000;
	int len = vec.size();
	for (int i = 0; i < len; i++) {
		if (vec[i] > max) {
			max = vec[i];
		}
	}
	cout << "The maximum is " << max << endl;
}


double Total(vector <double> vec) {
	double total = 0;
	int len = vec.size();

	for (int i = 0; i < len; i++) {
		total += vec[i];
	}
	cout << "The total is " << total << endl;
	return total;
}


double Average(vector <double> vec) {
	int len = vec.size();
	double average = Total(vec)/len;
	cout << "The average is " << average << endl;
	return average;
}

double Variance(vector <double> vec) {
	double average = Average(vec);
	double var=0;

	int len = vec.size();
	for (int i = 0; i < len; i++) {
		var += pow((average - vec[i]), 2.0);
	}
	var = var / len;
	cout << "The Variance is " << var << endl;
	return var;

}

double std_dev(vector <double> vec) {
	double res = Variance(vec);
	res = sqrt(res);
	cout << "The standard deviation is " << res << endl;
	return res;
}


void menu_function() {
	vector <double> vec = {};

	bool Nexit = true;
	int input = 0;
	while (Nexit) {
		cout << endl;
		cout << "1. Load From a File" << endl;
		cout << "2. Calculate the Statistics" << endl;
		cout << "3. Write to a File" << endl;
		cout << "4. Perform the Count" << endl;
		cout << "5. Display the Bargraph" << endl;
		cout << "6. Quit" << endl;
		cout << "--------------" << endl;
		cin >> input;
		switch (input) {
			case 1 :vec = input_vector();
				break;
			case 2:show_vector(vec);
				break;
			case 3:find_min(vec);
				break;
			case 4:find_max(vec);
				break;
			case 5: Total(vec);
				break;
			case 6:Nexit = false;
				break;
		}
	}
	return;
}

int main(int argument_count, char ** argument_vector) {
	name_function();
	menu_function();
	return 0;
}