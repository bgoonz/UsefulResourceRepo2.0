package catalog.ui.tags;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;
import java.io.IOException;
import java.text.*;

import jspbook.framework.logging.Logger;

/**
 * Custom Tag Extension representing a catalog item
 *
 * <p>Outputs a table row representing an item
 * in a catalog.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class CatalogItem extends TagSupport 
{

  /**
   *  Product ID
   */
  protected String prodid;
  /**
   *  Product Name
   */
  protected String prodname;
  /**
   *  Product Price
   */
  protected String price;
  /**
   *  Product Description
   */
  protected String proddesc;

  /**
   *  Processes the tag, outputting a formatted
   *  catalog item.
   */
  public int doStartTag() throws JspTagException {
    try {
      JspWriter out = pageContext.getOut();
      out.println("<table width='500' border='0'>");
      out.println(printRow(1));
      out.println(printRow(2));
      out.println(printRow(3));
      out.println("</table>");
    }
    catch (IOException e) {
      Logger.log(Logger.ERROR, e.toString());
      throw new JspTagException(e.toString());
    }
    return SKIP_BODY;
  }

  /**
   *  Processes the end tag.
   */
  public int doEndTag() throws JspTagException {
    return EVAL_PAGE;
  }

  /**
   *  Prints a single row of the catalog item.
   */
  public String printRow(int _row)
  {
    String col1 = "";
    String col2 = "";
    String col3 = "";
    
    StringBuffer htmlRow = new StringBuffer();
    
    switch (_row) {
      case 1:
	col1 = "Product:";
        col2 = prodname;
        col3 = "";
        break;
      case 2:
        col1 = "Price:";
        
	/* Format price */
        float f = Float.parseFloat(price);
        DecimalFormat dcf = (DecimalFormat) NumberFormat.getCurrencyInstance();
        col2 = dcf.format(f);
	
        col3 = "";
        break;
      case 3:
        col1 = "Description:";
        col2 = proddesc;
	/* Build link to cart action */
	StringBuffer tmpStr = new StringBuffer();
	tmpStr.append("<a href='Controller?");
	tmpStr.append("action=add&");
	tmpStr.append("prodid=").append(prodid).append("&");
	tmpStr.append("prodname=").append(prodname).append("&");
	tmpStr.append("price=").append(price).append("&");
	tmpStr.append("pageId=home&");
	tmpStr.append("actionClass=catalog.actions.CartAction'>");
	tmpStr.append("<img src='images/addtocart.gif' border='0'></a>");
        col3 = tmpStr.toString();
        break;
    }
    
    htmlRow.append("<tr>");

    /* Column 1 */
    htmlRow.append("<td width='150' align='right' valign='top'>");
    htmlRow.append("<b><font face='Arial, Helvetica, sans-serif' size='2'>");
    htmlRow.append(col1);
    htmlRow.append("</font></b></td>");

    /* Column 2 */
    htmlRow.append("<td width='200' valign='top'>");
    htmlRow.append("<font face='Arial, Helvetica, sans-serif' size='2'>");
    htmlRow.append(col2);
    htmlRow.append("</font></td>");
    
    /* Column 2 */
    htmlRow.append("<td width='116' valign='top'>");
    htmlRow.append(col3);
    htmlRow.append("</td>");

    htmlRow.append("</tr>");
    
    return htmlRow.toString();
  }
  
  /**
   *  Setter method for Product ID
   */
  public String getProdid() {return prodid;}
  /**
   *  Getter method for Product ID
   */
  public void setProdid(String _prodid) {prodid = _prodid;}

  /**
   *  Setter method for Product Name
   */
  public String getProdname() {return prodname;}
  /**
   *  Getter method for Product Name
   */
  public void setProdname(String _prodname) {prodname = _prodname;}

  /**
   *  Setter method for Product Price
   */
  public String getPrice() {return price;}
  /**
   *  Getter method for Product Price
   */
  public void setPrice(String _price) {price = _price;}

  /**
   *  Setter method for Product Description
   */
  public String getProddesc() {return proddesc;}
  /**
   *  Getter method for Product Description
   */
  public void setProddesc(String _proddesc) {proddesc = _proddesc;}

}
