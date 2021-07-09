package catalog.beans;

import java.io.*;
import java.util.*;
import java.sql.*;

import jspbook.framework.logging.*;

/**
 * JavaBean representing a shopping cart
 *
 * <p>Stores the product id, product name,
 * and product description of each item
 * stored in the shopping cart.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class CartBean implements Serializable
{
  /**
   *  Product ID
   */
  private String prodid;
  /**
   *  Product Name
   */
  private String prodname;
  /**
   *  Product Price
   */
  private String price;

  /**
   *  List of Product ID's stored in cart
   */
  private ArrayList prodidList;
  /**
   *  List of Product name's stored in cart
   */
  private ArrayList prodnameList;
  /**
   *  List of Product price's stored in cart
   */
  private ArrayList priceList;

  /**
   *  Pointer used to display items in order
   */
  private int currentRow;

  /**
   *  No-args constructor used to initialize the bean.
   */
  public CartBean()
  {
    /* Initialize arrayLists to hold recordsets */
    prodidList = new ArrayList();
    prodnameList = new ArrayList();
    priceList = new ArrayList();

    /* Initialize helper variables */
    currentRow = 0;
  }

  /**
   *  Setter method for Product ID.
   */
  public void setProdid (String _prodid) {this.prodid = _prodid;}
  /**
   *  Getter method for Product ID.
   */
  public String getProdid () {return this.prodid;}

  /**
   *  Setter method for Product Name.
   */
  public void setProdname (String _prodname) {this.prodname = _prodname;}
  /**
   *  Getter method for Product Name.
   */
  public String getProdname () {return this.prodname;}

  /**
   *  Setter method for Product Price.
   */
  public void setPrice (String _price) {this.price = _price;}
  /**
   *  Getter method for Product Price.
   */
  public String getPrice () {return this.price;}

  /**
   *  Inserts item into cart.
   */
  public boolean add(String _id, String _name, String _price)
  {
    try {
      prodidList.add(_id);
      prodnameList.add(_name);
      priceList.add(_price);
    }
    catch (Exception e) {
      Logger.log(Logger.ERROR, "Error populating CartBean: " + e.toString());
      return false;
    }

    return true;
  }

  /**
   *  Removes an item from the cart.
   */
  public void remove (String _id)
  {
    int index = prodidList.indexOf(_id);
    prodidList.remove(index);
    prodnameList.remove(index);
    priceList.remove(index);
  }
  
  /**
   *  Resets the current row.
   */
  public void setStartRow(int _start)
  {
    if (_start < prodidList.size()) {
      currentRow = _start;
    }
  }

  /**
   *  Returns the total number of items in the cart.
   */
  public int getTotalRows()
  {
    return prodidList.size();
  }

  /**
   *  Advances the bean to the next item in the shopping cart.
   */
  public int nextRow()
  {
    /* Populate bean properties with current row */
    setProdid((String)prodidList.get(currentRow));
    setProdname((String)prodnameList.get(currentRow));
    setPrice((String)priceList.get(currentRow));

    currentRow++;

    /* return currentRow*/
    return currentRow;
  }

}
