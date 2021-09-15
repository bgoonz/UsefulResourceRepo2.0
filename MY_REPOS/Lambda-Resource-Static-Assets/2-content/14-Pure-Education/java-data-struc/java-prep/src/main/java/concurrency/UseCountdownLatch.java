package concurrency;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class UseCountdownLatch
{
  //  make sure all threads are started at the same time
  public static long timedTasks(int nThreads, final Runnable task) throws InterruptedException
  {
    final CountDownLatch startGate = new CountDownLatch(1);
    final CountDownLatch endGate = new CountDownLatch(nThreads);

    for(int i = 0; i < nThreads; ++i)
    {
      Thread t = new Thread(() -> {
        try
        {
          startGate.await();
          try
          {
            task.run();
          }
          finally
          {
            endGate.countDown();
          }
        }
        catch(InterruptedException ignored)
        {
        }
      });
      t.start();
    }
    long start = System.nanoTime();
    startGate.countDown();
    endGate.await();
    long end = System.nanoTime();
    return end - start;
  }

  public static void main(String[] args) throws InterruptedException
  {
    Runnable task = () -> {
      try
      {
        TimeUnit.MILLISECONDS.sleep(20);
      }
      catch (InterruptedException e)
      {
        e.printStackTrace();
      }
    };

    long total = timedTasks(8, task);
    System.out.printf("%d threads executed in %d nanos\n", 8, total);
  }
}
