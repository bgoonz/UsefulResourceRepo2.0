package data.structures.java.stacksqueues;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class ClosingPrices
{
  private static class CusipPrice
  {
    CusipPrice(String cusip, double price)
    {
      this.cusip = cusip;
      this.price = price;
    }
    String cusip;
    double price;
  }

  private Map<String,Double> closingPrices = new HashMap<>();
  private enum EntryType {CUSIP, PRICE, ERROR};

  public void readInput(BufferedReader reader)  throws IOException
  {
    String line;
    Stack<CusipPrice> stack = new Stack<>();
    boolean skipPrices = false;
    while((line = reader.readLine()) != null)
    {
      line = line.trim();
      if(line.isEmpty())
      {
        continue;
      }

      EntryType entryType = entryType(line);

      if(entryType == EntryType.CUSIP)
      {
        skipPrices = false;
        stack.push(new CusipPrice(line, 0));
      }
      else if(entryType == EntryType.PRICE && !skipPrices)
      {
        stack.peek().price = Double.valueOf(line);
      }
      else
      {
        //  recording errors not part of the requirement
        //  However, if the cusip is not properly formatted,
        //  we want to skip all prices that follow it.
        skipPrices = true;
      }
    }

    for(CusipPrice cusipPrice : stack)
    {
      closingPrices.put(cusipPrice.cusip, cusipPrice.price);
    }
  }

  public Map<String,Double> getClosingPrices()
  {
    return Collections.unmodifiableMap(closingPrices);
  }

  private EntryType entryType(String line)
  {
    if (line.matches("[a-zA-Z0-9]{8}"))
    {
      return EntryType.CUSIP;
    }
    else if (line.matches("\\d+\\.?\\d+"))
    {
      return EntryType.PRICE;
    }
    else
    {
      return EntryType.ERROR;
    }
  }
}
