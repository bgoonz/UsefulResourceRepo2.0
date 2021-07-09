package jspbook.ch3;

import java.util.*;
import java.sql.*;

public class productBean implements java.io.Serializable {

  /* Member Variables */
  private String prodID;
  private String prodDesc;
  private String prodManuf;
  private float prodPrice;

  /* ArrayLists to hold recordsets */
  private List prodIDList, prodDescList, prodManufList, prodPriceList;

  /* Helper Variables */
  private int currentRow;
  private int rowCount;

  private Connection db = null;

  /* Constructor */
  public productBean() {

    /* Initialize bean properties */
    setProdID("");
    setProdDesc("");
    setProdManuf("");
    setProdPrice(0.00f);

    /* Initialize arrayLists to hold recordsets */
    prodIDList = new ArrayList();
    prodDescList = new ArrayList();
    prodManufList = new ArrayList();
    prodPriceList = new ArrayList();

    /* Initialize helper variables */
    currentRow = 0;
    rowCount = 0;

    /* Get database connection */
    dbConnect();

  }

  /* Get Database Connection */
  private void dbConnect() {

    if (db == null) {
      try {
        Class.forName("org.gjt.mm.mysql.Driver");
        db = DriverManager.getConnection("jdbc:mysql://localhost:3306/catalog");
      }
      catch (Exception e) {
        System.out.println("Error Connecting to catalog DB: " + e.toString());
      }
    }

  }

  /* Accessor Methods */
  public String getProdID() {
    return prodID;
  }

  public void setProdID(String _prodID) {
    prodID = _prodID;
  }

  public String getProdDesc() {
    return prodDesc;
  }

  public void setProdDesc(String _prodDesc) {
    prodDesc = _prodDesc;
  }

  public String getProdManuf() {
    return prodManuf;
  }

  public void setProdManuf(String _prodManuf) {
    prodManuf = _prodManuf;
  }

  public float getProdPrice() {
    return prodPrice;
  }

  public void setProdPrice(float _prodPrice) {
    prodPrice = _prodPrice;
  }

  /* Read-only attribute */
  public int getCurrentRow() {
    return currentRow;
  }

  /* Populate Record List */
  public boolean populate() {

    /* If prodIDList is empty, then execute the query to populate it */
    if (prodIDList.isEmpty()) {
      try {
        /* Execute Query */
        Statement s = db.createStatement();
        ResultSet rs = s.executeQuery("select * from product");

        prodIDList.clear();
        prodDescList.clear();
        prodManufList.clear();
        prodPriceList.clear();

        rowCount = 0;
        while (rs.next()) {
          prodIDList.add(rs.getString("id"));
          prodDescList.add(rs.getString("description"));
          prodManufList.add(rs.getString("manuf"));
          prodPriceList.add((new Float(rs.getFloat("price"))));
          rowCount++;
        }
      }
      catch (Exception e) {
        System.out.println("Error populating productBean: " + e.toString());
        return false;
      }
    }

    /* Return status of operation (assume success if it made it this far) */
    return true;
  }

  /* Reset current row */
  public void setStartRow(int _start) {
    if (_start < rowCount) {
      currentRow = _start;
    }
  }

  /* Move to next row */
  public int nextRow() {

    if (currentRow == rowCount) {
      currentRow = 0; // Reset for next page request
      return 0; // return 0 to indicate end of recordset
    }

    /* Populate bean properties with current row */
    setProdID((String)prodIDList.get(currentRow));

    setProdDesc((String)prodDescList.get(currentRow));

    setProdManuf((String)prodManufList.get(currentRow));

    Float price = (Float)prodPriceList.get(currentRow);
    setProdPrice(price.floatValue());

    currentRow++;

    /* return currentRow*/
    return currentRow;
  }

}