package problems.java.arrays;

import java.util.Arrays;

public class SeatingArrangement
{
//    There are n guests attending a dinner party, numbered from 1 to n.
//    The ith guest has a height of arr[i-1] inches.
//    The guests will sit down at a circular table which has n seats,
//    numbered from 1 to n in clockwise order around the table.
//    As the host, you will choose how to arrange the guests, one per seat.
//    Note that there are n! possible permutations of seat assignments.
//    Once the guests have sat down, the awkwardness between a pair of guests sitting in adjacent seats is defined
//    as the absolute difference between their two heights. Note that, because the table is circular,
//    seats 1 and n are considered to be adjacent to one another, and that there are therefore n pairs of adjacent guests.
//    The overall awkwardness of the seating arrangement is then defined as the maximum awkwardness of any pair of adjacent guests.
//    Determine the minimum possible overall awkwardness of any seating arrangement.
//    Example:
//      n = 4
//      arr = [5, 10, 6, 8]
//      output = 4
//    If the guests sit down in the permutation [3, 1, 4, 2] in clockwise order around the table
//    (having heights [6, 5, 8, 10], in that order), then the four awkwardnesses between pairs of adjacent guests will be
//    |6-5| = 1, |5-8| = 3, |8-10| = 2, and |10-6| = 4, yielding an overall awkwardness of 4.
//    It's impossible to achieve a smaller overall awkwardness.

    static int minOverallAwkwardness(int[] a)
    {
        Arrays.sort(a);

        int[] table = new int[a.length];
        int left = 0, right = a.length - 1;
        for(int i = a.length - 1; i >= 0; --i)
        {
            if(i % 2 == 0)
            {
                table[left++] = a[i];
            }
            else
            {
                table[right--] = a[i];
            }
        }
        return maxAwkwardness(table);
    }

    private static int maxAwkwardness(int[] a)
    {
        int max = Integer.MIN_VALUE;
        for(int i = 1; i < a.length; ++i)
        {
            max = Math.max(max, Math.abs(a[i] - a[i - 1]));
        }
        max = Math.max(max, Math.abs(a[0] - a[a.length - 1]));
        return max;
    }

    static boolean testsPass()
    {
        boolean check = minOverallAwkwardness(new int[] {10, 70, 20, 60, 40, 30, 50}) == 20;
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
