package problems.java.dynamic;

import java.util.Arrays;
import java.util.Comparator;

public class RussianDoll
{
    /*
    You have a number of envelopes with widths and heights given as a pair of integers (w, h).
    One envelope can fit into another if and only if both the width and height of one envelope is greater
    than the width and height of the other envelope.
    What is the maximum number of envelopes can you Russian doll? (put one inside other)
    This is a MaxIncreasingSubSequence problem after the sort
    Sort by width ascending then by height descending
    //  Original Set:       After Sort:
            {7, 9},         {7, 9},
            {9, 7},         {8, 6},
            {9, 8},         {9, 10},
            {9, 10},        {9, 8},
            {10, 8},        {9, 7},
            {11, 5},        {10, 8},
            {8, 6},         {11, 5},
    //  Note that (8, 6) can fit in (9, 10) and (9, 7) can fit in (10, 8)
     */

    static int russianDollCount(int[][] envelopes)
    {
        Arrays.sort(envelopes, Comparator.comparingInt((int[] a) -> a[0])
                .thenComparing((int[] a) -> a[1], Comparator.reverseOrder()));

        int count = 0;
        for(int i = 1; i < envelopes.length; ++i)
        {
            if(envelopes[i][0] > envelopes[i - 1][0] && envelopes[i][1] > envelopes[i - 1][1])
            {
                count++;
            }
        }
        return count;
    }

    static boolean testsPass()
    {
        int[][] envelopes = {
                {7, 9},
                {9, 7},
                {9, 8},
                {9, 10},
                {10, 8},
                {11, 5},
                {8, 6},
        };
        boolean check = russianDollCount(envelopes) == 2;
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
