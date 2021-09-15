package problems.java.recursion;

import java.util.concurrent.atomic.AtomicInteger;

import static problems.java.common.Common.swap;

public class GenNumberWithSwaps
{
    /*
    Given a positive integer,
    find the maximum/minimum integer possible by doing at-most K swap operations on its digits.
    Example:                        Example:                    Example:
        Input: M = 254, K = 1           Input: M = 254, K = 2       Input: M = 7599, K = 2
        Output: 524                     Output: 542                 Output: 9975
    */

    static int maxNumberWithSwaps(int n, int k)
    {
        AtomicInteger max = new AtomicInteger(n);
        maxNumberWithSwaps(String.valueOf(n).toCharArray(), k, max);
        return max.get();
    }

    private static void maxNumberWithSwaps(char[] a, int k, AtomicInteger max)
    {
        if(k == 0)
        {
            return;
        }

        int len = a.length;

        for(int i = 0; i < len - 1; ++i)
        {
            for(int j = i + 1; j < len; ++j)
            {
                if(a[j] > a[i])
                {
                    swap(a, i, j);

                    int val = Integer.parseInt(new String(a));
                    if(val > max.get())
                    {
                        max.set(val);
                    }

                    maxNumberWithSwaps(a, k - 1, max);

                    swap(a, i, j);
                }
            }
        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    static int minNumberWithSwaps(int n, int k)
    {
        AtomicInteger min = new AtomicInteger(n);
        minNumberWithSwaps(String.valueOf(n).toCharArray(), k, min);
        return min.get();
    }

    private static void minNumberWithSwaps(char[] a, int k, AtomicInteger min)
    {
        if(k == 0)
        {
            return;
        }

        int len = a.length;

        for(int i = 0; i < len - 1; ++i)
        {
            for(int j = i + 1; j < len; ++j)
            {
                if(a[j] < a[i])
                {
                    swap(a, i, j);

                    int val = Integer.parseInt(new String(a));
                    if(val < min.get())
                    {
                        min.set(val);
                    }

                    minNumberWithSwaps(a, k - 1, min);

                    swap(a, i, j);
                }
            }
        }
    }


    static boolean testsPass()
    {
        boolean check = maxNumberWithSwaps(543, 1) == 543 &&
                maxNumberWithSwaps(254, 1) == 524 &&
                maxNumberWithSwaps(254, 2) == 542 &&
                maxNumberWithSwaps(7599, 5) == 9975 &&
                maxNumberWithSwaps(12345, 6) == 54321;

        if(!check)
        {
            return false;
        }

        check = minNumberWithSwaps(245, 1) == 245 &&
                minNumberWithSwaps(542, 1) == 245 &&
                minNumberWithSwaps(542, 2) == 245 &&
                minNumberWithSwaps(9957, 5) == 5799 &&
                minNumberWithSwaps(54321, 6) == 12345;
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
