package data.structures.java.stacksqueues;

import java.util.Stack;

public class QueueUsingTwoStacks<T>
{
  private Stack<T> s1 = new Stack<>();
  private Stack<T> s2 = new Stack<>();

  public int size()
  {
    return s1.size() + s2.size();
  }

  public void add(T val)
  {
    s1.push(val);
  }

  public T remove()
  {
    if(!s2.empty())
    {
      return s2.pop();
    }

    while(!s1.empty())
    {
      s2.push(s1.pop());
    }
    return s2.pop();
  }
}
