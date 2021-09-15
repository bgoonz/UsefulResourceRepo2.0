package problems.java.arrays;


public class RemoveSubarrayToMakeSorted
{
    /*
    Given an integer array arr, remove a subarray  such that the remaining elements are non-decreasing.
    Return the length of the shortest subarray to remove.
    Example 1:
        Input: [1,2,3,10,4,2,3,5]
        Output: 3
        The shortest subarray we can remove is [10,4,2] of length 3.
        The remaining elements after that will be [1,2,3,3,5] which are sorted.
    Example 2:
        Input: arr = [5,4,3,2,1]
        Output: 4
        Since the array is strictly decreasing, we can only keep a single element.
        Therefore we need to remove a subarray of length 4, either [5,4,3,2] or [4,3,2,1]
    Example 3:
        Input: [1,2,3]
        Output: 0
        The array is already non-decreasing. We do not need to remove any elements.
    */

    static int lengthOfSubArray(int[] a)
    {
        if(a.length == 1)
        {
            return 0;
        }

        int len = a.length;
        int left = 0, right = len - 1;

        while(left < right && a[left + 1] >= a[left])
        {
            left++;
        }

        while(right >= left && a[right - 1] <= a[right])
        {
            right--;
        }

        if(left > right)
        {
            return 0;
        }

        int min = Math.min(len - left - 1, right);

        int i = 0;
        while(i <= left && right < len)
        {
            if(a[right] >= a[i])
            {
                min = Math.min(min, right - i - 1);
                i++;
            }
            else
            {
                right++;
            }
        }

        return min;
    }

    static boolean testsPass()
    {
        boolean check =
                lengthOfSubArray(new int[] {1, 2, 3, 10, 4, 2, 3, 5}) == 3;
        if(!check)
        {
            return false;
        }
        check =
                lengthOfSubArray(new int[] {1, 2, 3, 4, 1, 2, 3, 3}) == 3;
        if(!check)
        {
            return false;
        }

        check =
                lengthOfSubArray(new int[] {1, 1, 1, 2, 2, 1, 1, 1}) == 2;
        if(!check)
        {
            return false;
        }
        check = lengthOfSubArray(new int[] {5, 4, 3, 2, 1}) == 4;
        if(!check)
        {
            return false;
        }

        check = lengthOfSubArray(new int[] {1, 2, 3}) == 0;
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
