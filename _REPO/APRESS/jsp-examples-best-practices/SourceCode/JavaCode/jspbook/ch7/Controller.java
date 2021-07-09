package jspbook.ch7;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import javax.naming.*;
import javax.sql.*;

public class Controller extends HttpServlet {

  /* Shared database connection */
  private Connection dbCon;

  public void init()
  {
    /* Initialize shared resources */

    try {
      Context initCtx = new InitialContext();
      Context envCtx = (Context) initCtx.lookup("java:comp/env");
      DataSource ds = (DataSource) envCtx.lookup("jdbc/QuotingDB");
      dbCon = ds.getConnection();
    }
    catch (javax.naming.NamingException e) {
      System.out.println("A problem occurred while retrieving a DataSource object");
      System.out.println(e.toString());
    }
    catch (java.sql.SQLException e) {
      System.out.println("A problem occurred while connecting to the database.");
      System.out.println(e.toString());
    }

  }

  public void doGet(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    /* Forward to doPost method */
    doPost(_req, _res);
  }

  public void doPost(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {

    /* Wrap request object with helper */
    ReqUtility reqUtil = new ReqUtility(_req);

    /* Create an Action object based on request parameters */
    Action action = reqUtil.getAction();

    /* Pass the database connection to the action */
    action.setDatabase(dbCon);

    /* Execute business logic */
    if (action.execute(_req, _res)) {

      /* Get appropriate view for action */
      String view = action.getView();

      /* Add the model to the request attributes */
      _req.setAttribute("model", action.getModel());

      /* Forward the request to the given view */
      RequestDispatcher dispatcher = _req.getRequestDispatcher(view);
      dispatcher.forward(_req, _res);

    }

  }

  public void destroy()
  {
    /* Clean up shared resources */

    try {
      dbCon.close();
    }
    catch (java.sql.SQLException e) {
      System.out.println("A problem occurred while closing the database.");
      System.out.println(e.toString());
    }

  }

}