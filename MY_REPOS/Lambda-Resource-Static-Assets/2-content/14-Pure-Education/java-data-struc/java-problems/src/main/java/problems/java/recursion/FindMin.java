package problems.java.recursion;

public class FindMin
{
    public static int findMinInRotatedArrayWithBinarySearch(int[] a)
    {
        // Returns the smallest number in array that has been rotated
        // For example - Array {3,4,5,6,1,2} returns 1
        // Input array was originally sorted in increasing orders
        // Must have O(log n) runtime
        // Input array does not have any duplicates

        return findMin(a, 0, a.length - 1);
    }

    private static int findMin(int[] a, int left, int right)
    {
        if (left == right || a[left] < a[right])
        {
            return a[left];
        }

        if(right - left == 1)
        {
            return Math.min(a[left], a[right]);
        }

        int mid = (left + right) / 2;

        if(a[mid] > a[left])
        {
            return findMin(a, mid, right);
        }
        else
        {
            return findMin(a, left, mid);
        }
    }

    static boolean testsPass()
    {
        boolean check = findMinInRotatedArrayWithBinarySearch(new int[]{3,4,5,6,1,2}) == 1
                && findMinInRotatedArrayWithBinarySearch(new int[]{4,1,2,3}) == 1
                && findMinInRotatedArrayWithBinarySearch(new int[]{1,2,3,4,5,6}) == 1;
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
