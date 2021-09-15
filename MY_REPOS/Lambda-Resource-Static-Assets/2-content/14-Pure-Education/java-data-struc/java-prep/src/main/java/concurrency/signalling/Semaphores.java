package concurrency.signalling;

import java.util.concurrent.Semaphore;

public class Semaphores
{
  Semaphore binSemaphore = new Semaphore(1);
  int value;
  boolean isEven = true;

  private void mutualExclusion()
  {
    while(true)
    {
      try
      {
        binSemaphore.acquire();
        System.out.printf("%s: %d\n", isEven ? "Even: " : "Odd: ", value);
        isEven = !isEven;
        value++;
      } catch (InterruptedException e)
      {
        throw new IllegalStateException("Unexpected interrupt", e);
      }
      finally
      {
        binSemaphore.release();
      }
    }
  }

  public static void main(String[] args)
  {
    final Semaphores semaphores = new Semaphores();

    new Thread()
    {
      @Override
      public void run()
      {
        semaphores.mutualExclusion();
      }
    }.start();

    new Thread()
    {
      @Override
      public void run()
      {
        semaphores.mutualExclusion();
      }
    }.start();

  }
}
