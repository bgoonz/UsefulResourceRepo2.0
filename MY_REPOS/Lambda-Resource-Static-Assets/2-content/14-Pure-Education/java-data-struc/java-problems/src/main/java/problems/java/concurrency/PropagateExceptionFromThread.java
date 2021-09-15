package problems.java.concurrency;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class PropagateExceptionFromThread
{
    static void propagateUsingFuture(Runnable runnable) throws InterruptedException
    {
        ExecutorService exec = Executors.newSingleThreadExecutor();
        Future<?> future = exec.submit(runnable);
        try
        {
            future.get();
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
                throw new IllegalStateException("Checked exception.", t);
            }
        }
        finally
        {
            future.cancel(true);
        }
    }

    static void propagateUsingMemberVariable(Runnable runnable) throws InterruptedException
    {
        class RethrowableTask implements Runnable
        {
            volatile Throwable t;

            @Override
            public void run()
            {
                try
                {
                    runnable.run();
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
                        throw new IllegalStateException("Checked exception", t);
                    }
                }
            }
        }

        RethrowableTask task = new RethrowableTask();
        Thread t = new Thread(task);
        t.start();
        t.join();
        task.rethrow();
    }

    public static void main(String... args)
    {
        Runnable runnable = () -> {
            throw new RuntimeException("Runtime exception thrown");
        };
        try
        {
            propagateUsingFuture(runnable);
        }
        catch(Throwable t)
        {
            System.out.println(t);
        }
        try
        {
            propagateUsingMemberVariable(runnable);
        }
        catch(Throwable t)
        {
            System.out.println(t);
        }
    }
}
