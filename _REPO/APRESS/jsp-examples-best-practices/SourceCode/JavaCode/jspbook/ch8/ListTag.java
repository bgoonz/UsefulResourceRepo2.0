package jspbook.ch8;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

import java.io.*;
import java.util.*;

public class ListTag extends BodyTagSupport {

  /* Tag Attributes */
  protected int format;
  
  /* Static Constants */
  public final static int BULLET_ORB = 0;
  public final static int BULLET_PLUS = 1;
  public final static int BULLET_ARROW = 2;

  /* Process Tag Body */
  public int doAfterBody() throws JspTagException {
    try {
      BodyContent body = getBodyContent();
      JspWriter out = body.getEnclosingWriter();

      /* Parse records and output as formatted list */
      BufferedReader contentReader = new BufferedReader(body.getReader());
      String record = "";
      while ((record = contentReader.readLine()) != null) {
        if (record.trim().length() > 0) {
          out.println(formatListItem(record.trim()));
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

  private String formatListItem (String _input)
  {
    StringBuffer listItem = new StringBuffer();

    /* Double-space the list */
    listItem.append("<br><br>");
    switch (format) {
      case BULLET_ORB: {
        listItem.append("<img src='images/orb.gif'>");
	break;
      }
      case BULLET_PLUS: {
        listItem.append("<img src='images/plus.gif'>");
	break;
      }
      case BULLET_ARROW: {
        listItem.append("<img src='images/arrow.gif'>");
	break;
      }
    }
    listItem.append("  ").append(_input);

    return listItem.toString();
  }

  /* Attribute Accessor Methods */
  public int getFormat ()
  {
    return this.format;
  }

  public void setFormat (int _format)
  {
    this.format = _format;
  }

}
