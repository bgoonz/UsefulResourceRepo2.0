package jspbook.ch8;

import java.io.*;
import java.util.*;

public class MenuModel implements Serializable {

  Hashtable links = new Hashtable();

  String list = "";

  public MenuModel()
  {
    /* Initialize model with sample values */
    links.put("Fold-away Keyboard", "/Controller?action=display&item=101");
    links.put("Standard Leather Case", "/Controller?action=display&item=102");
    links.put("Deluxe 3-pocket Case", "/Controller?action=display&item=103");
    links.put("Travel Cable", "/Controller?action=display&item=104");
    links.put("Stylus Pack", "/Controller?action=display&item=105");
    links.put("8MB Backup Module", "/Controller?action=display&item=106");
  }

  /* Accessor Methods */
  public void setList (String _list)
  {
    this.list = _list;
  }

  public String getList ()
  {
    StringBuffer csvList = new StringBuffer();

    /* Transform hash table into comma-separated list */
    Enumeration enum = links.keys();
    while (enum.hasMoreElements()) {
      String linkName = (String) enum.nextElement();
      String linkURL = (String) links.get(linkName);
      csvList.append(linkName).append(",").append(linkURL).append("\n");
    }

    return csvList.toString();
  }

}