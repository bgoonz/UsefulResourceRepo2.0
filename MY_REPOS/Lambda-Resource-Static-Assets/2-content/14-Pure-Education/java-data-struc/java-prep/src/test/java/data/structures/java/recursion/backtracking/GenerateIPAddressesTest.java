package data.structures.java.recursion.backtracking;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class GenerateIPAddressesTest
{

  @Test
  public void generate()
  {
    GenerateIPAddresses generateIPAddresses = new GenerateIPAddresses("25525511135");
    List<String> addresses = generateIPAddresses.generate();
    assertEquals(2, addresses.size());
    assertEquals("255.255.11.135", addresses.get(0));
    assertEquals("255.255.111.35", addresses.get(1));

    generateIPAddresses = new GenerateIPAddresses("1111");
    addresses = generateIPAddresses.generate();
    assertEquals(1, addresses.size());
    assertEquals("1.1.1.1", addresses.get(0));
  }
}