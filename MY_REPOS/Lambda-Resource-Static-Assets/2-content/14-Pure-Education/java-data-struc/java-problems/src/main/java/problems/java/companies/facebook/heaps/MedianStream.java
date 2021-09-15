package problems.java.companies.facebook.heaps;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

public class MedianStream
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=547645422524434

    You're given a list of n integers arr[0..(n-1)]. You must compute a list output[0..(n-1)] such that,
    for each index i (between 0 and n-1, inclusive), output[i] is equal to the median of the elements arr[0..i]
    (rounded down to the nearest integer).

    Example:
    n = 4
    arr = [5, 15, 1, 3]
    output = [5, 10, 5, 4]
    The median of [5] is 5, the median of [5, 15] is (5 + 15) / 2 = 10,
    the median of [5, 15, 1] is 5,
    and the median of [5, 15, 1, 3] is (3 + 5) / 2 = 4.
    */

    static int[] findMedian(int[] a)
    {
        int[] result = new int[a.length];

        for(int i = 0; i < a.length; ++i)
        {
            int[] temp = new int[i + 1];
            for(int j = 0; j < temp.length; ++j)
            {
                temp[j] = a[j];
            }
            result[i] = (int)median(temp);
        }

        return result;
    }


    private static double median(int[] a)
    {
        if(a == null && a.length == 0)
        {
            return Double.MIN_VALUE;
        }
        if(a.length == 1)
        {
            return a[0];
        }
        if(a.length == 2)
        {
            return (a[0] + a[1]) / 2.0;
        }


        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());

        for(int v : a)
        {
            if(minHeap.size() == maxHeap.size())
            {
                if(!minHeap.isEmpty() && v > minHeap.peek())
                {
                    maxHeap.offer(minHeap.poll());
                    minHeap.offer(v);
                }
                else
                {
                    maxHeap.offer(v);
                }
            }
            else
            {
                if(maxHeap.peek() > v)
                {
                    minHeap.offer(maxHeap.poll());
                    maxHeap.offer(v);
                }
                else
                {
                    minHeap.offer(v);
                }
            }
        }

        if(minHeap.size() == maxHeap.size())
        {
            return (minHeap.peek() + maxHeap.peek()) / 2.0;
        }
        else if(minHeap.size() > maxHeap.size())
        {
            return minHeap.peek();
        }
        else
        {
            return maxHeap.peek();
        }
    }



    static boolean testsPass()
    {
        boolean check = Arrays.equals(findMedian(new int[] {5, 15, 1, 3}), new int[] {5, 10, 5, 4});
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
