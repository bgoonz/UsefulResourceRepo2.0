package jspbook.ch7;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class ReqUtility {

  HttpServletRequest request;

  public ReqUtility(HttpServletRequest _req)
    throws ServletException, IOException
  {
    request = _req;
  }

  public Action getAction()
  {
    /* Use factory to create action based on request parms */
    String action = (String) request.getParameter("action");
    return ActionFactory.createAction(action);
  }

}