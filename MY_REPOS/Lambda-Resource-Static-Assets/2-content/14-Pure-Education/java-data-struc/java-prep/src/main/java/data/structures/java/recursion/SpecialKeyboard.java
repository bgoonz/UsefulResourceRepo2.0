package data.structures.java.recursion;

public class SpecialKeyboard
{
  /*
  You have a special keyboard with the following keys:
    Key 1:  Prints 'A' on screen
    Key 2: (Ctrl-A): Select screen
    Key 3: (Ctrl-C): Copy selection to buffer
    Key 4: (Ctrl-V): Print buffer on screen appending it after what has already been printed.
  If you can only press the keyboard for N times (with the above four keys),
  write a program to produce maximum numbers of A's.

  Consider various values of N
  N   Output
  ==========
  1   A
  2   AA
  3   AAA
  4   AAAA
  5   AAAAA
  6   AAAAAA
  7   AAAAAAAAA
   */

  public static int findOptimal(int n)
  {
    if(n < 7)
    {
      return n;
    }

    int max = 0;
    for(int i = n - 3; i >= 1; i--)
    {
      int cur = (n - i - 1) * findOptimal(i);
      max = Math.max(max, cur);
    }

    return max;
  }
}
