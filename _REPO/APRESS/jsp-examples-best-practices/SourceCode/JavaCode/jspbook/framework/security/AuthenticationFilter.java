package jspbook.framework.security;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

import jspbook.framework.logging.Logger;
import jspbook.framework.db.DBHelper;

/**
 * Filter to handle user authentication
 *
 * <p>Intercepts requests and validates users.
 * If the user is coming from the login page,
 * the filter attempts to authenticate the
 * user. If the user comes from somewhere else,
 * then the filter will check the session object
 * and validate that the user has already logged in.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class AuthenticationFilter implements Filter {

  /**
   * Static variable used to resolve the login page
   */
  private static final String LOGIN_PAGE = "login.jsp";
  /**
   * Stores the Filter Configuration
   */
  private FilterConfig config =  null;

  /**
   * Called when Filter is put into service.
   */
  public void init(FilterConfig _config)
    throws ServletException
  {
    this.config = _config;
  }

  /**
   * Execution code for the filter.
   */
  public void doFilter(ServletRequest _req, ServletResponse _res,
    FilterChain _chain) throws IOException, ServletException
  {
    boolean success = true;

    /* Cast _req to HttpServletRequest and get a session */
    HttpServletRequest httpReq = (HttpServletRequest) _req; 
    HttpSession session = httpReq.getSession();

    /* Get the pageId from the request parameters */
    String pageId = (String) httpReq.getParameter("pageId");
    if (pageId  == null) {
      success = false;
    }

    /* Get uid and pwd from request parameters */
    String req_uid = (String) httpReq.getParameter("uid");
    String req_pwd = (String) httpReq.getParameter("pwd");

    /* If coming from login page, authenticate */
    if (pageId.equals("loginPage")) {
      if (authenticate(req_uid, req_pwd)) {
        session.setAttribute("validLogin", "true"); 
      }
      else {
        success = false;
      }
    }
    else {
      String loggedIn = (String) session.getAttribute("validLogin");
      if (loggedIn == null) {
        success = false;
      }
    }

    /* If login failed, set attribute in the request and forward to login page */
    if (!success) {
      _req.setAttribute("loginStatus", "failed");
      RequestDispatcher rd = httpReq.getRequestDispatcher(LOGIN_PAGE);
      rd.forward(_req, _res);
    }

    /* Continue with filter chain */
    _chain.doFilter(_req, _res);
  }

  /**
   * Check if the user is valid
   */
  private boolean authenticate(String _uid, String _pwd)
  {
    Connection dbCon = null;
    ResultSet rs = null;

    /* Get db connection, then validate user */
    try {
      dbCon = DBHelper.getConnection();
      Statement s = dbCon.createStatement();
      rs = s.executeQuery("select * from user where uid = '"
              + _uid + "' and pwd = '" + _pwd + "'");
      return (rs.next());
    }
    catch (java.sql.SQLException e) {
      Logger.log(Logger.ERROR, "A problem occurred while accessing the database.");
      Logger.log(Logger.ERROR, e.toString());
    }
    finally {
      /* Close database connection */
      try {
        dbCon.close();
      }
      catch (java.sql.SQLException e) {
        Logger.log(Logger.ERROR, "A problem occurred while closing the database.");
        Logger.log(Logger.ERROR, e.toString());
      }
    }
    return false;

  }

  /**
   * Reset the Filter configuration.
   */
  public void destroy()
  {
    config = null;
  }

}
