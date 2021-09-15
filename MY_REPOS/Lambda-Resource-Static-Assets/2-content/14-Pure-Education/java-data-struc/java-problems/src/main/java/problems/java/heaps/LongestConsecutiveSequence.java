package problems.java.heaps;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class LongestConsecutiveSequence
{
    static int longestConsecutiveSequence(int [] a)
    {
        // {100, 5, 20, 2, 1, 4, 21, 6, 7} -> {4, 5, 6, 7}
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));
        int maxCount = 1, count = 1;
        int min = pq.poll();
        while(!pq.isEmpty())
        {
            int nextVal = pq.poll();
            {
                if(nextVal - 1 == min)
                {
                    count++;
                    maxCount = Math.max(maxCount, count);
                }
                else
                {
                    count = 1;
                }
                min = nextVal;
            }
        }

        return maxCount;
    }

    static boolean testsPass()
    {
        boolean check = longestConsecutiveSequence(new int[] {100, 5, 20, 2, 1, 4, 21, 6, 7}) == 4;
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
