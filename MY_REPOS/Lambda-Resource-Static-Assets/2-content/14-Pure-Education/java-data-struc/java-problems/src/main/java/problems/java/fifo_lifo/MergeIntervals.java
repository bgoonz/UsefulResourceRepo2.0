package problems.java.fifo_lifo;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Stack;
import java.util.stream.Collectors;

public class MergeIntervals
{
    static List<int[]> mergeIntervals(int[][] intervals)
    {
        Arrays.sort(intervals, Comparator.comparingInt((int[] a) -> a[0]));
        Stack<int[]> stack = new Stack<>();
        stack.push(intervals[0]);
        for(int i = 1; i < intervals.length; ++i)
        {
            int[] interval = intervals[i];
            if(interval[0] > stack.peek()[1])
            {
                stack.push(interval);
            }
            else
            {
                if(interval[1] > stack.peek()[1])
                {
                    stack.peek()[1] = interval[1];
                }
            }
        }
        return stack.stream().collect(Collectors.toList());
    }


    static boolean testsPass()
    {
        int [][] intervals = {
                {8,10},
                {1,3},
                {15,18},
                {7,8},
                {4,5},
                {2,6}
        };
        List<int[]> result = mergeIntervals(intervals);
        boolean check = Arrays.equals(new int[] {1,6}, result.get(0)) &&
                Arrays.equals(new int[] {7,10}, result.get(1)) &&
                Arrays.equals(new int[] {15,18}, result.get(2));
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
