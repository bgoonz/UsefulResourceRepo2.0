package data.structures.java.numbers;

public class Primes
{
  public static boolean isPrime(int n)
  {
    //  Note:
    //  1.  2 is the first prime number
    //  2.  use <= when comparing Sqrt. Consider number 9
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
      if( n % i == 0)
      {
        return false;
      }
    }
    return true;
  }

  public static int[] genPrimes(int n)
  {
    //  Notes: make sure to use <= when comparing to SqRt
    if(n < 1)
    {
      return new int[0];
    }

    int[] primes = new int[n];
    int count = 0;
    primes[count++] = 2;
    int nextCandidate = 3;
    while(count < n)
    {
      boolean isPrime = true;
      for(int i = 0; primes[i] <= Math.sqrt(nextCandidate); ++i)
      {
        if(nextCandidate % primes[i] == 0)
        {
          isPrime = false;
          break;
        }
      }
      if(isPrime)
      {
        primes[count++] = nextCandidate;
      }
      nextCandidate += 2;
    }
    return primes;
  }
}
