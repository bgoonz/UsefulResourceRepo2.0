package problems.java.heaps;

import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class MergeSortedArrays
{
    static int[] mergeSortedArrays(int[] a, int[] b)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));
        pq.addAll(Arrays.stream(b).boxed().collect(Collectors.toList()));

        int[] result = new int[a.length + b.length];
        Arrays.setAll(result, i -> pq.poll());
        return result;
    }

    static boolean testsPass()
    {
        int[] a = {1, 3, 5, 7, 9};
        int[] b = {2, 4, 6, 8};

        boolean check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9}, mergeSortedArrays(a, b));
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
