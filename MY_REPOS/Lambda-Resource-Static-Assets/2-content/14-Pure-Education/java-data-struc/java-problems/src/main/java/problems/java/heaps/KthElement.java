package problems.java.heaps;

import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class KthElement
{
    static int kthLargest(int[] a, int k)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));
        while(pq.size() > k)
        {
            pq.poll();
        }

        return pq.peek();
    }

    static int kthSmallest(int[] a, int k)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));
        while (pq.size() > k)
        {
            pq.poll();
        }

        return pq.peek();
    }

    static boolean testsPass()
    {
        int[] a1 = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        boolean check = kthLargest(a1, 3) == 7;
        if(!check)
        {
            return false;
        }

        check = kthSmallest(a1, 3) == 3;
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
