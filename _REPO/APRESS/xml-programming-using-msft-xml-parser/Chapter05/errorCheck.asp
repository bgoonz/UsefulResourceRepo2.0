<!-- errorCheck.asp -->
<!--#include file="adovbs.inc"-->
<%
   Dim conn
   Dim rs
   Set conn = Server.CreateObject("ADODB.Connection")
   Set rs = Server.CreateObject("ADODB.Recordset")

   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "User ID=sa;Password=;" 
   sql =  "SELECT Titl FROM books"

   On Error Resume Next   
   Set rs = conn.Execute (sql)

   if conn.Errors.Count <> 0 then
      Response.write conn.Error.Count & " Errors:" & "<br>"
      for each e in conn.Errors
         Response.write "&nbsp;&nbsp;&nbsp;- [" & e. NativeError & "] " &_
                         e.Description & "<br>"
      next
   else
      while not rs.EOF
         Response.write rs("Title") & "<br>"
         rs.MoveNext
      wend
   end if
   rs.Close
   conn.Close
%>
