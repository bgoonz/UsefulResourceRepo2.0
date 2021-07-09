package jspbook.ch3;

import java.util.*;
import java.sql.*;

public class CustomerBean implements java.io.Serializable {

  /* Member Variables */
  private String id, lname, fname, sex;
  private int age, children;
  private boolean spouse, smoker;

  /* Helper Variables */
  private Connection db = null;
  private String status;

  /* Error collection */
  Hashtable errors = new Hashtable();

  /* Constants */
  public static final int FIELD_NAME = 0;
  public static final int FIELD_VALUE = 1;

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
    setStatus("");

    id = "";  // Not really a property, so no accessor method

    /* Get database connection */
    dbConnect();
  }

  /* Get Database Connection */
  private void dbConnect() {
    if (db == null) {
      try {
        Class.forName("org.gjt.mm.mysql.Driver");
        db = DriverManager.getConnection("jdbc:mysql://localhost:3306/quoting");
      }
      catch (Exception e) {
        System.out.println("Error Connecting to quoting DB: " + e.toString());
      }
    }
  }

  /* Accessor Methods */

  /* Last Name */
  public void setLname(String _lname) {
    lname = _lname;
  }
  public String getLname() {
    return lname;
  }

  /* First Name */
  public void setFname(String _fname) {
    fname = _fname;
  }
  public String getFname() {
    return fname;
  }

  /* Sex */
  public void setSex(String _sex) {
    sex = _sex;
  }
  public String getSex() {
    return sex;
  }

  /* Age */
  public void setAge(int _age) {
    age = _age;
  }
  public int getAge() {
    return age;
  }

  /* Number of Children */
  public void setChildren(int _children) {
    children = _children;
  }
  public int getChildren() {
    return children;
  }

  /* Spouse ? */
  public void setSpouse(boolean _spouse) {
    spouse = _spouse;
  }
  public boolean getSpouse() {
    return spouse;
  }

  /* Smoker ? */
  public void setSmoker(boolean _smoker) {
    smoker = _smoker;
  }
  public boolean getSmoker() {
    return smoker;
  }

  /* Status ("Customer saved...") */
  public void setStatus(String _msg) {
    status = _msg;
  }
  public String getStatus() {
    return "<br><center><font color=red>" + status + "</font></center>";
  }

  public void loadCustomer(String _id) {
    try {
      String sql = "select * from customer where id='" + _id + "'";
      Statement s = db.createStatement();
      ResultSet rs = s.executeQuery(sql);

      if (rs.next()) {
        setLname(rs.getString("lname"));
        setFname(rs.getString("fname"));
        setSex(rs.getString("sex"));
        setAge(rs.getInt("age"));
        setChildren(rs.getInt("children"));
        setSpouse((rs.getString("married") == "Y") ? true : false);
        setSmoker((rs.getString("smoker") == "Y") ? true : false);
        id = _id;
      }
      else {
        setStatus("Customer Does Not Exist.");
      }
    }
    catch (SQLException e) {
      System.out.println("Error loading customer: " + _id + " : " + e.toString());
    }
  }

  public boolean validateString(String _input) {
    char[] chars = _input.toCharArray();
    for(int i = 0; i < chars.length; i++) {
      if(Character.isDigit(chars[i]))
        return false;
    }
    return true;
  }
  
  public boolean validateAge(int _age) {
    if (age < 1 || age > 100) {
      return false;
    }
    else {
      return true;
    }
  }

  public boolean validate() {
    errors.clear(); // Reset the errors hashtable

    if (!validateString(lname))
      errors.put("lname", "Last name must be all letters.");
    if (!validateString(fname))
      errors.put("fname", "First name must be all letters.");
      
    if (!validateAge(age))
      errors.put("age", "Age must be a numeric value between 1 and 100.");

    return (errors.isEmpty()) ? true : false;
  }

  public String getErrors() {

    StringBuffer errTable = new StringBuffer();
    if (!errors.isEmpty())
      errTable.append("<br><center><table border='1'>");

    Enumeration errs = errors.elements();
    while (errs.hasMoreElements()) {
      errTable.append("<tr><td><font color=red>");
      errTable.append(errs.nextElement());
      errTable.append("</font></td></tr>");
    }

    if (!errors.isEmpty())
      errTable.append("</table></center>");

    return errTable.toString();
  }

  public String getField(String _field, int _part) {

    String err = null;
    String pre = "<font color=red>*";
    String post = "</font>";

    if (_part == FIELD_NAME) {
      if (_field.equals("lname")) {
        err = (String) errors.get("lname");
        if (err != null) {
          return pre + "Last Name: " + post;
        }
        else {
          return "Last Name: ";
        }
      }
      if (_field.equals("fname")) {
        err = (String) errors.get("fname");
        if (err != null) {
          return pre + "First Name: " + post;
        }
        else {
          return "First Name: ";
        }
      }
      if (_field.equals("sex")) {
        err = (String) errors.get("sex");
        if (err != null) {
          return pre + "Sex: " + post;
        }
        else {
          return "Sex: ";
        }
      }

      if (_field.equals("age")) return "Age: ";
      if (_field.equals("children")) return "Children: ";
      if (_field.equals("spouse")) return "Spouse ? ";
      if (_field.equals("smoker")) return "Smoker ? ";
    }

    if (_part == FIELD_VALUE) {
      if (_field.equals("lname")) return getLname();
      if (_field.equals("fname")) return getFname();
      if (_field.equals("sex")) return getSex();
      if (_field.equals("age")) return (Integer.toString(getAge()));
      if (_field.equals("children")) return (Integer.toString(getChildren()));
      if (_field.equals("spouse")) return ((getSpouse()) ? "true" : "false");
      if (_field.equals("smoker")) return ((getSmoker()) ? "true" : "false");
    }

    return "";
  }

  public void submit() {
    try {
      StringBuffer sql = new StringBuffer(256);

      sql.append("UPDATE customer SET ");
      sql.append("lname='").append(lname).append("', ");
      sql.append("fname='").append(fname).append("', ");
      sql.append("age=").append(age).append(", ");
      sql.append("sex='").append(sex).append("', ");
      sql.append("married='").append(spouse).append("', ");
      sql.append("children=").append(children).append(", ");
      sql.append("smoker='").append(smoker).append("'");
      sql.append("where id='").append(id).append("'");

      Statement s = db.createStatement();
      s.executeUpdate(sql.toString());
    }
    catch (SQLException e) {
      System.out.println("Error saving customer: " + id + " : " + e.toString());
    }
  }

}
