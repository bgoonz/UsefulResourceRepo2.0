package concurrency;

import java.util.Map;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class MapWithReadWriteLock<K,V>
{
  private Map<K,V> map;
  private ReadWriteLock lock = new ReentrantReadWriteLock();
  private Lock readLock = lock.readLock();
  private Lock writeLock = lock.writeLock();

  public MapWithReadWriteLock(Map<K,V> map)
  {
    this.map = map;
  }

  public V put(K key, V value)
  {
    writeLock.lock();
    try
    {
      return map.put(key, value);
    }
    finally
    {
      writeLock.unlock();
    }
  }

  public V get(K key)
  {
    readLock.lock();
    try
    {
      return map.get(key);
    }
    finally
    {
      readLock.unlock();
    }
  }
}
