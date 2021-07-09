<!-- connExe.asp -->
<!--#include file="adovbs.inc"-->
<html>
<h3>Execute Method of the Connection Object</h3>
<% 
   Dim conn
   Dim rs 
   Set conn = Server.CreateObject ("ADODB.Connection")
   query = "UPDATE books SET Price='35.0' WHERE ISBN='1-893115-86-0'"
   
   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "uid=sa;password=" 
   Set rs = conn.Execute ("books", , adCmdTable)
   conn.Execute (query, , adCmdText)
%>
</html>
