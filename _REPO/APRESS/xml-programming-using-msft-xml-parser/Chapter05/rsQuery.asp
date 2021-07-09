<!-- rsQuery.asp -->
<!--#include file="adovbs.inc"-->
<html>
<h3>Books for Programmers</h3>
<% 
   Dim conn
   Dim rs 
   Set conn = Server.CreateObject ("ADODB.Connection")
   Set rs = Server.CreateObject ("ADODB.Recordset")
   query = "SELECT ISBN, Title FROM books WHERE Title LIKE '%Programmer%'"

   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "uid=sa;password=" 
   rs.Open query, conn, adOpenForwardOnly, adLockOptimistic, adCmdText

   while not rs.EOF 
      Response.Write rs("ISBN") & "  " & rs("Title")
      rs.MoveNext
   wend
   rs.Close
   conn.Close
%>
</html>
