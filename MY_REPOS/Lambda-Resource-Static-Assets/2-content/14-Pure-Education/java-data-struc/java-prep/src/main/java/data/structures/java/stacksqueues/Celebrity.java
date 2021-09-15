package data.structures.java.stacksqueues;

import java.util.Stack;

public class Celebrity
{
  /*
  In a party of N people, only one person is known to everyone.
  Such a person may be present in the party, if yes, he doesn't know anyone in the party.
  We can only ask questions like "does A know B?". Find the stranger (celebrity) in minimum number of questions.

  1.  If A knows B, then A can’t be celebrity. Discard A, and B may be celebrity.
  2.  If A doesn't know B, then B can’t be celebrity. Discard B, and A may be celebrity.
  3.  Repeat above two steps till we left with only one person.
  Use 2D matrix to represent people at the party:
  //  For example, person at index 2 is a celebrity
  0, 0, 1, 0
  0, 0, 1, 0
  0, 0, 0, 0
  0, 0, 1, 0
   */
  private int[][] data;
  public Celebrity(int[][] data)
  {
    this.data = data;
  }

  private boolean knows(int a, int b)
  {
    return data[a][b] == 1;
  }

  public int findCelebrity()
  {
    Stack<Integer> stack = new Stack<>();

    for(int i = 0; i < data.length; ++i)
    {
      stack.push(i);
    }

    while(stack.size() > 1)
    {
      int a = stack.pop();
      int b = stack.pop();
      if(knows(a,b)) // a can't be a celebrity
      {
        stack.push(b);
      }
      else // b can't be a celebrity
      {
        stack.push(a);
      }
    }

    int lastPerson = stack.pop();
    for(int i = 0; i < data.length; ++i)
    {
      if(i != lastPerson &&
          (knows(lastPerson, i) || !knows(i, lastPerson)))
      {
        return -1;
      }
    }
    return lastPerson;
  }

  public static int findCelebrityArrays(int[] data)
  {
    data.structures.java.arrays.Celebrity c = new data.structures.java.arrays.Celebrity(data);
    return c.findCelebrity();
  }
}
