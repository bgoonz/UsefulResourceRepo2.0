#include <string>
#include <iostream>
#include <cmath>
#include <math.h>
#include <vector>
#include <iomanip>
#include <fstream>
using namespace std;


/* prints out name, assignment number, and date*/
void name_function() {
	cout << "Harrison Jansma" << endl;
	cout << "Program #3" << endl;
	cout << "10/12/2018" << endl;
	cout << "==============" << endl;
	return;
}


/* 
Calculates the total of a vector of ints
Inputs vector of ints
Outputs: double*/
double Total(vector <int> vec) {
	double total = 0;
	int len = vec.size();
	for (int i = 0; i < len; i++) {
		total += vec[i];
	}
	return total;
}


/*
Calculates the average of a vector of ints
Input: vector of Ints
Output: Double
*/
double Average(vector <int> vec) {
	int len = vec.size();
	double average = Total(vec) / len;
	return average;
}


/*
Calculates the variance of a vector of ints
Input: vector of Ints
Output: Double
*/
double Variance(vector <int> vec) {
	if (vec.size() == 0) throw ("Empty vector");
	double average = Average(vec);
	double var = 0;

	int len = vec.size();
	for (int i = 0; i < len; i++) {
		var += pow((average - vec[i]), 2.0);
	}
	var = var / len;
	return var;

}

/*
Calculates the standard deviation of a vector of ints
Input: vector of Ints
Output: Double
*/
double std_dev(vector <int> vec) {
	if (vec.size() == 0) throw ("Empty vector");
	double res = Variance(vec);
	res = sqrt(res);
	return res;
}



/*
Loads all data from a specified file into a vector of ints
Inputs: user prompted string
Output: vector of ints
*/
vector <int> load_from_file() {
	cout << "File Name?" << endl;
	string fileName;
	cin >> fileName;
	ifstream inFile;
	inFile.open(fileName);
	if (inFile.is_open()) {
		vector <int> vec;
		int temp = 0;
		char i;
		int num = 0;
		for (int j = 0;j < 100001;j++) {
			inFile >> i;
			if (i == ',') {
				vec.push_back(temp);
				temp = 0;
				continue;
			}
			else {
				if (i == '1')num = 1;
				if (i == '2')num = 2;
				if (i == '3')num = 3;
				if (i == '4')num = 4;
				if (i == '5')num = 5;
				if (i == '6')num = 6;
				if (i == '7')num = 7;
				if (i == '8')num = 8;
				if (i == '9')num = 9;
				if (i == '0')num = 0;
				temp = (temp * 10) + num;
			}
		}
		inFile.close();
		return vec;
	}
	else {
		throw ("Could not open File");
	}

}


/*
Calculates statistics of numbers read in from file
Input: vector of ints
Output: vector of doubles
*/
vector <double> calculate_statistics(vector <int> vec) {
	vector <double> res;
	res.push_back(Total(vec));
	res.push_back(Average(vec));
	res.push_back(Variance(vec));
	res.push_back(std_dev(vec));
	return res;
}



/*
Write statistics to output file
input: Vector of doubles
Output: None
*/
void write_to_file(vector <double> data) {
	cout << "file name?" << endl;
	string fileName;
	cin >> fileName;
	ofstream outFile;
	outFile.open(fileName);
	if (outFile.is_open()) {
		outFile << "Harrison Jansma" << endl;
		outFile << "Total   : " << fixed << setprecision(2) << data[0] << endl;
		outFile << "Average : " << fixed << setprecision(2) << data[1] << endl;
		outFile << "Variance: " << fixed << setprecision(2) << data[2] << endl;
		outFile << "StDev   : " << fixed << setprecision(2) << data[3] << endl;
		outFile.close();
	}
	else {
		throw ("error opening outFile");
	}
}


class Counter
{
public:
	Counter() {
		for (int i = 0; i < 13; i++) counts.push_back(0);
	};
	void Increment(int index) {
		counts[index] += 1;
	};
	void ShowCount() {
		for (int i = 0;i < counts.size(); i++) {
			if (i == 0) continue;
			if (i == 1) continue;
			cout <<setw(3) << i << "|  " << counts[i] << endl;
		}
		return;
	}
	int Normalize(int index) {
		int result = (int)counts[index] / 1000;
		return result;
	}
private:
	vector <int> counts = {};
};


/*
Creates a counter object and performs a value count on a vector of integers
Input: vector of ints
Output: Count Object
*/
Counter perform_counts(vector <int> vec) {
	Counter count;
	for (int i = 0; i < vec.size(); i+=1) {
		count.Increment(vec[i]);
	}
	count.ShowCount();
	return count;
}


/*
Displays a bargraph to screen based on truncated count data
Input: COunter object
Output: None
*/
void showBargraph(Counter myCounter) {
	int rowmax = 20;
	for (int i = 2;i <= 12;i++)
	{
		cout <<setw(3) << i;
		cout << " | ";
		rowmax = myCounter.Normalize(i);
		for (int j = 0;j<rowmax;j++)
		{
			cout << "X";
		}
		cout << endl;
	}
	return;
}


/*
Displays a menu function to select program to run.
*/
void menu_function() {
	vector <int> vec = {};
	vector <double> stats;
	Counter counts;
	bool Nexit = true;
	int input = 0;
	while (Nexit) {
		cout << endl;
		cout << "1. Load From a File" << endl;
		cout << "2. Calculate Statistics" << endl;
		cout << "3. Write to File" << endl;
		cout << "4. Perform Count" << endl;
		cout << "5. Display Bargraph" << endl;
		cout << "6. Quit" << endl;
		cout << "--------------" << endl;
		cin >> input;
		switch (input) {
		case 1:vec = load_from_file();
			break;
		case 2:stats = calculate_statistics(vec);
			break;
		case 3:write_to_file(stats);
			break;
		case 4: counts = perform_counts(vec);
			break;
		case 5: showBargraph(counts);
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