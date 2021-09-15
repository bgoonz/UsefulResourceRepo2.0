package data.structures.java.stacksqueues;

import java.util.Stack;

public class AreaUnderHistogram
{
  //  The stack only keeps indexes of increasing bars.
  //  [2, 1, 5, 6, 2, 3]
  private int[] heights;

  public AreaUnderHistogram(int[] heights)
  {
    this.heights = heights;
  }

  public int compute()
  {
    if(heights == null || heights.length == 0)
    {
      return 0;
    }

    Stack<Integer> stack = new Stack<>();

    int max = 0, i = 0;

    while(i < heights.length)
    {
      // Push current index on stack if greater than height of prior index
      if(stack.empty() || heights[i] >= heights[stack.peek()])
      {
        stack.push(i++);
      }
      else
      {
        // compute current area
        int h = heights[stack.pop()];
        int w = stack.empty() ? i : i - stack.peek() - 1;
        max = Math.max(max, h * w);
      }
    }

    while(!stack.empty())
    {
      int h = heights[stack.pop()];
      int w = stack.empty() ? i : i - stack.peek() - 1;
      max = Math.max(max, h * w);
    }

    return max;
  }
}
