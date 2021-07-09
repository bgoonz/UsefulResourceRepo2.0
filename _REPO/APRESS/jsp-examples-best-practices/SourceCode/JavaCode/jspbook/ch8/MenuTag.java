package jspbook.ch8;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

import java.io.*;
import java.util.*;

public class MenuTag extends BodyTagSupport {

  /* Process Tag Body */
  public int doAfterBody() throws JspTagException {
    try {
      BodyContent body = getBodyContent();
      JspWriter out = body.getEnclosingWriter();

      /* Parse records and output as list of hyperlinks */
      BufferedReader contentReader = new BufferedReader(body.getReader());
      String record = "";
      while ((record = contentReader.readLine()) != null) {
        StringTokenizer st = new StringTokenizer(record, ",");
        while (st.hasMoreTokens()) {
          String linkName = st.nextToken();
          String linkURL = st.nextToken();
          out.println("<a href='" + linkURL + "'>");
          out.println(linkName + "</a>");
          out.println("<br><br>");
        }
      }
    }
    catch (IOException e) {
      throw new JspTagException(e.toString());
    }
    return SKIP_BODY;
  }

  /* Process End Tag */
  public int doEndTag() throws JspTagException {
    return EVAL_PAGE;
  }

}