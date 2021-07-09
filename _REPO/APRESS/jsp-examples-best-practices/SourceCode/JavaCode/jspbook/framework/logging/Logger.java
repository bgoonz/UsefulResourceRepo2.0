package jspbook.framework.logging;

import org.apache.log4j.*;
import java.io.IOException;

/**
 * Wrapper for Log4J logging utility
 *
 * <p>Wraps Log4J functionality</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class Logger
{

  /**
   * Static constant for DEBUG log level
   */
  public static final int DEBUG = 0;
  /**
   * Static constant for INFO log level
   */
  public static final int INFO = 1;
  /**
   * Static constant for WARN log level
   */
  public static final int WARN = 2;
  /**
   * Static constant for ERROR log level
   */
  public static final int ERROR = 3;
  /**
   * Static constant for FATAL log level
   */
  public static final int FATAL = 4;

  /**
   * Category to log messages to
   */
  public static Category cat = Category.getInstance("framework");

  static
  {
    try {
      BasicConfigurator.configure(new FileAppender(
        new SimpleLayout(), "c:\\log.txt"));
    }
    catch (IOException e) {
      System.out.println(e.toString());
    }
  }

  /**
   * Static method to log messages
   */
  public static void log(int _level, String _msg)
  {
    switch (_level) {
      case DEBUG:
        cat.debug(_msg);
        break;
      case INFO:
        cat.info(_msg);
        break;
      case WARN:
        cat.warn(_msg);
        break;
        case ERROR:
       cat.error(_msg);
        break;
      case FATAL:
        cat.fatal(_msg);
        break;
      default:
        cat.warn("Problem using Logger class"); 
    }
  } 
}
