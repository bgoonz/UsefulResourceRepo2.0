package jspbook.framework.db;

import javax.naming.*;
import javax.sql.*;

import java.sql.*;

import jspbook.framework.logging.Logger;
import jspbook.framework.util.AppConstants;

/**
 * Database helper object
 *
 * <p>Manages database connections by using a 
 * single DataSource object to provide Connection
 * objects to calling classes. This allows the 
 * application server to manage the connections
 * in a connection pool.</p>
 *
 * @version 1.0
 * @author  Andrew Patzer
 * @since   JDK 1.3
 */

public class DBHelper
{

  /**
   * Reference to a JNDI DataSource
   */
  private static DataSource ds;

  private static Context initCtx;
  private static Context envCtx;

  private static String dbName = AppConstants.getProperty("dbName");
  
  /**
   * Using the DataSource object, gets a
   * database connection from the pool.
   */
  public static Connection getConnection()
  {
    if (ds == null) {
      try {
        initCtx = new InitialContext();
        envCtx = (Context) initCtx.lookup("java:comp/env");
        ds = (DataSource) envCtx.lookup(dbName);
      }
      catch (javax.naming.NamingException e) {
        Logger.log(Logger.ERROR, "A problem occurred while retrieving a DataSource object");
        Logger.log(Logger.ERROR, e.toString());
      }
    }

    Connection dbCon = null;
    try {
      dbCon = ds.getConnection();
    }
    catch (java.sql.SQLException e) {
      Logger.log(Logger.ERROR, "A problem occurred while connecting to the database.");
      Logger.log(Logger.ERROR, e.toString());
    }
    return dbCon;
  }
}
