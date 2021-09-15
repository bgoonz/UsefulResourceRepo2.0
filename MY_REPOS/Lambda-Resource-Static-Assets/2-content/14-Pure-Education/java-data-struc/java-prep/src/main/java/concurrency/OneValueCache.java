package concurrency;

import jdk.nashorn.internal.ir.annotations.Immutable;

import java.math.BigInteger;
import java.util.Arrays;

@Immutable
public class OneValueCache
{
  //  Class that uses OneValueCache should declare it with volatole keyword to make sure that changes are visible to other threads
  private final BigInteger lastNumber;
  private final BigInteger[] lastFactors;

  public OneValueCache(BigInteger i, BigInteger[] factors)
  {
    lastNumber = i;
    lastFactors = factors;
  }

  public BigInteger[] getFactors(BigInteger i)
  {
    if(lastFactors == null || !lastNumber.equals(i))
    {
      return null;
    }
    else
    {
      return Arrays.copyOf(lastFactors, lastFactors.length);
    }
  }
}
