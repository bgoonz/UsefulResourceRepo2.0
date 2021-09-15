package data.structures.java.maps;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

public class FindItineraryTest
{
  FindItinerary findItinerary;

  @Before
  public void setUp() throws Exception
  {
    Map<String,String> trips = new HashMap<String,String>() {{
      put("B", "C");
      put("D", "E");
      put("A", "B");
      put("C", "D");
    }};
    findItinerary = new FindItinerary(trips);
  }

  @Test
  public void findItinerary()
  {
    Map<String, String> result = findItinerary.find();
    assertEquals("B", result.get("A"));
    assertEquals("C", result.get("B"));
    assertEquals("D", result.get("C"));
    assertEquals("E", result.get("D"));
  }
}