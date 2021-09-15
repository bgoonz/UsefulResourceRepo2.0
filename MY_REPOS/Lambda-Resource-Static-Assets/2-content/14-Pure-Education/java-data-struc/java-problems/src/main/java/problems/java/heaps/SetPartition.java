package problems.java.heaps;

import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class SetPartition
{
    /*
    Partition a set into two subsets such that the difference of subset sums is minimum
    Input:  {1, 6, 11, 5}, sum of this array is 23
    Subset1 = {1, 5, 6}, sum of Subset1 = 12
    Subset2 = {11}, sum of Subset2 = 11
    Return minimum difference
    Approach shown here uses Karmarkar–Karp heuristic
    */

    static int minDifference(int [] a)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));
        while(pq.size() > 1)
        {
            int v1 = pq.poll();
            int v2 = pq.poll();
            pq.offer(v1 - v2);
        }
        return pq.poll();
    }

    static boolean testsPass()
    {
        boolean check = minDifference(new int[] {1, 6, 11, 5}) == 1;
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
