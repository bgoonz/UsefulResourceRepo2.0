package problems.java.concurrency;

import org.apache.commons.lang3.tuple.Pair;

import java.util.concurrent.atomic.AtomicReference;

public class CAS
{
    static class Simulated
    {
        private int value;
        synchronized int get()
        {
            return value;
        }

        synchronized int compareAndSwap(int expected, int newValue)
        {
            int oldValue = value;
            if(oldValue == expected)
            {
                value = newValue;
            }
            return oldValue;
        }
    }

    static class Counter
    {
        Simulated casValue;

        int getValue()
        {
            return casValue.get();
        }

        int increment()
        {
            int v;
            do
            {
                v = casValue.get();
            } while(v != casValue.compareAndSwap(v, v + 1));
            return v + 1;
        }
    }

    static class NumberRange
    {
        AtomicReference<Pair<Integer,Integer>> atomicReference = new AtomicReference<>();

        int getLeft()
        {
            return atomicReference.get().getLeft();
        }

        int getRight()
        {
            return atomicReference.get().getRight();
        }

        void setLeft(int left)
        {
            while(true)
            {
                Pair<Integer,Integer> oldVal = atomicReference.get();
                Pair<Integer,Integer> newVal = Pair.of(left, oldVal.getRight());
                if(atomicReference.compareAndSet(oldVal, newVal))
                {
                    return;
                }
            }
        }

    }
}
