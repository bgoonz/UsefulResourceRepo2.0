package jspbook.ch5;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import javax.naming.*;
import javax.sql.*;

import jspbook.ch5.CustomerBean;

public class Main extends HttpServlet {

  //Connection dbCon;
  DataSource ds;
  HttpSession session;

  /* Initialize servlet. Use JNDI to look up a DataSource */
  public void init() {

    try {
      Context initCtx = new InitialContext();
      Context envCtx = (Context) initCtx.lookup("java:comp/env");
      ds = (DataSource) envCtx.lookup("jdbc/QuotingDB");
//      dbCon = ds.getConnection();
    }
    catch (javax.naming.NamingException e) {
      System.out.println("A problem occurred while retrieving a DataSource object");
      System.out.println(e.toString());
    }

  }

  public void doPost (HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException {

    /* Refresh session attributes */
    session = _req.getSession();
    session.removeAttribute("loginError");
    session.removeAttribute("submitError");

    String action = _req.getParameter("action");

    /* Authenticate user if request comes from login page */
    if (action.equals("login")) {
      String uid = _req.getParameter("UID");
      String pwd = _req.getParameter("PWD");
      if (authenticate(uid, pwd)) {
        session.setAttribute("validUser", "y");
        session.setAttribute("loginError", "n");
        session.setAttribute("uid", uid);
        gotoPage("/WEB-INF/jsp/ch5/census.jsp", _req, _res);
      }
      /* If the user login fails, then return them to the login page to retry */
      else {
        loginError(_req, _res);
      }
    }

    /* Record the survey data if the request comes from the survey form */
    else if (action.equals("submit")) {
      /* Make sure the user has logged in before recording the data */
      String validUser = (String) session.getAttribute("validUser");
      if (validUser.equals("y")) {
        if (recordSurvey(_req)) {
          /* Reset validUser flag and forward to ThankYou page */
          session.removeAttribute("validUser");
          gotoPage("/WEB-INF/jsp/ch5/thankyou.jsp", _req, _res);
        }
        else {
          session.setAttribute("submitError", "y");
          gotoPage("/ch5/login.jsp", _req, _res);
        }
      }
      /* If the user did not login, then send them to the login page */
      else {
        loginError(_req, _res);
      }
    }

  }

  /* Send request to a different page */
  private void gotoPage(String _page, HttpServletRequest _req, HttpServletResponse _res)
    throws IOException, ServletException {

    RequestDispatcher dispatcher = _req.getRequestDispatcher(_page);
    if (dispatcher != null)
       dispatcher.forward(_req, _res);

  }

  /* Set error attributes in session and return to Login page */
  private void loginError(HttpServletRequest _req, HttpServletResponse _res)
    throws IOException, ServletException {

    session.setAttribute("validUser", "n");
    session.setAttribute("loginError", "y");
    gotoPage("/ch5/login.jsp", _req, _res);

  }

  /* Check if the user is valid */
  private boolean authenticate(String _uid, String _pwd) {

    Connection dbCon = null;
    ResultSet rs = null;
    try {
      dbCon = ds.getConnection();
      Statement s = dbCon.createStatement();
      rs = s.executeQuery("select * from user where id = '"
              + _uid + "' and pwd = '" + _pwd + "'");
      return (rs.next());
    }
    catch (java.sql.SQLException e) {
      System.out.println("A problem occurred while accessing the database.");
      System.out.println(e.toString());
    }
    finally {
      try {
        dbCon.close();
      }
      catch (SQLException e) {
        System.out.println("A problem occurred while closing the database.");
        System.out.println(e.toString());
      }
    }
    
    return false;

  }

  /* Using the CustomerBean, record the data */
  public boolean recordSurvey(HttpServletRequest _req) {

    Connection dbCon = null;
    try {
      dbCon = ds.getConnection();
      CustomerBean cBean = new CustomerBean();
      cBean.populateFromParms(_req);
      return cBean.submit(dbCon);
    }
    catch (java.sql.SQLException e) {
      System.out.println("A problem occurred while accessing the database.");
      System.out.println(e.toString());
    }
    finally {
      try {
        dbCon.close();
      }
      catch (SQLException e) {
        System.out.println("A problem occurred while closing the database.");
        System.out.println(e.toString());
      }
    }

    return false;
  }

  public void destroy() {}

}
