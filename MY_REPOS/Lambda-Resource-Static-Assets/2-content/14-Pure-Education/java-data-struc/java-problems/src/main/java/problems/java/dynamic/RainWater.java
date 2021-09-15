package problems.java.dynamic;

import java.util.Arrays;

public class RainWater
{
    //  To compute "ALL" water trapped.
    //  heights = 0  1  0  2  1  0  1  3  2  1  2  1
    //            ----------------------------------
    //  left    = 0  1  1  2  2  2  2  3  3  3  3  3  //  height the left side can support
    //  right   = 3  3  3  3  3  3  3  3  2  2  2  1  //  height the right side can support
    //            ----------------------------------
    //  diff    = 0  0  1  0  1  2  1  0  0  1  0  0 = 6  //  min(left, right) - height

    static int trapWater(int[] heights)
    {
        if(heights == null || heights.length == 0)
        {
            return 0;
        }

        int len = heights.length;
        int [] left = new int[len], right = new int[len];

        left[0] = heights[0];
        for(int i = 1; i < len; ++i)
        {
            left[i] = Math.max(left[i - 1], heights[i]);
        }

        right[len - 1] = heights[len - 1];
        for(int i = heights.length - 2;  i >= 0; --i)
        {
            right[i] = Math.max(right[i + 1], heights[i]);
        }

        int [] result = new int[len];
        Arrays.setAll(result, i -> Math.min(left[i], right[i]) - heights[i]);
        return Arrays.stream(result).sum();
    }

    static boolean testsPass()
    {
        boolean check = trapWater(new int[] {0,  1,  0,  2,  1,  0,  1,  3,  2,  1,  2,  1}) == 6;
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
