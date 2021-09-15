package problems.java.numbers;

public class SquareRoot
{
    static int squareRoot(int n)
    {
        if(n < 2)
        {
            return n;
        }

        int low = 1, high = n / 2;
        while(low <= high)
        {
            int mid = (low + high) / 2;
            int sqr = mid * mid;
            if(sqr == n)
            {
                return mid;
            }
            else if(sqr > n)
            {
                high = mid - 1;
            }
            else
            {
                low = mid + 1;
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        boolean check = squareRoot(81) == 9;
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
