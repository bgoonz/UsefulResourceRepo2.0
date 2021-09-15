package concurrency;

import java.util.concurrent.*;

import static concurrency.Common.launderThrowable;

public class TimedRun
{
  private static ScheduledExecutorService cancelExecutor = Executors.newScheduledThreadPool(1);
  private static ExecutorService taskExecutor = Executors.newCachedThreadPool();

  public static void timedRunWithScheduler(final Runnable r, long timeout, TimeUnit unit) throws InterruptedException
  {
    final Thread t = new Thread(r);
    t.start();
    cancelExecutor.schedule(() -> t.interrupt(), timeout, unit);
    t.join(unit.toMillis(timeout));
  }

  public static void timedRunWithFuture(final Runnable r, long timeout, TimeUnit unit) throws InterruptedException
  {
    Future<?> f = taskExecutor.submit(r);
    try
    {
      f.get(timeout, unit);
    }
    catch(TimeoutException e)
    {
      //  Task will be cancelled below
    }
    catch(ExecutionException e)
    {
      throw launderThrowable(e.getCause());
    }
    finally
    {
      //  Harmless if completed
      f.cancel(true); // interrupt if running
    }
  }
}
