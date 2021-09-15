package concurrency;

public class CASSimulated
{
  private int value;

  public synchronized int get()
  {
    return value;
  }

  public synchronized int compareAndSwap(int expected, int newValue)
  {
    int oldValue = value;
    if(oldValue == expected)
    {
      value = newValue;
    }
    return oldValue;
  }

  public synchronized boolean compareAndSet(int expected, int newValue)
  {
    return expected == compareAndSwap(expected, newValue);
  }
}
