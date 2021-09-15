package problems.java.arrays;

public class MaxSumInArray
{
    static int maxSumInArray(int[] a)
    {
        int sum = 0, maxSum = 0;

        for(int v : a)
        {
            sum += v;
            maxSum = Math.max(maxSum, sum);
            if(sum < 0)
            {
                sum = 0;
            }
        }
        return maxSum;
    }


    static boolean testsPass()
    {
        int[] a = {-4, 3, 2, 7, -8, 11, 1, -3};
        boolean check = maxSumInArray(a) == 16;

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
