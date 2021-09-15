package problems.java.numbers;

public class ConsecutiveNumberSum
{
    /*
    Input: 15
    Output: 4
    Explanation: 15 = 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5
    */

    static int numberOfConsecutiveSums(int n)
    {
        int start = 1, end = (n + 1) / 2, count = 1;

        while(start < end)
        {
            int sum = 0;
            for(int i = start; i <= end; ++i)
            {
                sum += i;
                if(sum >= n)
                {
                    if(sum == n)
                    {
                        count++;
                    }
                    break;
                }
            }
            start++;
        }
        return count;
    }

    static boolean testsPass()
    {
        boolean check = numberOfConsecutiveSums(9) == 3;
        if(!check)
        {
            return false;
        }

        check = numberOfConsecutiveSums(15) == 4;
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
