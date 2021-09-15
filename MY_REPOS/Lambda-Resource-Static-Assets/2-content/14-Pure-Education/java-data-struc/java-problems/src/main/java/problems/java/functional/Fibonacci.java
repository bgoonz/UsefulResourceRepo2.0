package problems.java.functional;

import java.util.function.IntSupplier;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Fibonacci
{
    static int fibonacciWithStreamIterate(int n)
    {
        return Stream.iterate(new int[] {0, 1}, t -> new int[] {t[1], t[0] + t[1]})
                .limit(n)
                .map(t -> t[1])
                .skip(n - 1)
                .findFirst().get();
    }

    static int fibonacciWithStreamGenerate(int n)
    {
        IntSupplier intSuppler = new IntSupplier()
        {
            int a = 0;
            int b = 1;
            @Override
            public int getAsInt()
            {
                int c = a + b;
                a = b;
                b = c;
                return b;
            }
        };

        return IntStream.generate(intSuppler)
                .limit(n - 1)
                .skip(n - 2)
                .findFirst().getAsInt();
    }

    static boolean testsPass()
    {
        boolean check = fibonacciWithStreamIterate(14) == 377;
        if(!check)
        {
            return false;
        }
        check = fibonacciWithStreamGenerate(14) == 377;
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
