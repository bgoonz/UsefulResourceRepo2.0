package jspbook.ch7;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

public interface Action {

  /* Set Database Connection */
  public void setDatabase(Connection _db);

  /* Execute business logic */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException;

  /* Return the page name (and path) to display the view */
  public String getView();

  /* Return a JavaBean containing the model (data) */
  public Object getModel();

}