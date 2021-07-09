package catalog.actions;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

import jspbook.framework.request.*;
import jspbook.framework.logging.*;
import catalog.beans.CatalogBean;

/**
 * Home action class used to display the home page of the catalog
 *
 * <p>Retrieves a list of catalog items, populates
 * a JavaBean, and returns the name of the page
 * to display the catalog.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class HomeAction implements Action 
{

  /**
   *  Page to use to display data
   */
  private String view;
  /**
   *  Database connection
   */
  private Connection dbCon;
  /**
   *  JavaBean used to represent catalog items
   */
  private CatalogBean cBean;

  /**
   *  No-arg constructor used to initialize the JavaBean.
   */
  public HomeAction()
  {
    cBean = new CatalogBean();
  }

  /**
   *  Sets the database connection.
   */
  public void setDatabase(Connection _db)
  {
    dbCon = _db;
  }

  /**
   *  Retrieves the catalog items and populates JavaBean.
   */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    /* Retrieve list of catalog items and store in JavaBean */

    ResultSet rs = null;
    try {
      Statement s = dbCon.createStatement();
      rs = s.executeQuery("select * from product");
    }
    catch (SQLException e) {
      Logger.log(Logger.ERROR, "Error retrieving catalog items: " + e.toString());
    }

    cBean.populate(rs);

    /* Set the view */
    view = "home.jsp";

    return true;
  }

  /**
   *  Returns the page name used to display the view.
   */
  public String getView()
  {
    return view;
  }

  /**
   *  Returns a JavaBean containing the data necessary to display the view.
   */
  public Object getModel()
  {
    return cBean;
  }

}
