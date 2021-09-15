package data.structures.java.stacksqueues;

import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class ClosingPricesTest
{
  @Test
  public void getClosingPricesForProperInput() throws IOException
  {
    ClosingPrices closingPrices = new ClosingPrices();
    String input =
            "007000AA\n" +
            "15.47\n" +
            "15.48\n" +
            "15.49\n" +
            "008000BB\n" +
            "45.13\n" +
            "45.14\n" +
            "009000CC\n" +
            "89.10\n";

    BufferedReader reader = new BufferedReader(new StringReader(input));
    closingPrices.readInput(reader);

    Map<String,Double> prices = closingPrices.getClosingPrices();
    assertEquals(3, prices.size());
    assertEquals( 15.49, prices.get("007000AA"), 0.0);
    assertEquals( 45.14, prices.get("008000BB"), 0.0);
    assertEquals( 89.10, prices.get("009000CC"), 0.0);

  }

  @Test
  public void getClosingPricesForImproperInput1() throws IOException
  {
    //  One of the Cusips does not have prices. Price will default to 0.0
    ClosingPrices closingPrices = new ClosingPrices();
    String input =
            "007000AA\n" +
            "15.47\n" +
            "15.48\n" +
            "15.49\n" +
            "008000BB\n" +
            "009000CC\n" +
            "89.10\n";

    BufferedReader reader = new BufferedReader(new StringReader(input));
    closingPrices.readInput(reader);

    Map<String,Double> prices = closingPrices.getClosingPrices();
    assertEquals(3, prices.size());
    assertEquals( 15.49, prices.get("007000AA"), 0.0);
    assertEquals( 0.0, prices.get("008000BB"), 0.0);
    assertEquals( 89.10, prices.get("009000CC"), 0.0);
  }

  @Test
  public void getClosingPricesForImproperInput2() throws IOException
  {
    //  One of the Cusips (008000B) does not conform to cusip specifications
    ClosingPrices closingPrices = new ClosingPrices();
    String input =
            "007000AA\n" +
            "15.47\n" +
            "15.48\n" +
            "15.49\n" +
            "008000B\n" +
            "45.13\n" +
            "45.14\n" +
            "009000CC\n" +
            "89.10\n";

    BufferedReader reader = new BufferedReader(new StringReader(input));
    closingPrices.readInput(reader);

    Map<String,Double> prices = closingPrices.getClosingPrices();
    assertEquals(2, prices.size());
    assertEquals( 15.49, prices.get("007000AA"), 0.0);
    assertEquals( 89.10, prices.get("009000CC"), 0.0);
  }
}