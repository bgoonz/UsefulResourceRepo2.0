package jspbook.ch8;

import java.io.*;

public class FormattingModel implements Serializable {

  private String dateValue;
  private String currencyValue;

  public FormattingModel () {}

  /* Accessor Methods */
  public void setDateValue (String _date)
  {
    this.dateValue = _date;
  }

  public String getDateValue ()
  {
    return this.dateValue;
  }

  public void setCurrencyValue (String _currency)
  {
    this.currencyValue = _currency;
  }

  public String getCurrencyValue ()
  {
    return this.currencyValue;
  }

  }