package jspbook.framework.ui.tags;

import javax.servlet.http.*;
import javax.servlet.jsp.*;
import javax.servlet.jsp.tagext.*;

import java.io.*;
import java.util.*;

import java.text.*;

import jspbook.framework.logging.Logger;

/**
 * JSP Tag that supports number formatting
 *
 * <p>The FormatTag is used to format a text
 * string into a valid Date, decimal, rounded,
 * or currency value. The format attribute is
 * set to a specific format and the body of the
 * tag is formatted accordingly.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class FormatTag extends BodyTagSupport {

  /** 
   * Locale object for internationalization of content
   */
  private Locale locale;

  /**
   * Tag attribute to format string
   */
  protected int format;

  /**
   * Static constant for date formatting
   */
  public final static int DATE_LONG = 0;

  /**
   * Static constant for number formatting
   */
  public final static int NUMERIC_DECIMAL = 1;

  /**
   * Static constant for number formatting
   */
  public final static int NUMERIC_ROUNDED = 2;

  /**
   * Static constant for currency formatting
   */
  public final static int NUMERIC_CURRENCY = 3;

  /**
   * Constructor. Assigns default locale to locale object.
   */
  public FormatTag() {
    locale = Locale.getDefault();
  }

  /**
   * Accessor method for the locale variable.
   */
  public void setLocale(Locale locale) {
    this.locale = locale;
  }

  /**
   * Process Tag Body
   */
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

  /**
   * Process End Tag
   */
  public int doEndTag() throws JspTagException {
    return EVAL_PAGE;
  }

  /**
   * Format text string into numeric format
   */
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

  /**
   * Attribute accessor method for format attribute
   */
  public int getFormat ()
  {
    return this.format;
  }

  /**
   * Attribute accessor method for format attribute
   */
  public void setFormat (int _format)
  {
    this.format = _format;
  }

}
