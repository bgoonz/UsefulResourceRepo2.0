package data.structures.java.compound;

import org.junit.Test;

import static org.junit.Assert.*;

public class LRUCacheTest
{

  @Test
  public void set()
  {
    LRUCache<String, Integer> cache = new LRUCache(3);

    cache.set("first", 1);
    cache.set("second", 2);
    cache.set("third", 3);

    assertEquals(Integer.valueOf(1) , cache.get("first"));
    assertEquals(Integer.valueOf(2) , cache.get("second"));
    assertEquals(Integer.valueOf(3) , cache.get("third"));

    cache.set("forth", 4);

    assertNull(cache.get("first"));
    assertEquals(Integer.valueOf(2) , cache.get("second"));
    assertEquals(Integer.valueOf(3) , cache.get("third"));
    assertEquals(Integer.valueOf(4) , cache.get("forth"));
  }

  @Test
  public void get()
  {
    LRUCache<String, Integer> cache = new LRUCache(3);

    cache.set("first", 1);
    cache.set("second", 2);
    cache.set("third", 3);

    assertEquals(Integer.valueOf(1) , cache.get("first"));
    assertEquals(Integer.valueOf(2) , cache.get("second"));
    assertEquals(Integer.valueOf(3) , cache.get("third"));
  }
}