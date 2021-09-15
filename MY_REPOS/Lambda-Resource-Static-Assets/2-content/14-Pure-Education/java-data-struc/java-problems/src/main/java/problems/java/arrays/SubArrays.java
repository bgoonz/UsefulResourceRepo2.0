package problems.java.arrays;

public class SubArrays
{
    static int numberOfConsecutiveSubarraySums(int[] a, int target)
    {
        //  Note:   Consecutive is the key word in the name of this func
        // Count number of sub-arrays that add to a given sum
        // Input Array = {33, 9, 4, 20, 3, 10, 5}, target = 33
        // 3 subarrays [33], [9, 4, 20], [20, 3, 10] add up to 33
        int count = 0;
        for(int i = 0; i < a.length; ++i)
        {
            int sum = a[i];
            for(int j = i + 1; j < a.length; ++j)
            {
                if(sum >= target)
                {
                    if(sum == target)
                    {
                        count++;
                    }
                    break;
                }
                sum += a[j];
            }
        }
        return count;
    }


    static int lengthShortestSubarrayExceedingTarget(int[] a, int target)
    {
        //  {1, 4, 45, 6, 0, 19}, 51 -> Shortest subarray size = 3 {4, 45, 6}
        int min = Integer.MAX_VALUE;
        for(int i = 0; i < a.length; ++i)
        {
            int sum = a[i];
            for(int j = i + 1; j < a.length; ++j)
            {
                if(sum > target)
                {
                    min = Math.min(min, j - i);
                    break;
                }
                sum += a[j];
            }
        }
        return min == Integer.MAX_VALUE ? -1 : min;
    }

    static boolean testsPass()
    {
        boolean check = numberOfConsecutiveSubarraySums(new int[] {33, 9, 4, 20, 3, 10, 5}, 33) == 3;
        if(!check)
        {
            return  false;
        }


        check = lengthShortestSubarrayExceedingTarget(new int[] {1, 4, 45, 6, 0, 19}, 51) == 3 &&
                lengthShortestSubarrayExceedingTarget(new int[] {1, 11, 100, 1, 0, 200, 3, 2, 1, 250}, 299) == 4 &&
                lengthShortestSubarrayExceedingTarget(new int[] {1, 4, 45, 6, 52, 19}, 51) == 1;
        if(!check)
        {
            return  false;
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
