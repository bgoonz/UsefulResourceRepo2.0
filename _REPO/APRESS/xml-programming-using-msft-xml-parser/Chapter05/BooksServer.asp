<!--#include file="adovbs.inc"-->
<%
   Response.Expires = 0
   Dim conn
   Dim rs
   
   Set conn = Server.CreateObject("ADODB.Connection")
   Set rs = Server.CreateObject("ADODB.Recordset")

   conn.Open "Provider=SQLOLEDB;Server=dataServer;Database=BooksCatalog;" &_
             "User ID=sa;Password=;" 

   if Request.QueryString("req") = "getBooks" then
      'Retrieves books
      sql =  "SELECT ISBN, Price FROM books WHERE Price > 40"
      rs.ActiveConnection = conn
      rs.CursorLocation = adUseClient     
      rs.CursorType = adOpenStatic       
      rs.LockType = adLockBatchOptimistic 
      rs.Open sql
      rs.Save response, adPersistXML
      rs.Close
   else
      'Updates prices
      rs.Open Request
      On Error Resume Next
      rs.Activeconnection = conn 
      rs.Updatebatch 
      rs.Close
      if conn.Errors.Count = 0 then
         Response.Write "Prices of books updated!" 
      else
         Response.Write "Problems encountered in price update!"
      end if
   end if
   conn.Close
%>
