<%
   '---Create an instance of the DOM object---
   Set xml = Server.CreateObject("MSXML2.DOMDocument")
   '---Let it run synchronously---
   xml.async = false
   '---Load the XML document---
   xml.load (Server.MapPath("Books.xml"))  
   Set xsl = Server.CreateObject("MSXML2.DOMDocument")
   xsl.async = false
   '---Load the XSLT stylesheet---
   xsl.load (Server.MapPath("HTML.xsl"))
   Response.write (xml.transformNode(xsl))
%>
