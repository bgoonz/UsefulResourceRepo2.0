package jspbook.ch8;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

import java.io.*;
import java.util.*;

import java.text.*;

public class FormatTag extends BodyTagSupport 
{
  /* Locale object for internationalization of content */
  private Locale locale;

  /* Tag Attributes */
  protected int format;

  /* Static Constants */
  public final static int DATE_LONG = 0;
  public final static int NUMERIC_DECIMAL = 1;
  public final static int NUMERIC_ROUNDED = 2;
  public final static int NUMERIC_CURRENCY = 3;

  public FormatTag() {
    locale = Locale.getDefault();
  }

  public void setLocale(Locale locale) {
    this.locale = locale;
  }

  /* Process Tag Body */
  public int doAfterBody() throws JspTagException {
    try {
      BodyContent body = getBodyContent();
      JspWriter out = body.getEnclosingWriter();

      /* Get Input Value */
      String textValue = body.getString().trim();

      /* Output Formatted Value */
      out.println(formatValue(textValue));
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

  private String formatValue (String _input)
  {
    String formattedValue = "";

    try {
      switch (format) {
        case DATE_LONG: {
          Calendar cal = Calendar.getInstance();
          cal.setTime(DateFormat.getDateInstance(DateFormat.SHORT).parse(_input));
          SimpleDateFormat df = new SimpleDateFormat("EEE, MMM d, yyyy");
          formattedValue = df.format(cal.getTime());
	  break;
        }
        case NUMERIC_DECIMAL: {
            DecimalFormat dcf = (DecimalFormat) NumberFormat.getInstance(locale);
	    dcf.setMinimumFractionDigits(2);
	    dcf.setMaximumFractionDigits(2);
	    formattedValue = dcf.format(dcf.parse(_input));
	  break;
        }
        case NUMERIC_ROUNDED: {
            DecimalFormat dcf = (DecimalFormat) NumberFormat.getInstance(locale);
	    dcf.setMinimumFractionDigits(0);
	    dcf.setMaximumFractionDigits(0);
	    formattedValue = dcf.format(dcf.parse(_input));
	  break;
        }
        case NUMERIC_CURRENCY: {
          float f = Float.parseFloat(_input);
          DecimalFormat dcf = (DecimalFormat) NumberFormat.getCurrencyInstance();
          formattedValue = dcf.format(f);
	  break;
        }
      }
    }
    catch (Exception e) {
      System.out.println(e.toString());
    }

    return formattedValue;
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
