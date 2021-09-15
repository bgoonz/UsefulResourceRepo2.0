package data.structures.java.arrays;

public class Celebrity
{
  //  See stacksqueues package for explanation of this problem

  private int[] data;
  public Celebrity(int[] data)
  {
    this.data = data;
  }

  private boolean knows(int a, int b)
  {
    return a != b && data[b] == 1;
  }

  public int findCelebrity()
  {
    int a = 0, b = data.length - 1;

    while(a < b)
    {
      if(knows(a, b))
      {
        a++;
      }
      else
      {
        b--;
      }
    }

    for(int i = 0; i < data.length; ++i)
    {
      if (i != a &&
          (knows(a, i) || !knows(i, a)))
      {
        return -1;
      }
    }
    return a;
  }

  public static int findCelebrityStacks(int[][] data)
  {
    data.structures.java.stacksqueues.Celebrity c = new data.structures.java.stacksqueues.Celebrity(data);
    return c.findCelebrity();
  }

}
