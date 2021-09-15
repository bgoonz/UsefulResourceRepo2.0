package concurrency;

public class Common
{
  public static RuntimeException launderThrowable(Throwable t)
  {
    if(t instanceof RuntimeException)
    {
      return (RuntimeException)t;
    }
    else if(t instanceof Error)
    {
      throw (Error)t;
    }
    else
    {
      throw new IllegalStateException("Checked exception.", t);
    }
  }
}
