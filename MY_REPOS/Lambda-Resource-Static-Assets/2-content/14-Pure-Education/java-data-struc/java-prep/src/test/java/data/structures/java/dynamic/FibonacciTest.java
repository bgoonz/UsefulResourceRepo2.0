package data.structures.java.dynamic;

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
  public void fibStreams1()
  {
    assertEquals(377, Fibonacci.fibStreams1(14));
  }

  @Test
  public void fibStreams2()
  {
    assertEquals(377, Fibonacci.fibStreams2(14));
  }
  @Test
  public void fibRecursive1()
  {
    assertEquals(377, Fibonacci.fibRecursive1(14));
  }

  @Test
  public void fibRecursive2()
  {
    assertEquals(377, Fibonacci.fibRecursive2(14));
  }
}