package concurrency;


import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static concurrency.Common.launderThrowable;

public class PropagateException
{
  private static ExecutorService poolExec = Executors.newSingleThreadExecutor();


  public static void propagateUsingFuture(final Runnable r) throws InterruptedException
  {
    Future<?> future = poolExec.submit(r);
    try
    {
      future.get();
    }
    catch(ExecutionException e)
    {
      throw launderThrowable(e.getCause());
    }
    finally
    {
      future.cancel(true);
    }
  }

  public static void propagateUsingMemberVariable(final Runnable r) throws InterruptedException
  {
    class RethrowableTask implements Runnable
    {
      private volatile Throwable t;

      @Override
      public void run()
      {
        try
        {
          r.run();
        }
        catch(Throwable t)
        {
          this.t = t;
        }
      }

      void rethrow()
      {
        if(t != null)
        {
          throw launderThrowable(t);
        }
      }
    }


    RethrowableTask task = new RethrowableTask();
    Thread thread = new Thread(task);
    thread.start();
    thread.join();
    task.rethrow();
  }


  public static void main(String[] args)
  {
    Runnable throwingTask = () -> {throw new RuntimeException("Runtime Exception Thrown");};

    try
    {
      propagateUsingMemberVariable(throwingTask);
    }
    catch (Throwable t)
    {
      System.out.println(t);
    }

    try
    {
      propagateUsingFuture(throwingTask);
    }
    catch (Throwable t)
    {
      System.out.println(t);
    }
  }
}
