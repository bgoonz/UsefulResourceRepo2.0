package data.structures.java.stacksqueues;

import java.util.Stack;

public class MinStack extends Stack<Integer>
{
  private Stack<Integer> minStack = new Stack<>();

  @Override
  public Integer push(Integer item)
  {
    if(item < min())
    {
      minStack.push(item);
    }
    return super.push(item);
  }

  @Override
  public synchronized Integer pop()
  {
    Integer val = super.pop();
    if(val == minStack.peek())
    {
      minStack.pop();
    }
    return val;
  }

  public int min()
  {
    if(minStack.empty())
    {
      return Integer.MAX_VALUE;
    }
    return minStack.peek();
  }
}
