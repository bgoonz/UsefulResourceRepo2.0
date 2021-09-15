package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class FibonacciTest
{

  @Test
  public void fib1()
  {
    assertEquals(377, Fibonacci.fib1(14));
  }

  @Test
  public void fib2()
  {
    assertEquals(377, Fibonacci.fib2(14));
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
  public void fib1Streams()
  {
    assertEquals(377, Fibonacci.fib1Streams(14));
  }

  @Test
  public void fib2Streams()
  {
    assertEquals(377, Fibonacci.fib2Streams(14));
  }
}