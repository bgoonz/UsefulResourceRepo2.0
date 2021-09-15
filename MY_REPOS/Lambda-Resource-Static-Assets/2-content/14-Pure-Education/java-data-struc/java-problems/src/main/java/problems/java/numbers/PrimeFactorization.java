package problems.java.numbers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PrimeFactorization
{
    static int[] primeFactorsOfProduct(int n)
    {
        if(n < 2)
        {
            return new int[0];
        }

        List<Integer> factors = new ArrayList<>();
        for(int i = 2; i <= n; ++i)
        {
            while(n % i == 0)
            {
                factors.add(i);
                n /= i;
            }
        }
        return factors.stream().mapToInt(x -> x).toArray();
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(new int[] {2, 2, 2, 2}, primeFactorsOfProduct(16));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {2, 5}, primeFactorsOfProduct(10));
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {2, 2, 3}, primeFactorsOfProduct(12));
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
