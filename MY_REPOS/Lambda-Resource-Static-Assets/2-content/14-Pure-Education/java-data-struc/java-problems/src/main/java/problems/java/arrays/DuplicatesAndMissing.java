package problems.java.arrays;

import java.util.Arrays;

public class DuplicatesAndMissing
{
    static int missingNumberInSortedConsecutiveArray(int[] a)
    {
        //  {4, 5, 6, 8, 9, 10, 11, 12, 13, 14}) == 7
        int low = a[0], high = a[a.length - 1];
        int highExpectedSum = high * (high + 1) / 2;
        int lowExpectedSum = (low - 1) * low / 2;
        int expectedSum = highExpectedSum - lowExpectedSum;

        int actualSum = Arrays.stream(a).sum();
        return expectedSum - actualSum;
    }

    static int duplicateInRange_1_to_N_1(int[] a)
    {
        //  N = 5: {4, 2, 1, 3, 2}
        int n = a.length - 1;
        int expectedSum = n * (n + 1) / 2;
        int sum = Arrays.stream(a).sum();
        return sum - expectedSum;
    }

    static int duplicateInRange_0_to_N_2(int[] a)
    {
        // N = 5: {0, 2, 1, 3, 2}
        int n = a.length - 2;
        int expectedSum = n * (n + 1) / 2;
        int sum = Arrays.stream(a).sum();
        return sum - expectedSum;
    }

    static int[] removeAllDuplicates(int[] a)
    {
        //  {0, 1, 0, 0, 0, 1, 1, 2, 0, 1}
        if(a == null || a.length < 2)
        {
            return a;
        }

        int pos = 1;
        for(int i = 1; i < a.length; ++i)
        {
            int j;
            for(j = 0; j < pos; ++j)
            {
                if(a[j] == a[i])
                {
                    break;
                }
            }
            if(j == pos)
            {
                a[pos++] = a[i];
            }
        }
        return Arrays.copyOf(a, pos);
    }

    static int[] removeAllDuplicatesWithStreams(int[] a)
    {
        return Arrays.stream(a).distinct().toArray();
    }

    static int findLonelyNumber(int[] a)
    {
        //  {0, 1, 2, 3, 0, 1, 3} -> 2
        int n = a[0];
        for(int i = 1; i < a.length; ++i)
        {
            n ^= a[i];
        }
        return n;
    }

    static boolean testsPass()
    {
        boolean check = missingNumberInSortedConsecutiveArray(new int[] {4, 5, 6, 8, 9, 10, 11, 12, 13, 14}) == 7;
        if(!check)
        {
            return false;
        }

        check = duplicateInRange_1_to_N_1(new int[] {4, 2, 1, 3, 2}) == 2;
        if(!check)
        {
            return false;
        }

        check = duplicateInRange_0_to_N_2(new int[] {0, 2, 1, 3, 2}) == 2;
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(new int[] {0, 1, 2}, removeAllDuplicates(new int[] {0, 1, 0, 0, 0, 1, 1, 2, 0, 1}));
        if(!check)
        {
            return false;
        }

        check = Arrays.equals(new int[] {0, 1, 2}, removeAllDuplicatesWithStreams(new int[] {0, 1, 0, 0, 0, 1, 1, 2, 0, 1}));
        if(!check)
        {
            return false;
        }

        check = findLonelyNumber(new int[] {0, 1, 2, 3, 0, 1, 3}) == 2;
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
