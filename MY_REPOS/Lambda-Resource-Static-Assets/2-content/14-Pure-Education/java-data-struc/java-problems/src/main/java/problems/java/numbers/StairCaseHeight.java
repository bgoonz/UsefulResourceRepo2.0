package problems.java.numbers;

public class StairCaseHeight
{
    //    Given N blocks, how many steps can be made.
    //    1 block   - 1 step
    //    2 blocks  - 1 step
    //    3 blocks  - 2 steps
    //    ...
    //    Note that this is a consecutive sum problem: N = n(n+1) / 2
    //    n*n + n = 2N
    //    n*n + n - 2N = 0
    //    Where:
    //    a = 1, b = 1, c = -(2 * N)
    //    a(x*x) + bx + c = 0

    static int height(int N)
    {
        //  a = 1, b = 1, c = -2N
        int sqrt = (int)Math.sqrt(1 + 8 * N); // SQRT(b^2 - 4ac)
        return (-1 + sqrt)/ 2;

    }

    static boolean testsPass()
    {
        boolean check = height(55) == 10;
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
