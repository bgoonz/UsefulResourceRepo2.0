package problems.java.concurrency;

import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import static problems.java.common.Common.randomRange;

public class BoundedBuffer
{
    static abstract class WaitNotifyBufferBase<T>
    {
        private final T[] data;
        private int tail, head, count;

        protected WaitNotifyBufferBase(int capcacity)
        {
            data = (T[]) new Object[capcacity];
        }

        protected synchronized void doPut(T t)
        {
            data[tail] = t;
            if(++tail == data.length)
            {
                tail = 0;
            }
            count++;
        }

        protected synchronized T doGet()
        {
            T t = data[head];
            data[head] = null;
            if(++head == data.length)
            {
                head = 0;
            }
            count--;
            return t;
        }

        protected synchronized boolean isFull()
        {
            return count == data.length;
        }

        protected synchronized boolean isEmpty()
        {
            return count == 0;
        }
    }

    static class WaitNotifyBuffer<T> extends WaitNotifyBufferBase<T>
    {
        public WaitNotifyBuffer(int capacity)
        {
            super(capacity);
        }

        public synchronized void put(T t) throws InterruptedException
        {
            while(isFull())
            {
                wait();
            }
            doPut(t);
            notifyAll();
        }

        public synchronized T get() throws InterruptedException
        {
            while(isEmpty())
            {
                wait();
            }
            T t = doGet();
            notifyAll();
            return t;
        }


        public static void main(String... args) throws InterruptedException
        {
            WaitNotifyBuffer<Integer> buffer = new WaitNotifyBuffer<>(10);
            Thread producer = new Thread( () -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        buffer.put(i);
                        System.out.printf("Put %d in the buffer\n", i);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));
                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });
            Thread consumer = new Thread(() -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        int val = buffer.get();
                        System.out.printf("Got %d off the buffer\n", val);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));

                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });

            producer.start();
            TimeUnit.MILLISECONDS.sleep(1000);
            consumer.start();
            producer.join();
            consumer.join();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    static class ConditionBuffer<T>
    {
        private Lock lock = new ReentrantLock();
        private Condition notFull = lock.newCondition();
        private Condition notEmpty = lock.newCondition();
        private T[] data;
        private int head, tail, count;

        public ConditionBuffer(int capacity)
        {
            data = (T[]) new Object[capacity];
        }

        public void put(T t) throws InterruptedException
        {
            lock.lock();
            try
            {
                while(count == data.length)
                {
                    notFull.await();
                }
                data[tail] = t;
                if(++tail == data.length)
                {
                    tail = 0;
                }
                count++;
                notEmpty.signal();
            }
            finally
            {
                lock.unlock();
            }
        }

        public T take() throws InterruptedException
        {
            lock.lock();
            try
            {
                while(count == 0)
                {
                    notEmpty.await();
                }
                T t = data[head];
                data[head] = null;
                if(++head == data.length)
                {
                    head = 0;
                }
                count--;
                notFull.signal();
                return t;
            }
            finally
            {
                lock.unlock();
            }

        }


        public static void main(String... args) throws InterruptedException
        {
            ConditionBuffer<Integer> buffer = new ConditionBuffer<>(10);
            Thread producer = new Thread( () -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        buffer.put(i);
                        System.out.printf("Put %d in the buffer\n", i);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));
                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });
            Thread consumer = new Thread(() -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        int val = buffer.take();
                        System.out.printf("Got %d off the buffer\n", val);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));

                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });

            producer.start();
            TimeUnit.MILLISECONDS.sleep(1000);
            consumer.start();
            producer.join();
            consumer.join();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////
    static class SemaphoreBuffer<T>
    {
        private Semaphore items;
        private Semaphore spaces;
        private T[] data;
        private int head, tail;

        public SemaphoreBuffer(int capacity)
        {
            data = (T[]) new Object[capacity];
            items = new Semaphore(0);
            spaces = new Semaphore(capacity);
        }

        private void doPut(T t)
        {
            data[tail] = t;
            if(++tail == data.length)
            {
                tail = 0;
            }
        }

        private T doTake()
        {
            T t = data[head];
            data[head] = null;
            if(++head == data.length)
            {
                head = 0;
            }
            return t;
        }

        public void put(T t) throws InterruptedException
        {
            spaces.acquire();
            doPut(t);
            items.release();
        }

        public T take() throws InterruptedException
        {
            items.acquire();
            T t = doTake();
            spaces.release();
            return t;
        }


        public static void main(String... args) throws InterruptedException
        {
            SemaphoreBuffer<Integer> buffer = new SemaphoreBuffer<>(10);
            Thread producer = new Thread( () -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        buffer.put(i);
                        System.out.printf("Put %d in the buffer\n", i);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));
                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });
            Thread consumer = new Thread(() -> {
                for(int i = 0; i < 100; ++i)
                {
                    try
                    {
                        int val = buffer.take();
                        System.out.printf("Got %d off the buffer\n", val);
                        TimeUnit.MILLISECONDS.sleep(randomRange(1, 100));

                    }
                    catch(InterruptedException e)
                    {
                        throw new IllegalStateException("Unexpected exception", e);
                    }
                }
            });

            producer.start();
            TimeUnit.MILLISECONDS.sleep(1000);
            consumer.start();
            producer.join();
            consumer.join();
        }
    }
}
