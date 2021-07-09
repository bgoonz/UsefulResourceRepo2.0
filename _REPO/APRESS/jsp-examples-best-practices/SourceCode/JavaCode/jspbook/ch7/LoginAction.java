package jspbook.ch7;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

import jspbook.ch7.CustomerBean;

public class LoginAction implements Action {

  private String view;
  private Connection dbCon;
  private String status;
  private String uid, pwd;

  public LoginAction() {}

  /* Set Database Connection */
  public void setDatabase(Connection _db)
  {
    dbCon = _db;
  }

  /* Execute business logic */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    uid = (String) _req.getParameter("UID");
    pwd = (String) _req.getParameter("PWD");

    /* Validate User */
    if (authenticate(uid, pwd)) {
      status = "success";
      view = "/WEB-INF/jsp/ch7/census.jsp";
    }
    else {
      status = "failed";
      view = "/ch7/login.jsp";
    }

    return true;
  }

  /* Return the page name (and path) to display the view */
  public String getView()
  {
    return view;
  }

  /* Return a JavaBean containing the model (data) */
  public Object getModel()
  {
    /* Use the CustomerBean to return the status of the login */

    CustomerBean cBean = new CustomerBean();
    cBean.setUid(uid);
    cBean.setLoginStatus(status);
    return cBean;
  }

  /* Check if the user is valid */
  private boolean authenticate(String _uid, String _pwd)
  {
    ResultSet rs = null;
    try {
      Statement s = dbCon.createStatement();
      rs = s.executeQuery("select * from user where id = '"
              + _uid + "' and pwd = '" + _pwd + "'");
      return (rs.next());
    }
    catch (java.sql.SQLException e) {
      System.out.println("A problem occurred while accessing the database.");
      System.out.println(e.toString());
    }
    return false;
  }

}