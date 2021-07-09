package jspbook.framework.request;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

import jspbook.framework.db.DBHelper;
import jspbook.framework.logging.Logger;

/**
 * Controller servlet to process all application requests
 *
 * <p>This class is used to provide an access point into
 * the framework. It should be declared as a servlet in
 * the application's web.xml file and mapped appropriately.</p>
 * <p>The Controller servlet uses a request-handling framework
 * to process web requests using a set of Action classes. To define
 * a new Action class, simply implement the Action interface
 * and add an entry to the ActionFactory class.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class Controller extends HttpServlet {

  /**
   *  Shared database connection
   */
  private Connection dbCon;

  /**
   * Initialize shared resources
   */
  public void init()
  {
    dbCon = DBHelper.getConnection();
  }

  /**
   * Forward to doPost method
   */
  public void doGet(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    /* Forward to doPost method */
    doPost(_req, _res);
  }

  /**
   * Process request using Action class and ReqUtility
   */
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

  /**
   * Clean up shared resources
   */
  public void destroy()
  {
    try {
      dbCon.close();
    }
    catch (java.sql.SQLException e) {
      Logger.log(Logger.ERROR, "A problem occurred while closing the database.");
      Logger.log(Logger.ERROR, e.toString());
    }

  }

}
