#include <iostream>

using namespace std;

int main()
{
    /*
    int x = 100;


    if (x == 100)
{
   cout << "x is ";
   cout << x;
// this code is equivalent to :    if (x == 100) { cout << "x is "; cout << x; }

}
*/
//Selection statements with if can also specify what happens when the condition is not fulfilled,
// by using the else keyword to introduce an alternative statement. Its syntax is:
//if (condition) statement1 else statement2
//where statement1 is executed in case condition is true, and in case it is not, statement2 is executed.


/*
int x;
    cout<<"what is the value of x?"<<endl;
    cin>> x;


    if (x > 0)
        cout << "x is positive";
    else if (x < 0)
        cout << "x is negative";
    else
        cout << "x is 0";
*/


/*
The simplest kind of loop is the while-loop. Its syntax is:

while (expression) statement

The while-loop simply repeats statement while expression is true.
If, after any execution of statement, expression is no longer true, the loop ends, and the program continues right after the loop.
For example, let's have a look at a countdown using a while-loop:

*/


/*

int n = 10;

  while (n>0) {
    cout << n << ", ";
    --n;
  }

  cout << "liftoff!\n";

 */




/*
The first statement in main sets n to a value of 10.
This is the first number in the countdown.
Then the while-loop begins: if this value fulfills the condition n>0 (that n is greater than zero),
then the block that follows the condition is executed, and repeated for as long as the condition (n>0) remains being true.

The whole process of the previous program can be interpreted according to the following script (beginning in main):

1.  n is assigned a value
2.  The while condition is checked (n>0). At this point there are two possibilities:
        condition is true: the statement is executed (to step 3)
        condition is false: ignore statement and continue after it (to step 5)

3.  Execute statement:
        cout << n << ", ";
        --n;
            //(prints the value of n and decreases n by 1)
4.  End of block. Return automatically to step 2.
5.  Continue the program right after the block:
    print liftoff! and end the program.

A thing to consider with while-loops is that the loop should end at some point,
and thus the statement shall alter values checked in the condition in some way, so as to force it to become false at some point.
Otherwise, the loop will continue looping forever.
In this case, the loop includes --n, that decreases the value of the variable that is being evaluated in the condition (n) by one - this will eventually make the condition (n>0) false after a certain number of loop iterations.
To be more specific, after 10 iterations, n becomes 0, making the condition no longer true, and ending the while-loop.

Note that the complexity of this loop is trivial for a computer.
So the whole countdown is performed instantly, without any practical delay between elements of the count.
*/


//A very similar loop is the do-while loop, whose syntax is:
//do statement while (condition);


/*


It behaves like a while-loop, except that condition is evaluated after the execution of statement instead of before;
guaranteeing at least one execution of statement, even if condition is never fulfilled.

For example,
Create a program that echoes any text the user introduces until the user enters goodbye:
*/



/*

 string str;
  do {
    cout << "Enter text: ";
    getline (cin,str);
    cout << "You entered: " << str << '\n';
  } while (str != "goodbye");
*/






/*
when the statement needs to be executed at least once,
such as when the condition that is checked to end of the loop is determined within the loop statement itself.
In while-loop example:
the user input within the block is what will determine if the loop ends.
even if the user wants to end the loop as soon as possible by entering goodbye,
the block in the loop needs to be executed at least once to prompt for input,
and the condition can, in fact, only be determined after it is executed.

*/

/*
The for loop is designed to iterate a number of times. Its syntax is:

for (initialization; condition; increase) statement;

Like the while-loop, this loop repeats statement while condition is true.
But, in addition, the for loop provides specific locations to contain an initialization and an increase expression,
executed before the loop begins the first time, and after each iteration, respectively.
Therefore, it is especially useful to use counter (increment or decrement?) variables as condition.

1.  initialization is executed.
        Generally, this declares a counter variable, and sets it to some initial value.
        This is executed a single time, at the beginning of the loop.
2.  condition is checked.
        If it is true, the loop continues;
        otherwise, the loop ends, and statement is skipped,
        going directly to step 5.
3.  statement is executed.
        As usual, it can be either a single statement or a block enclosed in curly braces { }.
4.  increase is executed,
        and the loop gets back to step 2.
5.  the loop ends:
        execution continues by the next statement after it.

*/




/*
for (int n=10; n>0; n--) {
    cout << n << ", ";
  }
  cout << "liftoff!\n";

 */



 /*
 The three fields in a for-loop are optional.
They can be left empty,
 but in all cases the semicolon signs between them are required.

For example, for (;n<10;)
is a loop without initialization or increase (equivalent to a while-loop);

for (;n<10;++n)
is a loop with increase,
but no initialization
(the variable was already initialized before the loop).

A loop with no condition is equivalent to a loop with true as condition
(i.e., an infinite loop).

 */

 /*
 Switch Statement:

 purpose is to check for a value among a number of possible constant expressions.
It is something similar to concatenating (adding) if-else statements,
but (is limited to constant expressions.)

Syntax:

switch (expression)
{
  case constant1:
     group-of-statements-1;
     break;
  case constant2:
     group-of-statements-2;
     break;
  .
  .
  .
  default:
     default-group-of-statements
}

How it works:
switch evaluates expression and checks if it is equivalent to constant1;
if it is, it executes group-of-statements-1 until it finds the break statement.
When it finds this break statement, the program jumps to the end of the entire switch statement
(the closing brace).

If expression was not equal to constant1,
it is then checked against constant2.
If it is equal to this, it executes group-of-statements-2 until a break is found,
when it jumps to the end of the switch.

if the value of expression did not match any of the previously specified constants,
the program executes the statements included after the default:
 label, if it exists (bc optional).
 */


 /*
 int x;
cout<<"what is x?";
cin>>x;

 switch (x) {
  case 1:
    cout << "x is 1";
    break;
  case 2:
    cout << "x is 2";
    break;
  default:
    cout << "value of x unknown";
  }


 */

//Challenge: create equivalent if-else program!

//Challenge accepted!
int x;
cout<<"what is x?";
cin>>x;

    if (x == 1) {
      cout << "x is 1";
    }
    else if (x == 2) {
      cout << "x is 2";
    }
    else {
      cout << "value of x unknown";
    }


//Eureka!







    return 0;
}
