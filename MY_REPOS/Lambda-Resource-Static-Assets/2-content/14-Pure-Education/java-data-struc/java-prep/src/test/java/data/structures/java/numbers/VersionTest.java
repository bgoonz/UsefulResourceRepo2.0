package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class VersionTest
{

  @Test
  public void compareVersions()
  {
    assertEquals(-1, Version.compareVersions("1.1", "1.1.1"));
    assertEquals(0, Version.compareVersions("1.1", "1.1.0"));
    assertEquals(1, Version.compareVersions("1.1.2", "1.1.0"));
  }
}