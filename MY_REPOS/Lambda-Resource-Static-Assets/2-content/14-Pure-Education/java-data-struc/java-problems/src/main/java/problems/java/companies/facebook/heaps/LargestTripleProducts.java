package problems.java.companies.facebook.heaps;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class LargestTripleProducts
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=510655302929581

    You're given a list of n integers arr[0..(n-1)]. You must compute a list output[0..(n-1)] such that,
    for each index i (between 0 and n-1, inclusive), output[i] is equal to the product of the three largest elements out of arr[0..i]
    (or equal to -1 if i < 2, as arr[0..i] then includes fewer than three elements).

    Example:                            Example:
    n = 5                               n = 5
    arr = [1, 2, 3, 4, 5]               arr = [2, 1, 2, 1, 2]
    output = [-1, -1, 6, 24, 60]        output = [-1, -1, 4, 4, 8]
    */

    static int[] findMaxProduct(int[] a)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));

        int [] result = new int[a.length];
        for(int i = a.length - 1; i >= 0; --i)
        {
            Integer first = pq.poll();
            Integer second = pq.poll();
            Integer third = pq.poll();

            if(first != null && second != null && third != null)
            {
                result[i] = first * second * third;
                pq.offer(second);
                pq.offer(third);
            }
            else
            {
                result[i] = -1;
            }
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(findMaxProduct(new int[] {1, 2, 3, 4, 5}), new int[] {-1, -1, 6, 24, 60});
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
