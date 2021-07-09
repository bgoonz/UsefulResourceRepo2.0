<!-- rsInsert.asp -->
<!--#include file="adovbs.inc"-->
<html>
<h3>Adding New Book to Catalog</h3>
<% 
   Dim conn
   Dim rs 
   Set conn = Server.CreateObject ("ADODB.Connection")
   Set rs = Server.CreateObject ("ADODB.Recordset")

   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "uid=sa;password=" 
   rs.Open "books", conn, adOpenForwardOnly, adLockOptimistic, adCmdTable
   rs.Addnew
      rs("ISBN") = "1-893115-81-X"
      rs("Title") = "SQL Server: Common Problems, Tested Solutions"
      rs("Price") = "39.95"
      rs("CoverType") = "S"
      rs("Pages") = "598"
   rs.Update
   rs.Close
   conn.Close
%>
</html>
