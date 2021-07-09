<% 
Response.ContentType = "text/html" 

'Create a new DOM object and load it from ASP's Request object
set docReceived = CreateObject("MSXML2.DOMDocument")
docReceived.async = false
docReceived.load Request

'Retrieve the userID 
Set idNode = docReceived.selectSingleNode("//@userID")
userid = idNode.nodeValue

'Retrieve the orders
Set orderNodes = docReceived.selectNodes("//ORDER")

if orderNodes.length < 2 then
   Response.write orderNodes.length & " order from " & userID
else
   Response.write orderNodes.length & " orders from " & userID
end if
%>
