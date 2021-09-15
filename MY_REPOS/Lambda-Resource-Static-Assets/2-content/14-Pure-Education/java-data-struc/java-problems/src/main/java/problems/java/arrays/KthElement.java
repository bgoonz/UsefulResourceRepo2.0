package problems.java.arrays;

import java.util.Arrays;
import java.util.Comparator;

public class KthElement
{
    static int getSecondMax(int [] a)
    {
        int max = Integer.MIN_VALUE, secondMax = Integer.MIN_VALUE;
        for(int v : a)
        {
            if(v > max)
            {
                secondMax = max;
                max = v;
            }
            else if(v > secondMax)
            {
                secondMax = v;
            }
        }
        return secondMax;
    }

    static int getSecondMaxWithStreams(int [] a)
    {
        return Arrays.stream(a)
                .boxed()
                .sorted(Comparator.reverseOrder())
                .mapToInt(x -> x)
                .limit(2)
                .toArray()[1];
    }

    static int getKthLargestWithSort(int[] a, int k)
    {
        Arrays.sort(a);
        return a[a.length - k];
    }

    static int getKthLargestWithStreamsUsingSkip(int[] a, int k)
    {
        return Arrays.stream(a).sorted().skip(a.length - k).toArray()[0];
    }

    static int getKthLargestWithStreamsUsingLimit(int[] a, int k)
    {
        return Arrays.stream(a)
                .boxed()
                .sorted(Comparator.reverseOrder())
                .mapToInt(x -> x)
                .limit(k)
                .toArray()[k - 1];
    }

    static int getKthSmallestWithStreamsUsingSkip(int[] a, int k)
    {
        return Arrays.stream(a).sorted().skip(k - 1).toArray()[0];
    }


    static int getKthSmallestWithStreamsUsingLimit(int[] a, int k)
    {
        return Arrays.stream(a).sorted().limit(k).toArray()[k - 1];
    }


    static boolean testsPass()
    {
        boolean check = getKthLargestWithSort(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 1) == 9;
        if(!check)
        {
            return false;
        }

        check = getKthLargestWithSort(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 4) == 6;
        if(!check)
        {
            return false;
        }

        check = getKthLargestWithStreamsUsingSkip(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 1) == 9;
        if(!check)
        {
            return false;
        }

        check = getKthLargestWithStreamsUsingSkip(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 4) == 6;
        if(!check)
        {
            return false;
        }

        check = getKthLargestWithStreamsUsingLimit(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 4) == 6;
        if(!check)
        {
            return false;
        }


        check = getKthSmallestWithStreamsUsingLimit(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 4) == 4;
        if(!check)
        {
            return false;
        }

        check = getKthSmallestWithStreamsUsingSkip(new int[] {9, 3, 2, 7, 5, 8, 1, 6, 4}, 4) == 4;
        if(!check)
        {
            return false;
        }

        check = getSecondMax(new int[] {9, 8, 7, 6, 5, 4, 3, 2, 1}) == 8;
        if(!check)
        {
            return false;
        }

        check = getSecondMaxWithStreams(new int[] {9, 8, 7, 6, 5, 4, 3, 2, 1}) == 8;
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
