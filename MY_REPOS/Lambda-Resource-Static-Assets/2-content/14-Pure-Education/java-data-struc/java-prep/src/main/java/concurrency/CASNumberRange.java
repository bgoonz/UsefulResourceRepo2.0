package concurrency;

import java.util.concurrent.atomic.AtomicReference;

public class CASNumberRange
{
  private static class IntPair
  {
    public IntPair(int lower, int upper)
    {
      this.lower = lower;
      this.upper = upper;
    }

    int lower;
    int upper;
  }

  private AtomicReference<IntPair> ar = new AtomicReference<>(new IntPair(0, 0));
  public int getLower()
  {
    return ar.get().lower;
  }
  public int getUpper()
  {
    return ar.get().upper;
  }

  public void setLower(int lower)
  {
    //  Skip patternMatch for upper being greater than lower
    while(true)
    {
      IntPair oldVal = ar.get();
      IntPair newVal = new IntPair(lower, oldVal.upper);
      if(ar.compareAndSet(oldVal, newVal))
      {
        return;
      }
    }
  }
}
