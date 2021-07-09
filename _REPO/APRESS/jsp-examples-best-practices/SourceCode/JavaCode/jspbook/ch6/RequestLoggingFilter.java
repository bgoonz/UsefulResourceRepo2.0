package jspbook.ch6;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class RequestLoggingFilter implements Filter {

  private FilterConfig config =  null;
  private FileOutputStream fos;

  public void init(FilterConfig _config)
    throws ServletException
  {
    this.config = _config;
    try {
      /* Timestamp log file */
      File f = new File("c:\\development\\tomcat_" + new Date().getTime() + ".log");
      fos = new FileOutputStream(f);
    }
    catch (FileNotFoundException e) {
      System.out.println("Error opening log file.");
      System.out.println(e.toString());
    }
  }

  public void doFilter(ServletRequest _req, ServletResponse _res,
    FilterChain _chain) throws IOException, ServletException
  {
    /* Log HTTP form parameters */
    if (_req instanceof HttpServletRequest) {
      String log = getParms((HttpServletRequest)_req);
      fos.write(log.getBytes());
    }

    /* Continue with filter chain */
    _chain.doFilter(_req, _res);
  }

  public void destroy()
  {
    config = null;
    try {
      fos.close();
    }
    catch (IOException e) {
      System.out.println("Error closing log file.");
      System.out.println(e.toString());
    }
  }

  private String getParms(HttpServletRequest _req)
    throws ServletException
  {
    StringBuffer log = new StringBuffer();

    /* Get Http Parms */
    log.append("HTTP Request: ");
    log.append(new Date());
    log.append(":\n\n");

    log.append("Remote Address: " + _req.getRemoteAddr() + "\n");
    log.append("Remote Host: " + _req.getRemoteHost() + "\n\n");

    Enumeration e = _req.getParameterNames();
    while (e.hasMoreElements()) {
      String key = (String)e.nextElement();
      String[] values = _req.getParameterValues(key);
      log.append(key + " = ");
      for(int i = 0; i < values.length; i++) {
          log.append(values[i] + " ");
      }
      log.append("\n");
    }

    return log.toString();
  }

}