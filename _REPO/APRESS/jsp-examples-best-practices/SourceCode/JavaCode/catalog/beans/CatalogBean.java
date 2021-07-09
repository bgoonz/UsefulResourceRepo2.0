package catalog.beans;

import java.io.*;
import java.util.*;
import java.sql.*;

import jspbook.framework.logging.*;

/**
 * JavaBean representing a catalog item
 *
 * <p>Stores the data representing an item
 * from the catalog database.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class CatalogBean implements Serializable
{

  /**
   *  Product ID
   */
  private int prodid;
  /**
   *  Product Name
   */
  private String prodname;
  /**
   *  Product Description
   */
  private String proddesc;
  /**
   *  Product Price
   */
  private double price;

  /**
   *  Stores all product ID's in the database
   */
  private ArrayList prodidList;
  /**
   *  Stores all product name's in the database
   */
  private ArrayList prodnameList;
  /**
   *  Stores all product description's in the database
   */
  private ArrayList proddescList;
  /**
   *  Stores all product price's in the database
   */
  private ArrayList priceList;

  /**
   *  Current row (used when displaying records)
   */
  private int currentRow;
  /**
   *  Row count (used to keep track of total rows
   */
  private int rowCount;
  /**
   *  Total rows (used to report the total number of items in the bean)
   */
  private int totalRows;

  /**
   *  No-arg constructor used to initialize the bean.
   */
  public CatalogBean()
  {
    /* Initialize arrayLists to hold recordsets */
    prodidList = new ArrayList();
    prodnameList = new ArrayList();
    proddescList = new ArrayList();
    priceList = new ArrayList();
    
    /* Initialize helper variables */
    currentRow = 0;
    rowCount = 0;
  }

  /**
   *  Setter method for Product ID.
   */
  public void setProdid (int _prodid) {this.prodid = _prodid;}
  /**
   *  Getter method for Product ID.
   */
  public int getProdid () {return this.prodid;}

  /**
   *  Setter method for Product Name.
   */
  public void setProdname (String _prodname) {this.prodname = _prodname;}
  /**
   *  Getter method for Product Name.
   */
  public String getProdname () {return this.prodname;}

  /**
   *  Setter method for Product Description.
   */
  public void setProddesc (String _proddesc) {this.proddesc = _proddesc;}
  /**
   *  Getter method for Product Description.
   */
  public String getProddesc () {return this.proddesc;}

  /**
   *  Setter method for Product Price.
   */
  public void setPrice (double _price) {this.price = _price;}
  /**
   *  Getter method for Product Price.
   */
  public double getPrice () {return this.price;}

  /**
   *  Populates JavaBean with data from a JDBC result set.
   */
  public boolean populate(ResultSet _rs)
  {
    try {
      prodidList.clear();
      prodnameList.clear();
      proddescList.clear();
      priceList.clear();

      rowCount = 0;
      while (_rs.next()) {
        prodidList.add(new Integer(_rs.getInt("prodid")));
        prodnameList.add(_rs.getString("prodname"));
        proddescList.add(_rs.getString("proddesc"));
        priceList.add(new Float(_rs.getDouble("price")));
        rowCount++;
      }
    }
    catch (Exception e) {
      Logger.log(Logger.ERROR, "Error populating Catalog Bean: " + e.toString());
      return false;
    }

    return true;
  }

  /**
   *  Resets the current row.
   */
  public void setStartRow(int _start)
  {
    if (_start < rowCount) {
      currentRow = _start;
    }
  }

  /**
   *  Returns the total number of items in the bean.
   */
  public int getTotalRows()
  {
    return this.rowCount;
  }

  /**
   *  Advances the bean to the next record.
   */
  public int nextRow()
  {
    if (currentRow <= rowCount) {
      /* Populate bean properties with current row */
      Integer tmpInt = (Integer)prodidList.get(currentRow);
      setProdid(tmpInt.intValue());
      setProdname((String)prodnameList.get(currentRow));
      setProddesc((String)proddescList.get(currentRow));
      Float tmpFloat = (Float)priceList.get(currentRow);
      setPrice(tmpFloat.doubleValue());
    }

    currentRow++;

    /* return currentRow*/
    return currentRow;
  }

}
