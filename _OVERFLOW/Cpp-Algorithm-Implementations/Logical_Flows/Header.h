#pragma once
#include <string>
#include <iostream>
#include <iomanip>
using namespace std;

class MobilePhone {
protected:
	string TelephoneNumber;
	string RingTone;
public:
	MobilePhone();
	void setter(string num, string ring);
	void ShowNumber();
	virtual void Ring() { cout << "boop" << endl; };
};

class GogglePhone : public MobilePhone {
public:
	GogglePhone(string number);
	void Ring();
};

class DoorsPhone : public MobilePhone {
public:
	DoorsPhone(string number);
	void Ring();
};

class RobotPhone : public MobilePhone {
public:
	RobotPhone(string number);
	void Ring();
};

void name_function();

void menu_function();


