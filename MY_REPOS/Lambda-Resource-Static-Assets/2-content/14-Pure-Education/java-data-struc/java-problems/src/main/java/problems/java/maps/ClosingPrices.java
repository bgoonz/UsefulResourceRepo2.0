package problems.java.maps;

import org.apache.commons.lang3.StringUtils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.HashMap;
import java.util.Map;

public class ClosingPrices
{
    /*
    We need to process a feed. Each line in the feed is either a ticker or a price.
    For each ticker, we need to report the last (i.e. closing price)
    For example:
            "007000AA\n" +
            "15.47\n" +
            "15.48\n" +
            "15.49\n" +
            "008000BB\n" +
            "45.13\n" +
            "45.14\n" +
            "009000CC\n" +
            "89.10\n";
     */

    private Map<String, Double> closingPrices = new HashMap<>();
    private enum EntryType {CUSIP, PRICE, ERROR};

    public ClosingPrices(BufferedReader reader) throws IOException
    {
        readInput(reader);
    }

    private void readInput(BufferedReader reader)  throws IOException
    {
        String line;
        String lastCusip = "";
        while((line = reader.readLine()) != null)
        {
            line.trim();
            if(StringUtils.isNotBlank(line))
            {
                EntryType entryType = entryType(line);
                if(entryType == EntryType.CUSIP)
                {
                    lastCusip = line;
                    closingPrices.put(line, null);
                }
                else if(entryType == EntryType.PRICE)
                {
                    closingPrices.put(lastCusip, Double.parseDouble(line));
                }
            }
        }
    }

    double getClosingPrice(String ticker)
    {
        return closingPrices.get(ticker);
    }

    private EntryType entryType(String line)
    {
        if(line.matches(("[a-zA-Z0-9]{8}")))
        {
            return EntryType.CUSIP;
        }
        else if(line.matches("\\d+\\.?\\d+"))
        {
            return EntryType.PRICE;
        }
        else
        {
            return EntryType.ERROR;
        }
    }

    static boolean testsPass() throws IOException
    {
        String input =  "007000AA\n" +
                "15.47\n" +
                "15.48\n" +
                "15.49\n" +
                "008000BB\n" +
                "45.13\n" +
                "45.14\n" +
                "009000CC\n" +
                "89.10\n";
        BufferedReader reader = new BufferedReader(new StringReader(input));
        ClosingPrices closingPrices = new ClosingPrices(reader);
        boolean check = closingPrices.getClosingPrice("007000AA") == 15.49 &&
                closingPrices.getClosingPrice("008000BB") == 45.14;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args) throws IOException
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
