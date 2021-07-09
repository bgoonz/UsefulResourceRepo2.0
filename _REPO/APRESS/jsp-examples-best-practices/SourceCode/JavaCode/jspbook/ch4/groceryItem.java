package jspbook.ch4;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;
import java.util.*;
import java.io.*;
import java.text.*;

public class groceryItem extends BodyTagSupport {

  public int doAfterBody()
    throws JspException
  {
    int qty = 0;
    String desc = "";
    float price = 0.00f;
    float lineTotal = 0.00f;

    /* Get Body Content and Enclosing JSP Writer */
    BodyContent body = getBodyContent();
    JspWriter out = body.getEnclosingWriter();

    // Parse line into data fields
    String line = body.getString();
    StringTokenizer st = new StringTokenizer(line, ",");

    qty = Integer.parseInt(st.nextToken());
    desc = st.nextToken();
    price = Float.parseFloat(st.nextToken());

    // Calculate line item total
    lineTotal = qty * price;

    // Get parent tag and invoke method to update order total
    groceryOrder order = (groceryOrder) findAncestorWithClass(this, groceryOrder.class);
    order.updateTotal(lineTotal);

    // Output line as CSV row including lineTotal
    try {
      String priceFmt = NumberFormat.getCurrencyInstance().format(Double.parseDouble(String.valueOf(price)));
      String totalFmt = NumberFormat.getCurrencyInstance().format(Double.parseDouble(String.valueOf(lineTotal)));
      out.println(qty + "," + desc + "," + priceFmt + "," + totalFmt);
    }
    catch (IOException e) {
      throw new JspTagException(e.toString());
    }

    return SKIP_BODY;
  }

}