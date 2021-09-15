//***CHECK IF INPUT IS A PERFECT NUMBER***//

#include<iostream>

using namespace std;

int main()
{
  int num;
  cout << "Enter an integer: ";
  cin >> num;

  int i = 1, u = 1, sum = 0;
  while (i <= num)
  {
    while (u <= num)
    {
      if (u < i)
      {
        if (i % u == 0)
        sum = sum + u;
      }
      u++;
    }
    if (sum==i)
      if (num==sum)
      {
        cout << num << " is a perfect number.";
      }
      else
      {
        cout << num << " is not a perfect number.";
      }
    i++;
    u = 1;
    sum = 0;
  }
}
