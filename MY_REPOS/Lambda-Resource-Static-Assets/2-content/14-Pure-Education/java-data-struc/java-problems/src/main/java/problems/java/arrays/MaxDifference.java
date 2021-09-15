package problems.java.arrays;

import java.util.Arrays;
import java.util.Map;

public class MaxDifference
{
    static int maxDifference(int[] a)
    {
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;

        for(int v : a)
        {
            max = Math.max(max, v);
            min = Math.min(min, v);
        }
        return  max - min;
    }

    static int maxDifferenceWithStreams(int[] a)
    {
        int max = Arrays.stream(a).max().getAsInt();
        int min = Arrays.stream(a).min().getAsInt();
        return  max - min;
    }

    static boolean testsPass()
    {
        int[] a = {6, -5, 0, 7, 25, 14, -4, 18};
        return maxDifference(a) == 30 &&
                maxDifferenceWithStreams(a) == 30;
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
