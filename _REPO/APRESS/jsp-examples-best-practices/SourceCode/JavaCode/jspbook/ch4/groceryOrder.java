package jspbook.ch4;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;
import java.util.*;
import java.io.*;
import java.text.*;

public class groceryOrder extends BodyTagSupport {

  float orderTotal = 0.00f;

  public int doAfterBody()
    throws JspException
  {
    try {
      BodyContent body = getBodyContent();
      JspWriter out = body.getEnclosingWriter();

      out.println("<table>");

      out.println("<tr>");
      out.println("<td><b>Quantity</b></td>");
      out.println("<td><b>Description</b></td>");
      out.println("<td><b>Item Price</b></td>");
      out.println("<td><b>Item Total</b></td>");
      out.println("</tr>");

      // Parse records and output as HTML table
      BufferedReader contentReader = new BufferedReader(body.getReader());
      String record = "";
      while ((record = contentReader.readLine()) != null) {
        out.println("<tr>");
        StringTokenizer st = new StringTokenizer(record, ",");
        while (st.hasMoreTokens()) {
          out.println("<td>");
          out.println(st.nextToken());
          out.println("</td>");
        }
        out.println("</tr>");
      }

      out.println("</table>");

      // Display order total
      out.println("<br>");
      out.println("<b>Order Total: ");
      out.println(NumberFormat.getCurrencyInstance().format(Double.parseDouble(String.valueOf(orderTotal))));
      out.println("</b>");
    }
    catch (IOException e) {
      throw new JspTagException(e.toString());
    }

    return SKIP_BODY;
  }

  public void updateTotal(float lineTotal)
  {
    orderTotal += lineTotal;
  }

  public void release()
  {
    super.release();
    orderTotal = 0.00f;
  }

}