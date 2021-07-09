package jspbook.framework.request;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

/**
 * Interface for Action objects
 *
 * <p>This interface is used to provide a generic
 * interface to Action objects, which are used to
 * implement a request action.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public interface Action {

  /**
   * Set local database connection
   */
  public void setDatabase(Connection _db);

  /**
   * Execute business logic
   */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException;

  /**
   * Return the page name (and path) to display the view
   */
  public String getView();

  /**
   * Return a JavaBean containing the model (data)
   */
  public Object getModel();

}
