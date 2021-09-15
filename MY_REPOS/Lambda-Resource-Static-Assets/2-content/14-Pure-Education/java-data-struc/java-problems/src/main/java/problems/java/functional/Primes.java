package problems.java.functional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Primes
{
    static private boolean isPrime(int n)
    {
        int candidateRoot = (int)Math.sqrt(n);
        return IntStream.rangeClosed(2, candidateRoot).noneMatch(i -> n % i == 0);
    }

    static int[] genPrimesUpTo(int n)
    {
        Map<Boolean, List<Integer>> map = IntStream.rangeClosed(2, n).boxed()
                .collect(Collectors.partitioningBy(x -> isPrime(x)));
        return map.get(true).stream().mapToInt(x -> x).toArray();
    }

    static boolean testsPass()
    {
        boolean check = Arrays.equals(new int[] {2, 3, 5, 7}, genPrimesUpTo(7));
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
