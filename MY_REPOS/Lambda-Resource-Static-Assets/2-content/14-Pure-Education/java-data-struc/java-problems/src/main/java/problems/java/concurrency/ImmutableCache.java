package problems.java.concurrency;

import jdk.nashorn.internal.ir.annotations.Immutable;

import java.math.BigInteger;
import java.util.Arrays;

@Immutable
public class ImmutableCache
{
    //  Class that uses ImmutableCache should declare it with volatile keyword
    //  to make sure that changes are visible to other threads
    private final BigInteger lastNumber;
    private final BigInteger[] lastFactors;

    public ImmutableCache(BigInteger i, BigInteger[] factors)
    {
        this.lastNumber = i;
        this.lastFactors = factors;
    }

    public BigInteger[] getFactors(BigInteger i)
    {
        if(lastFactors == null || !lastNumber.equals(i))
        {
            return null;
        }

        return Arrays.copyOf(lastFactors, lastFactors.length);
    }
}
