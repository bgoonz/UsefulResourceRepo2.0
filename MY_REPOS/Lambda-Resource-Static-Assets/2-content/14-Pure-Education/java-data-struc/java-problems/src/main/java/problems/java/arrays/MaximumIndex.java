package problems.java.arrays;

public class MaximumIndex
{
    /*
    Given an array A[] of N positive integers.
    The task is to find the maximum of j - i subjected
    to the constraint of A[i] <= A[j].
    Example:
        Input: {34, 8, 10, 3, 2, 80, 30, 33, 1}
                     8      33
        Output: 6, A[1] < A[7]
    */

    public static int maxIndexDiff(int[] a)
    {
        int len = a.length;

        int diff = 0, maxDiff = len - 1;
        for(int i = 0; i < len; ++i)
        {
            for(int j = len - 1; j > i; --j)
            {
                if(a[j] > a[i])
                {
                    diff = Math.max(diff, j - i);
                    if(diff >= maxDiff)
                    {
                        return diff;
                    }
                }
            }
            maxDiff--;
        }
        return -1;
    }


    static int maxIndexDiffDP(int[] a)
    {
        return problems.java.dynamic.MaximumIndex.maxIndexDiff(a);
    }

    static boolean testsPass()
    {
        boolean check = maxIndexDiff(new int[] {34, 8, 10, 3, 2, 80, 30, 33, 1}) == 6;
        if(!check)
        {
            return false;
        }

        check = maxIndexDiffDP(new int[] {34, 8, 10, 3, 2, 80, 30, 33, 1}) == 6;
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
