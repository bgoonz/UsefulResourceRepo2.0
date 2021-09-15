package problems.java.dynamic;

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
        int[] leftMin = new int[len], rightMax = new int[len];

        leftMin[0] = a[0];
        for(int i = 1; i < len; ++i)
        {
            leftMin[i] = Math.min(a[i], leftMin[i - 1]);
        }

        rightMax[len - 1] = a[len - 1];
        for(int i = len - 2; i >= 0; --i)
        {
            rightMax[i] = Math.max(a[i], rightMax[i + 1]);
        }

        int i = 0, j = 0, maxDiff = Integer.MIN_VALUE;
        while(i < len & j < len)
        {
            if(leftMin[i] < rightMax[j])
            {
                maxDiff = Math.max(maxDiff, j - i);
                j++;
            }
            else
            {
                i++;
            }
        }
        return maxDiff;
    }

    static int maxIndexDiffArray(int[] a)
    {
        return problems.java.arrays.MaximumIndex.maxIndexDiff(a);
    }

    static boolean testsPass()
    {
        boolean check = maxIndexDiff(new int[] {34, 8, 10, 3, 2, 80, 30, 33, 1}) == 6;
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
