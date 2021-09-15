package concurrency;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

public class Maps
{
  protected static ConcurrentMap<String, AtomicInteger> map = new ConcurrentHashMap<>();

  public static void updateMapWithoutSynchronization(String symbol, int qty)
  {
    AtomicInteger value = map.computeIfAbsent(symbol, k -> new AtomicInteger(0));
    value.addAndGet(qty);
  }
}
