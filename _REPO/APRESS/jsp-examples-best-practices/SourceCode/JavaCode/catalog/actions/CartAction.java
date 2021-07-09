package catalog.actions;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;

import jspbook.framework.request.*;
import jspbook.framework.logging.*;
import catalog.beans.CartBean;

/**
 * Cart Action class to manage a shopping cart
 *
 * <p>Allows a user to view a cart, add items
 * to a cart, or remove an item from the cart.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class CartAction implements Action {

  /**
   *  Name of the page used to present the cart screen
   */
  private String view;

  /**
   *  Database connection object
   */
  private Connection dbCon;

  /**
   *  JavaBean representing the shopping cart
   */
  private CartBean cBean;

  /**
   *  No-args constructor
   */
  public CartAction() {}

  /**
   *  Sets the database connection
   */
  public void setDatabase(Connection _db)
  {
    dbCon = _db;
  }

  /**
   *  Execute the business logic.
   */
  public boolean execute(HttpServletRequest _req, HttpServletResponse _res)
    throws ServletException, IOException
  {
    /* Retrieve cBean from session, if it exists */
    HttpSession session = _req.getSession();
    cBean = (CartBean) session.getValue("cart");
    if (cBean == null) {
      cBean = new CartBean();
    }
    
    /* Perform action */
    String action = _req.getParameter("action");
    String prodid = _req.getParameter("prodid");
    String prodname = _req.getParameter("prodname");
    String price = _req.getParameter("price");
    
    if (action.equals("add")) {
      cBean.add(prodid, prodname, price);
    }

    if (action.equals("remove")) {
      cBean.remove(prodid);
    }
    
    /* Write cBean back to session */
    session.putValue("cart", cBean);
    
    /* Set the view */
    view = "cart.jsp";

    return true;
  }

  /**
   *  Return the name of the page used to display the data.
   */
  public String getView()
  {
    return view;
  }

  /**
   *  Return a JavaBean containing the model (data).
   */
  public Object getModel()
  {
    return cBean;
  }

}
