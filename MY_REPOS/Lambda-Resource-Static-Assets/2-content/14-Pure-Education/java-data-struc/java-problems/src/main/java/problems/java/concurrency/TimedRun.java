package problems.java.concurrency;

import java.util.concurrent.*;

public class TimedRun
{
    static ExecutorService tasKExec = Executors.newCachedThreadPool();
    static ScheduledExecutorService cancelExec = Executors.newScheduledThreadPool(1);

    static void timedRunWithScheduler(Runnable runnable, long timeout, TimeUnit timeUnit) throws InterruptedException
    {
        Thread t = new Thread(runnable);
        t.start();
        cancelExec.schedule(() -> t.interrupt(), timeout, timeUnit);
        t.join(timeUnit.toMillis(timeout));
    }

    static void timedRunWithFuture(Runnable runnable, long timeout, TimeUnit timeUnit) throws InterruptedException
    {
        Future<?> future = tasKExec.submit(runnable);
        try
        {
            future.get(timeout, timeUnit);
        }
        catch(TimeoutException e)
        {
            //  task will be cancelled below
        }
        catch(ExecutionException e)
        {
            Throwable t = e.getCause();
            if(t instanceof RuntimeException)
            {
                throw (RuntimeException)t;
            }
            else if(t instanceof Error)
            {
                throw (Error)t;
            }
            else
            {
                throw new IllegalStateException("Unchecked exception", t);
            }
        }
        finally
        {
            //  Harmless if completed
            future.cancel(true); // interrupt if running
        }
    }
}
