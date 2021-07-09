package jspbook.ch6;

import java.io.*;
import java.util.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class ResponseLoggingFilter implements Filter {

  private FilterConfig config =  null;
  private FileOutputStream fos;

  private static class ByteArrayServletStream extends ServletOutputStream
  {
    ByteArrayOutputStream baos;
    ByteArrayServletStream(ByteArrayOutputStream baos) {
      this.baos = baos;
    }
    public void write(int param) throws java.io.IOException {
      baos.write(param);
    }
    public String toString() {
      return baos.toString();
    }
  }

  private static class ByteArrayPrintWriter
  {
    private ByteArrayOutputStream baos = new ByteArrayOutputStream();
    private PrintWriter pw = new PrintWriter(baos);
    private ServletOutputStream sos = new ByteArrayServletStream(baos);

    public PrintWriter getWriter() {
      return pw;
    }
    public ServletOutputStream getStream() {
      return sos;
    }
    byte[] toByteArray() {
      return baos.toByteArray();
    }
  }

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

    /* Wrap the response object */
    final ByteArrayPrintWriter b = new ByteArrayPrintWriter();
    final HttpServletResponse HttpResp = (HttpServletResponse) _res;
    HttpServletResponse wrappedRes = new HttpServletResponseWrapper(HttpResp) {
      public PrintWriter getWriter() {
        return b.getWriter();
      }
      public ServletOutputStream getOutputStream() {
        return b.getStream();
      }
      public void setContentType(String type) {
        HttpResp.setContentType(type);
      }
    };

    /* Continue Processing */
    _chain.doFilter(_req, wrappedRes);

    /* Log the response content */
    StringBuffer log = new StringBuffer();
    log.append("*** HTTP Response: ").append(new Date()).append("***\n\n");
    String output = b.getStream().toString();
    log.append(output).append("\n\n");
    fos.write(log.toString().getBytes());

    /* Write content to browser */
    _res.setContentLength(output.length());
    _res.getWriter().print(output);
    _res.getWriter().close();
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

}