package problems.java.concurrency;

import javafx.util.Pair;

import java.io.ObjectInputStream;
import java.util.concurrent.TimeUnit;

public class DeadlockDemos
{
    static class CreateDeadlock implements Runnable
    {
        private Object first, second;
        CreateDeadlock(Object first, Object second)
        {
            this.first = first;
            this.second = second;
        }

        @Override
        public void run()
        {
            while(true)
            {
                System.out.println(Thread.currentThread().getName());
                synchronized(first)
                {
                    try
                    {
                        TimeUnit.SECONDS.sleep(1);
                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected", e);
                    }
                    synchronized(second)
                    {
                        System.out.println(Thread.currentThread().getName());
                    }
                }
            }
        }

        public static void main(String... args) throws InterruptedException
        {
            Object lock1 = new Object();
            Object lock2 = new Object();
            Thread t1 = new Thread(new CreateDeadlock(lock1, lock2), "Thread 1");
            Thread t2 = new Thread(new CreateDeadlock(lock2, lock1), "Thread 2");
            t1.start();
            t2.start();
            t1.join();
            t2.join();
        }
    }

    static class AvoidDeadlock
    {
        static class Account
        {
            void credit(double amount) {}
            void debit(double amount) {}
            Double getBalance() {return 0.0;}
        }

        static Object tieLock = new Object();

        static void transfer(Account from, Account to, double amount) throws Exception
        {
            class Helper
            {
                void transfer() throws Exception
                {
                    if(from.getBalance().compareTo(to.getBalance()) < 0)
                    {
                        throw new Exception("Insufficient funds");
                    }
                    else
                    {
                        from.debit(amount);
                        to.credit(amount);
                    }
                }
            }

            int fromHash = System.identityHashCode(from);
            int toHash = System.identityHashCode(to);
            if(fromHash < toHash)
            {
                synchronized(from)
                {
                    synchronized(to)
                    {
                        new Helper().transfer();
                    }
                }
            }
            else if(toHash < fromHash)
            {
                synchronized(to)
                {
                    synchronized(from)
                    {
                        new Helper().transfer();
                    }
                }
            }
            else
            {
                synchronized(tieLock)
                {
                    synchronized(from)
                    {
                        synchronized(to)
                        {
                            new Helper().transfer();
                        }
                    }
                }
            }
        }
    }
}
