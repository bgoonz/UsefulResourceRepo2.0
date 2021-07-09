<%
   Set xml = Server.CreateObject("MSXML2.DOMDocument")
   xml.async = false
   xml.load (Server.MapPath("Books.xml"))
   Set xsl = Server.CreateObject("MSXML2.DOMDocument")
   xsl.async = false

   if InStr(Request.ServerVariables("http_user_agent"),"Mozilla") then
      xsl.load (Server.MapPath("HTML.xsl"))
   else
      xsl.load (Server.MapPath("WML.xsl"))
      Response.ContentType = "text/vnd.wap.wml"
   end if
   Response.write (xml.transformNode(xsl))
%>
