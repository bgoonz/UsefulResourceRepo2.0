<!-- cmdExe.asp -->
<!--#include file="adovbs.inc"-->
<html>
<h3>Querying Books (<$40) from Catalog</h3>
<% 
   Dim conn
   Dim cmd
   Dim rs 
   Set conn = Server.CreateObject ("ADODB.Connection")
   Set cmd = Server.CreateObject ("ADODB.Command")
   Set rs = Server.CreateObject ("ADODB.Recordset")

   cmd.ActiveConnection = conn
   cmd.CommandText = "SELECT * FROM books WHERE Price < 40"
   cmd.CommandType = adCmdText

   Set rs = cmd.Execute 
   while not rs.EOF
      Response.write rs("Title") & "<br>"
      rs.MoveNext
   wend
%>
</html>
