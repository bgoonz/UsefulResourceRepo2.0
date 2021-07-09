package jspbook.framework.util;

import java.util.Properties;
import java.io.*;

import jspbook.framework.logging.Logger;

/**
 * Application Constants
 *
 * <p>Reads in application constants from a property
 * file and loads them into a java.util.Properties
 * object.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class AppConstants 
{
  private static Properties appProps;
  
  public static String getProperty(String _property)
  {
    if (appProps == null) {
      try {
	appProps = new Properties();
        appProps.load(new FileInputStream(new File(
	  System.getProperty("prop.file.dir"), "app.props")));
      }
      catch (IOException e) {
        Logger.log(Logger.ERROR, e.toString());
      }
    }
    return appProps.getProperty(_property);
  }
}
