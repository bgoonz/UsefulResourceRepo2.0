package data.structures.java.functional.numbers;

import java.util.function.IntSupplier;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Fibonacci
{
  public static int fibonacci1(int n)
  {
    int result = Stream.iterate(new int[] {0, 1}, t -> new int[] {t[1], t[0] + t[1]})
        .limit(n)
        .map(t -> t[1])
        .skip(n - 1)
        .findFirst()
        .get();
    return result;
  }

  public static int fibonacci2(int n)
  {
    IntSupplier fib = new IntSupplier()
    {
      private int a = 0;
      private int b = 1;
      @Override
      public int getAsInt()
      {
        int c = a + b;
        a = b;
        b = c;
        return b;
      }
    };
    return IntStream.generate(fib).limit(n - 1).skip(n - 2).findFirst().getAsInt();
  }

  public static int fib1Dynamic(int n)
  {
    return data.structures.java.dynamic.Fibonacci.fib1(n);
  }

  public static int fib2Dynamic(int n)
  {
    return data.structures.java.dynamic.Fibonacci.fib2(n);
  }

  public static int fib1Recursive(int n)
  {
    return data.structures.java.recursion.Fibonacci.fib1(n);
  }

  public static int fib2Recursive(int n)
  {
    return data.structures.java.recursion.Fibonacci.fib2(n);
  }


}
