package problems.java.dynamic;

public class LeftSmallerThanRight
{
    /*
    Given an unsorted array of size N.
    Find the first element in array such that all of its left elements
    are smaller and all right elements to it are greater than it.
    Example:
        Input:  {2, 3, 1, 5, 8, 6, 7}
        Output: 5
    Example:
        Input:  {4, 2, 3, 1, 5, 7}
        Output: 5
    Example:
        Input:  {4, 2, 5, 6, 8, 7}
        Output: 5
    */

    static int pivotValue(int [] a)
    {
        int len = a.length;
        int[] leftMax = new int[len], rightMin = new int[len];

        leftMax[0] = a[0];
        for(int i = 1; i < len; ++i)
        {
            leftMax[i] = Math.max(leftMax[i - 1], a[i]);
        }

        rightMin[len - 1] = a[len - 1];
        for(int i = len - 2; i >= 0; --i)
        {
            rightMin[i] = Math.min(rightMin[i + 1], a[i]);
        }

        for(int i = 0; i < a.length; ++i)
        {
            if(leftMax[i] == rightMin[i])
            {
                return leftMax[i];
            }
        }

        return -1;
    }

    static boolean testsPass()
    {
        boolean check = pivotValue(new int[] {4, 2, 3, 1, 5, 7}) == 5;
        if(!check)
        {
            return false;
        }

        check = pivotValue(new int[] {4, 2, 5, 6, 8, 7}) == 5;
        if(!check)
        {
            return false;
        }

        check = pivotValue(new int[] {2, 3, 1, 5, 8, 6, 7}) == 5;
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
