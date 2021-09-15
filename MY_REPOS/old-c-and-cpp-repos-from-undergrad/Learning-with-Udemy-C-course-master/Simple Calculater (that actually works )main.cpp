#include <iostream>

using namespace std;

int main()
{
int choice;
    double number_1, number_2;
    // just remembered you can declare two variables at the same time lol!
    cout << "1.) Addition" <<endl;
    cout << "2.) Subtraction" <<endl;
    cout << "3.) Multiplication" <<endl;
    cout << "4.) Devision" <<endl;
    cout << endl << endl << "pick an operation";
    cin >> choice;

// when asked to pick an operation enter a number (bc choice is int not string)

    switch (choice){
    case 1:
        {
                cout << "enter number 1:";
                cin >> number_1;
                cout << "enter number 2:" << endl;
                cin >> number_2;
                cout << endl << endl << "enter number 2 :";
                cout << endl << endl << endl;
                cout << "Result =" << number_1 + number_2;
                break;

        }
    case 2:
        {
                 cout << "enter number 1:";
                cin >> number_1;
                cout << "enter number 2:" << endl;
                cin >> number_2;
                cout << endl << endl << "enter number 2 :";
                cout << endl << endl << endl;
                cout << "Result =" << number_1 - number_2;
                break;

        }
    case 3:
        {
                  cout << "enter number 1:";
                cin >> number_1;
                cout << "enter number 2:" << endl;
                cin >> number_2;
                cout << endl << endl << "enter number 2 :";
                cout << endl << endl << endl;
                cout << "Result =" << number_1 * number_2;
                break;

        }
    case 4:
        {
                   cout << "enter number 1:";
                cin >> number_1;
                cout << "enter number 2:" << endl;
                cin >> number_2;
                cout << endl << endl << "enter number 2 :";
                cout << endl << endl << endl;
                cout << "Result =" << number_1 / number_2;
                break;

        }
    default:
        cout << "That's not a number; Don't be that guy (or Girl)" << endl;




    }








return 0;
}
