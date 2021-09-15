package data.structures.java.stacksqueues;

public class ThreeStackArray
{
  private int [] buffer;
  private int stackSize;
  private int[] stackPtr = {-1, -1, -1};

  public ThreeStackArray(int stackSize)
  {
    buffer = new int[3 * stackSize];
    this.stackSize = stackSize;
  }

  public void push(int stackNum, int val) throws Exception
  {
    if(stackPtr[stackNum] + 1 == stackSize)
    {
      throw new Exception("Out of space");
    }
    stackPtr[stackNum]++;
    buffer[topOfStack(stackNum)] = val;
  }

  public int pop(int stackNum) throws Exception
  {
    if(stackPtr[stackNum] == -1)
    {
      throw new Exception("Empty stack");
    }
    int val = buffer[topOfStack(stackNum)];
    stackPtr[stackNum]--;
    return val;
  }

  public boolean empty(int stackNum)
  {
    return stackPtr[stackNum] == -1;
  }

  public int peek(int stackNum)
  {
    return buffer[topOfStack(stackNum)];
  }

  private int topOfStack(int stackNum)
  {
    return stackNum * stackSize + stackPtr[stackNum];
  }
}
