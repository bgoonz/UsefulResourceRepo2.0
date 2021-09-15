package problems.java.numbers;

public class FactorialTrailingZeros
{
    static int trailingZerosInFactorial(int n)
    {
        if(n < 0)
        {
            return -1;
        }
        int tralingZeros = 0;
        while(n > 0)
        {
            tralingZeros += n / 5;
            n /= 5;
        }
        return tralingZeros;
    }

    static boolean testsPass()
    {
        boolean check = trailingZerosInFactorial(25) == 6;
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
