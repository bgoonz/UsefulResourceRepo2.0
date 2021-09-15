package problems.java.concurrency;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrentMapUpdates
{
    //  Update value in a map without requiring synchronization

    private ConcurrentMap<String, AtomicInteger> map = new ConcurrentHashMap<>();

    public void addQuantity(String key, int quantity)
    {
        AtomicInteger atomicInteger = map.computeIfAbsent(key, x -> new AtomicInteger(0));
        atomicInteger.addAndGet(quantity);
    }

    public int getQuantity(String key)
    {
        AtomicInteger atomicInteger = map.getOrDefault(key, new AtomicInteger(-1));
        return atomicInteger.get();
    }

    public static void main(String... args)
    {
        ConcurrentMapUpdates map = new ConcurrentMapUpdates();
        map.addQuantity("nick", 5);
        map.addQuantity("nick", 10);
        map.addQuantity("nick", 15);
        System.out.println(map.getQuantity("nick"));
    }
}
