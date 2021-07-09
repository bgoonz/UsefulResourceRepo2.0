<!-- rsDelete.asp -->
<!--#include file="adovbs.inc"-->
<html>
<h3>Deleting Book from Catalog</h3>
<% 
   Dim conn
   Dim rs 
   Set conn = Server.CreateObject ("ADODB.Connection")
   Set rs = Server.CreateObject ("ADODB.Recordset")
   query = "SELECT * FROM books WHERE ISBN='1-893115-81-X'"

   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "uid=sa;password=" 
   rs.Open query, conn, adOpenKeyset, adLockOptimistic, adCmdText
   rs.Delete adAffectCurrent 
   rs.Close
   conn.Close
%>
</html>
