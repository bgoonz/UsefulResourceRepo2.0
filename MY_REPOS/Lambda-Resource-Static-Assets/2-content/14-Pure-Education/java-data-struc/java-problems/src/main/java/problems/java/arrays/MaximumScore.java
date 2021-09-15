package problems.java.arrays;

public class MaximumScore
{
    /*
        https://leetcode.com/problems/get-the-maximum-score/
        1537. Get the Maximum Score
        You are given two sorted arrays of distinct integers nums1 and nums2.
        A valid path is defined as follows:
        Choose array nums1 or nums2 to traverse (from index-0).
        Traverse the current array from left to right.
        If you are reading any value that is present in nums1 and nums2 you are allowed
        to change your path to the other array.
        Score is defined as the sum of uniques values in a valid path.
        Example1:
            Input: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
            Output: 30
            [2,4,5,8,10], [2,4,5,8,9], [2,4,6,8,9], [2,4,6,8,10],  (starting from nums1)
            [4,6,8,9], [4,5,8,10], [4,5,8,9], [4,6,8,10]    (starting from nums2)
            The maximum is obtained with the path in green [2,4,6,8,10]
        Example1:
            Input: nums1 = [1,3,5,7,9], nums2 = [3,5,100]
            Output: 109
            Maximum sum is obtained with the path [1,3,5,100].
    */
    static int maximumScore(int[] a, int [] b)
    {
        int len1 = a.length, len2 = b.length;

        int sum1 = 0, sum2 = 0, result = 0;
        int i = 0, j = 0;
        while(i < len1 && j < len2)
        {
            if (a[i] < b[j])
            {
                sum1 += a[i++];
            }
            else if (b[j] < a[i])
            {
                sum2 += b[j++];
            }
            else
            {
                result += Math.max(sum1, sum2) + a[i];
                i++;
                j++;
                sum1 = 0;
                sum2 = 0;
            }
        }
        while(i < len1)
        {
            sum1 += a[i++];
        }
        while(j < len2)
        {
            sum2 += b[j++];
        }

        return Math.max(sum1, sum2) + result;
    }

    static boolean testsPass()
    {
        int[] a1 = {2, 4, 5, 8, 10};
        int[] a2 = {4, 6, 8, 9};
        boolean check = maximumScore(a1, a2) == 30;

        if(!check)
        {
            return false;
        }

        a1 = new int[] {1, 3, 5, 7, 9};
        a2 = new int[] {1,3,5,100};
        check = maximumScore(a1, a2) == 109;

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
