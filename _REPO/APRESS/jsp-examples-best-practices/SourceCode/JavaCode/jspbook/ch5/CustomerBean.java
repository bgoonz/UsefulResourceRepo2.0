package jspbook.ch5;

import java.util.*;
import java.sql.*;
import javax.servlet.http.*;

public class CustomerBean implements java.io.Serializable {

  /* Member Variables */
  private String lname, fname, sex;
  private int age, children;
  private boolean spouse, smoker;

  /* Helper Variables */;
  private String uid ;

  /* Constructor */
  public CustomerBean() {
    /* Initialize properties */
    setLname("");
    setFname("");
    setSex("");
    setAge(0);
    setChildren(0);
    setSpouse(false);
    setSmoker(false);
  }

  public void populateFromParms(HttpServletRequest _req) {
    // Populate bean properties from request parameters
    setLname(_req.getParameter("lname"));
    setFname(_req.getParameter("fname"));
    setSex(_req.getParameter("sex"));
    setAge(Integer.parseInt(_req.getParameter("age")));
    setChildren(Integer.parseInt(_req.getParameter("children")));
    setSpouse((_req.getParameter("married").equals("Y")) ? true : false);
    setSmoker((_req.getParameter("smoker").equals("Y")) ? true : false);
    // Get session and populate uid
    HttpSession session = _req.getSession();
    uid = (String) session.getAttribute("uid");
  }

  /* Accessor Methods */

  /* Last Name */
  public void setLname(String _lname) {lname = _lname;}
  public String getLname() {return lname;}

  /* First Name */
  public void setFname(String _fname) {fname = _fname;}
  public String getFname() {return fname;}

  /* Sex */
  public void setSex(String _sex) {sex = _sex;}
  public String getSex() {return sex;}

  /* Age */
  public void setAge(int _age) {age = _age;}
  public int getAge() {return age;}

  /* Number of Children */
  public void setChildren(int _children) {children = _children;}
  public int getChildren() {return children;}

  /* Spouse ? */
  public void setSpouse(boolean _spouse) {spouse = _spouse;}
  public boolean getSpouse() {return spouse;}

  /* Smoker ? */
  public void setSmoker(boolean _smoker) {smoker = _smoker;}
  public boolean getSmoker() {return smoker;}

  public boolean submit(Connection _dbCon) {

    Statement s = null;
    ResultSet rs = null;
    String custId = "";
    StringBuffer sql = new StringBuffer(256);

    try {
      // Check if customer exists (use uid to get custID)
      s = _dbCon.createStatement();
      rs = s.executeQuery("select * from user where id = '" + uid + "'");
      if (rs.next()) {
        custId = rs.getString("cust_id");
      }

      rs = s.executeQuery("select * from customer where id = " + custId);
      if (rs.next()) {
        // Update record
        sql.append("UPDATE customer SET ");
        sql.append("lname='").append(lname).append("', ");
        sql.append("fname='").append(fname).append("', ");
        sql.append("age=").append(age).append(", ");
        sql.append("sex='").append(sex).append("', ");
        sql.append("married='").append((spouse) ? "Y" : "N").append("', ");
        sql.append("children=").append(children).append(", ");
        sql.append("smoker='").append((smoker) ? "Y" : "N").append("'");
        sql.append("where id='").append(custId).append("'");
      }
      else {
        // Insert record
        sql.append("INSERT INTO customer VALUES(");
        sql.append(custId).append(",'");
        sql.append(lname).append("', '");
        sql.append(fname).append("', ");
        sql.append(age).append(", '");
        sql.append(sex).append("', '");
        sql.append((spouse) ? "Y" : "N").append("', ");
        sql.append(children).append(", '");
        sql.append((smoker) ? "Y" : "N").append("')");
      }
      s.executeUpdate(sql.toString());
    }
    catch (SQLException e) {
      System.out.println("Error saving customer: " + custId + " : " + e.toString());
      return false;
    }
    return true;
  }

}