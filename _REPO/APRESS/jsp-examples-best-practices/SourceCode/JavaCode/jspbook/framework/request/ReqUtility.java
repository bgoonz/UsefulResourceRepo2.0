package jspbook.framework.request;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

/**
 * Request helper utility
 *
 * <p>Used simply to extract the 'Action'
 * parameter and then return the appropriate
 * Action class using the ActionFactory. This
 * class could be used to assist with any
 * request handling activity that can be
 * offloaded from the servlet.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class ReqUtility {

  /**
   * Local copy of request object.
   */
  HttpServletRequest request;

  /**
   * Constructor. Used to set local request object.
   */
  public ReqUtility(HttpServletRequest _req)
    throws ServletException, IOException
  {
    request = _req;
  }

  /**
   * Use factory to create action based on request parms
   */
  public Action getAction()
  {
    String action = (String) request.getParameter("actionClass");
    return ActionFactory.createAction(action);
  }

}
