//***CALCULATOR***//

#include <iostream>

using namespace std;

int main()
{
  //Declare the variables
  int num1, num2;
  //Char variable operator
  char opr;
    //prompt user to enter integers
    cout << "Enter two integers: ";
  //assign the input variables to num1 and num2
  cin >> num1 >> num2;
    //prompt user to enter an operator
    cout << "Enter operator: ";
  //assign the input variable to opr
  cin >> opr;
  cout << endl;
    cout << num1 << " " << opr << " " << num2 << " = ";
  switch (opr){
    case '+':
      cout << num1 + num2 << endl;
      break;
    case '-':
      cout << num1 - num2 << endl;
      break;
    case '/':
      if (num2 != 0)
        cout << num1 / num2 << endl;
      else
        cout << "Can't divide by zero, sorry!";
      break;
    case '*':
      cout << num1 * num2 << endl;
      break;
    default:
      cout << "Something went wrong!" << endl;
  }
  return 0;
}
