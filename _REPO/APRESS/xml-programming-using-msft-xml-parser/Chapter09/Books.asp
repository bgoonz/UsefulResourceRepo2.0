<%
    Set xml = Server.CreateObject("MSXML2.DOMDocument")
    xml.async = false
    xml.load (Server.MapPath("Books.xml")) 
    Set xsl = Server.CreateObject("MSXML2.DOMDocument")
    xsl.async = false
    xsl.load (Server.MapPath("WML.xsl"))
    Response.ContentType = "text/vnd.wap.wml"
    Response.write (xml.transformNode(xsl))
%>

