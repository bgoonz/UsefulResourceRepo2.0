package data.structures.java.recursion;

import java.util.Stack;

public class ReverseStack
{
  public static void reverseStack(Stack<Integer> s)
  {
    if(!s.empty())
    {
      int val = s.pop();
      reverseStack(s);
      insertAtBottom(s, val);
    }
  }

  private static void insertAtBottom(Stack<Integer> s, int val)
  {
    if(s.empty())
    {
      s.push(val);
    }
    else
    {
      int tmp = s.pop();
      insertAtBottom(s, val);
      s.push(tmp);
    }
  }
}
