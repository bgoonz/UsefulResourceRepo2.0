package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class BuyStockTest
{

  @Test
  public void oneTransaction()
  {
    int[] prices = {1, 4, 5, 7, 6, 3, 2, 9};
    BuyStock buyStock = new BuyStock(prices);
    assertEquals(8, buyStock.oneTransaction());
  }

  @Test
  public void manyTransactions()
  {
    int[] prices = {1, 4, 5, 7, 6, 3, 2, 9};
    BuyStock buyStock = new BuyStock(prices);
    assertEquals(13, buyStock.manyTransactions());
  }

  @Test
  public void twoTransactions()
  {
    int[] prices = {1, 4, 5, 7, 6, 3, 2, 9};
    BuyStock buyStock = new BuyStock(prices);
    assertEquals(13, buyStock.twoTransactions());
  }
}