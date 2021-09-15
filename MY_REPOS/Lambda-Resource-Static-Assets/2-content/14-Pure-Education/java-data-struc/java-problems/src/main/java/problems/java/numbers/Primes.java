package problems.java.numbers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Primes
{
    //  2 is the first prime number
    //  use <= when comparing Sqrt. Consider number 9

    static boolean isPrime(int n)
    {
        if(n < 2)
        {
            return false;
        }
        if(n == 2)
        {
            return true;
        }

        if(n % 2 == 0)
        {
            return false;
        }

        for(int i = 3; i <= Math.sqrt(n); i += 2)
        {
            if(n % i == 0)
            {
                return false;
            }
        }
        return true;
    }

    static int[] genPrimes(int n)
    {
        if(n < 1)
        {
            return new int[0];
        }

        int[] primes = new int[n];
        primes[0] = 2;
        int idx = 1;
        int nextCandidate = 3;
        while(idx < n)
        {
            boolean isPrime = true;
            for(int i = 0; primes[i] <= Math.sqrt(nextCandidate); ++i)
            {
                if (nextCandidate % primes[i] == 0)
                {
                    isPrime = false;
                    break;
                }
            }
            if(isPrime)
            {
                primes[idx++] = nextCandidate;
            }
            nextCandidate += 2;
        }

        return primes;
    }

    static boolean testsPass()
    {
        boolean check = isPrime(71);
        if(!check)
        {
            return false;
        }
        check = isPrime(81);
        if(check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {2, 3, 5, 7, 11, 13, 17}, genPrimes(7));
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
