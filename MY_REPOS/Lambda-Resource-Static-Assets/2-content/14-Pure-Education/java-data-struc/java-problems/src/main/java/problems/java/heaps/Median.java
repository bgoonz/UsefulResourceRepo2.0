package problems.java.heaps;

import java.util.Comparator;
import java.util.PriorityQueue;

public class Median
{
    /*
    Add Median stream, see company/facebook package
    https://leetcode.com/discuss/interview-question/1006825/Facebook-or-Phone-Screen-or-Median-Stream
     */
    /*
    Consider numbers: 1 5 0 4 9 3 8 2 7 6
    MIN     MAX
    ----------
    5       4    <--- TOP
    6       3
    7       2
    8       1
    9       0
    */

    static double median(int[] a)
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
        boolean check = median(new int[] {3, 9, 5, 0, 1, 8, 2, 7, 4, 6}) == 4.5;
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
