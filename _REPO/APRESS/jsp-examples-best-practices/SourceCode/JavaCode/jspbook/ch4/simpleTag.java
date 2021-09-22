package jspbook.ch4;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;
import java.io.IOException;

public class simpleTag extends TagSupport {

  /* Tag Attributes */
  protected String color = "#000000";
  protected String message = "Hello World!";

  /* Process Start Tag */
  public int doStartTag() throws JspTagException {
    try {
      JspWriter out = pageContext.getOut();
      out.println("<font color=\"" + color + "\">");
      out.println(message);
      out.println("</font>");
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

  /* Attribute Accessor Methods */
  public String getColor() {
    return color;
  }

  public void setColor(String _color) {
    color = _color;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String _message) {
    message = _message;
  }
}