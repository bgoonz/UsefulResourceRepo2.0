package concurrency;

import org.junit.Test;

import static org.junit.Assert.*;

public class MapsTest
{

  @Test
  public void updateMapWithoutSynchronization()
  {
    Maps.updateMapWithoutSynchronization("BABA", 100);
    assertEquals(100, Maps.map.get("BABA").get());
  }
}