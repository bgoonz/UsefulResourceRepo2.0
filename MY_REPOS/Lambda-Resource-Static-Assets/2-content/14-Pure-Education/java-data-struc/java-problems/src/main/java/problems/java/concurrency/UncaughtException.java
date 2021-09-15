package problems.java.concurrency;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UncaughtException
{
    static class UncaughtExceptionLogger implements Thread.UncaughtExceptionHandler
    {
        /*
        The Thread API also provides the UncaughtExceptionHandler facility,
        which lets you detect when a thread dies due to an uncaught exception.
        When a thread exits due to an uncaught exception,
        the JVM reports this event to an application-provided UncaughtExceptionHandler;
        if no handler  exists, the default behavior is to print the stack trace to System.err
         */
        @Override
        public void uncaughtException(Thread t, Throwable e)
        {
            Logger logger = Logger.getAnonymousLogger();
            logger.severe("Thread terminated with exception " + t.getName() + e);
        }
    }

    static class MyThreadFactory implements ThreadFactory
    {
        private final String poolName;
        MyThreadFactory(String name)
        {
            this.poolName = name;
        }
        @Override
        public Thread newThread(Runnable r)
        {
            return new MyAppThread(r, poolName);
        }
    }

    static class MyAppThread extends Thread
    {
        /*
        To set an UncaughtExceptionHandler for pool threads, provide a ThreadFactory to the ThreadPoolExecutor constructor.
        Exceptions thrown from tasks make it to the uncaught exception handler only for tasks submitted with execute;
        for tasks submitted with submit, any thrown exception, checked or not, is considered to be part of the task’s return status.
        If a tasks submitted with submit terminates with an exception, it is re-thrown by Future.get, wrapped in an ExecutionException.
        */
        public static final String DEFAULT_NAME = "MyAppThread";
        private static volatile boolean debugLifecycle = false;
        private static final AtomicInteger created = new AtomicInteger();
        private static final AtomicInteger alive = new AtomicInteger();
        private static final Logger log = Logger.getAnonymousLogger();

        public MyAppThread(Runnable runnable, String name)
        {
            super(runnable, name + "-" + created.incrementAndGet());
            setUncaughtExceptionHandler((t, e) -> log.log(Level.SEVERE, "UNCAUGHT in thread " + t.getName(), e));
        }

        @Override
        public void run()
        {
            boolean debug = debugLifecycle;
            if(debug)
            {
                log.log(Level.FINE, "Created " + getName());
            }
            try
            {
                alive.incrementAndGet();
                super.run();
            }
            finally
            {
                alive.decrementAndGet();
                if (debug)
                {
                    log.log(Level.FINE, "Exiting " + getName());
                }
            }
        }
    }
}
