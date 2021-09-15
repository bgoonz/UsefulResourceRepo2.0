package data.structures.java.functional.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class FibonacciTest
{

  @Test
  public void fibonacci1()
  {
    assertEquals(377, Fibonacci.fibonacci1(14));
  }

  @Test
  public void fibonacci2()
  {
    assertEquals(377, Fibonacci.fibonacci2(14));
  }

  @Test
  public void fib1Dynamic()
  {
    assertEquals(377, Fibonacci.fib1Dynamic(14));
  }

  @Test
  public void fib2Dynamic()
  {
    assertEquals(377, Fibonacci.fib2Dynamic(14));
  }

  @Test
  public void fib1Recursive()
  {
    assertEquals(377, Fibonacci.fib1Recursive(14));
  }

  @Test
  public void fib2Recursive()
  {
    assertEquals(377, Fibonacci.fib2Recursive(14));
  }
}