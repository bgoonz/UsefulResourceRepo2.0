package jspbook.ch4;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;
import java.util.*;
import java.io.*;

public class HtmlUtils extends BodyTagSupport{

  public int doAfterBody()
    throws JspException
  {
    try {
      boolean altRow = false;
      String record = "";

      /* Get Body Content and Enclosing JSP Writer */
      BodyContent body = getBodyContent();
      JspWriter out = body.getEnclosingWriter();

      out.println("<center>");
      out.println("<table>");

      /* Get body content as a reader and process each line individually */
      BufferedReader contentReader = new BufferedReader(body.getReader());
      while ((record = contentReader.readLine()) != null) {
        /* Alternate row colors */
        out.println("<tr bgcolor='" + ((altRow = !altRow) ? "#FFFFFF" : "#c0c0c0") + "'>");
        /* Break the record into an array */
        StringTokenizer st = new StringTokenizer(record, ",");
        while (st.hasMoreTokens()) {
          out.println("<td>");
          out.println(st.nextToken());
          out.println("</td>");
        }
        out.println("</tr>");
      }

      out.println("</table>");
      out.println("</center>");
    }
    catch (IOException e) {
      throw new JspTagException(e.toString());
    }

    return SKIP_BODY;
  }

}