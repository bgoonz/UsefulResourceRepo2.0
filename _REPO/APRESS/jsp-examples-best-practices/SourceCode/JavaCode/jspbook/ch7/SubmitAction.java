package jspbook.ch7;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

import jspbook.ch7.CustomerBean;

public class SubmitAction implements Action {

  private String view;
  private Connection dbCon;
  private String status;

  public SubmitAction() {}

  /* Set Database Connection */
  public void setDatabase(Connection _db)
  {
    dbCon = _db;
  }

  /* Execute business logic */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    /* Submit Survey Data */
    if (recordSurvey(_req)) {
      status = "success";
      view = "/WEB-INF/jsp/ch7/thankyou.jsp";
    }
    else {
      status = "failed";
      view = "/WEB-INF/jsp/ch7/census.jsp";
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
    /* Return the status of the action */
    CustomerBean cBean = new CustomerBean();
    cBean.setSubmitStatus(status);
    return cBean;
  }

  /* Using the CustomerBean, record the data */
  public boolean recordSurvey(HttpServletRequest _req)
  {
    CustomerBean cBean = new CustomerBean();
    cBean.populateFromParms(_req);
    return cBean.submit(dbCon);
  }

}