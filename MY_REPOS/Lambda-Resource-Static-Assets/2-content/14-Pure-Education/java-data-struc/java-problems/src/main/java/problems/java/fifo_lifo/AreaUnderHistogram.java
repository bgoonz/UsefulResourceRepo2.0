package problems.java.fifo_lifo;

import java.util.Stack;

public class AreaUnderHistogram
{
   /*
             _
   6       _| |
   5      | | |        |        _
   4      | | |  _     |      _| |
   3     _| | |_| |_   |    _| | |
   2   _| | | | | | |  |   | | | |
   1  | | | | | | | |  |   | | | |
    ----------------------------------------

   Note: use 1 inside first while loop and i inside seoond while loop
   */

    public static int maxAreaUnderHistogram(int[] heights)
    {
        Stack<Integer> stack = new Stack<>();
        int max = 0, i = 0, zeroCount = 0;

        while(i < heights.length)
        {
            if(heights[i] > 0)
            {
                if (stack.empty() || heights[i] > heights[stack.peek()])
                {
                    stack.push(i++);
                }
                else
                {
                    int h = heights[stack.pop()];
                    int w = stack.empty() ? 1 : i - stack.peek() - 1;
                    max = Math.max(max, w * h);
                }
            }
            else
            {
                zeroCount++;
                i++;
            }
        }

        i -= zeroCount;

        while(!stack.empty())
        {
            int h = heights[stack.pop()];
            int w = stack.empty() ? i : i - stack.peek() - 1;
            max = Math.max(max, w * h);
        }

        return max;
    }

    static boolean testsPass()
    {
        boolean check = maxAreaUnderHistogram(new int[] {2, 3, 4}) == 6;
        if(!check)
        {
            return false;
        }

        check = maxAreaUnderHistogram(new int[] {1, 2, 5, 6, 2, 3, 2}) == 12;
        if(!check)
        {
            return false;
        }

        check = maxAreaUnderHistogram(new int[] {2, 3, 3, 2}) == 8;
        if(!check)
        {
            return false;
        }

        check = maxAreaUnderHistogram(new int[] {3, 4}) == 6;
        if(!check)
        {
            return false;
        }

        int x = maxAreaUnderHistogram(new int[] {3, 4, 0, 0});
        check = maxAreaUnderHistogram(new int[] {3, 4, 0, 0}) == 6;
        if(!check)
        {
            return false;
        }

        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
