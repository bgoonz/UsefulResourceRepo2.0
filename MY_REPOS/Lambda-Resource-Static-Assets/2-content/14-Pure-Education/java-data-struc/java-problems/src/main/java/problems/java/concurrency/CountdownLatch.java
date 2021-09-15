package problems.java.concurrency;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class CountdownLatch
{
    static long timedTasks(int nThreads, Runnable task) throws InterruptedException
    {
        CountDownLatch startGate = new CountDownLatch(1);
        CountDownLatch endGate = new CountDownLatch(nThreads);
        for(int i = 0; i< nThreads; ++i)
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
                catch (InterruptedException e)
                {
                    throw new IllegalStateException("Unexpected exception", e);
                }
            });
            t.start();
        }

        long start = System.nanoTime();
        startGate.countDown();
        endGate.await();
        return System.nanoTime() - start;
    }

    public static void main(String... args) throws InterruptedException
    {
        Runnable task = () -> {
            try
            {
                TimeUnit.MILLISECONDS.sleep(10);
            }
            catch (InterruptedException e)
            {
                e.printStackTrace();
            }
        };
        long time = timedTasks(8, task);
        System.out.printf("8 threads executed in %d millis\n", time / 1000000);
    }
}
