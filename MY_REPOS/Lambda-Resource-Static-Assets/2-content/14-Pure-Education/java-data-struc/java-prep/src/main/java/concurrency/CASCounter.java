package concurrency;

public class CASCounter
{
  private CASSimulated casValue;

  public int getValue()
  {
    return casValue.get();
  }

  public int increment()
  {
    int v;
    do
    {
      v = casValue.get();
    }  while (v != casValue.compareAndSwap(v, v + 1));
    return v + 1;
  }
}
