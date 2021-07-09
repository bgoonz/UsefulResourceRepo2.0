package jspbook.util;

import junit.framework.*;

import java.net.*;
import java.io.*;

public class TestFramework extends TestCase {

  public TestFramework (String name)
  {
    super(name);
  }

  /**
   * Sets up the test fixture.
   * (Called before every test case method.)
   */
  protected void setUp () {}

  /**
   * Tears down the test fixture.
   * (Called after every test case method.)
   */
  protected void tearDown () {}

  /**
   * Tests the login action of the application
   */
  public void testLoginAction ()
  {
    String action = "login";
    String UID = "apatzer";
    String PWD = "apress";

    String response = "";

    StringBuffer servletName = new StringBuffer();
    servletName.append("http://localhost:8080/jspBook/ch7/Controller");
    servletName.append("?action=").append(action);
    servletName.append("&UID=").append(UID);
    servletName.append("&PWD=").append(PWD);

    try {
      URL url = new URL(servletName.toString());
      BufferedReader out = new BufferedReader(
        new InputStreamReader(url.openStream()));
      String line;
      while ( (line = out.readLine()) != null) {
        response += line;
      }
      out.close();
    }
    catch (Exception e) {
      System.out.println(e.toString());
    }

    /* If response page is the login page, then an error occurred */
    assertTrue((response.indexOf("action=login")) <= 0);

  }

  public static Test suite ()
  {
    TestSuite suite = new TestSuite(TestFramework.class);
    return suite;
  }

  public static void main(String args[])
  {
    junit.textui.TestRunner.run(suite());
  }

}