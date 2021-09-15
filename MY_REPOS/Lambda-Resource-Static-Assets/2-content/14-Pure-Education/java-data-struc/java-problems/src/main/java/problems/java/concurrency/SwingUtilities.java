package problems.java.concurrency;

import java.util.concurrent.*;

public class SwingUtilities
{
    private static ExecutorService exec = Executors.newSingleThreadExecutor(new SwingThreadFactory());
    private static volatile Thread swingThread;

    static class SwingThreadFactory implements ThreadFactory
    {
        @Override
        public Thread newThread(Runnable r)
        {
            swingThread = new Thread(r);
            return swingThread;
        }
    }

    public static void invokeAndWait(Runnable r) throws InterruptedException
    {
        Future<?> f = exec.submit(r);
        try
        {
            f.get();
        }
        catch (ExecutionException e)
        {
            throw new IllegalStateException("Exception", e);
        }
    }

    public static void invokeLater(Runnable r)
    {
        exec.execute(r);
    }

    public static boolean isEventDispatchThread()
    {
        return Thread.currentThread() == swingThread;
    }
}
