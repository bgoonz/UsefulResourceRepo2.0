<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>

<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" colspan="2">
	  <!--Breadcrumb trail goes here-->
		<!--#include file="include\breadcrumb.asp"-->
	</td>
	<td bgcolor="#CCCCCC" align="right">
		<!--search goes here-->
		<!--#include file="include\search.asp"-->
      </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td valign="top" align="left" width="120" bgcolor="#CCCCCC"> 
	  <!--Navigation goes here -->
        <div class="tunein"> 
			TuneIn!<br>
			<hr width="80" align="center" noshade>
		</div>
        <!-- navigation goes here-->
		<!--#include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
		<h1>Shopping Cart</h1>
<%
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	Dim ItemsSubTotal 'as integer
	Dim ItemsTotal    'as integer
	Dim TypeSubTotal 'as Double
	Dim CartTotal		'as Double
	Dim boolPrintMe   'as Boolean
	Dim boolPrintMe2   'as Boolean
	
	If Request.Form("Change") = "Change" Then
		sqlQuery = "up_UpdateCartItem " & Request.Form("Quantity") & "," & Request.Form("CartID")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF AND rs.BOF Then
			HTMLString = HTMLString & "<h2>Cart Update Failed</h2>"
		Else
			HTMLString = HTMLString & "<h2>Quantity Changed - Cart Updated</h2>"
		End If
	ElseIf Request.Form("Delete") = "Delete" Then
		sqlQuery = "up_DeleteCartItem " & Request.Form("CartID")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF AND rs.BOF Then
			HTMLString = HTMLString & "<h2>Quantity Changed - Cart Updated</h2>"
		Else
			HTMLString = HTMLString & "<h2>Cart Update Failed</h2>"
		End If
	End IF
	
	boolPrintMe = True
	boolPrintMe2 = False
	sqlQuery = "up_GetCurrentCartInformation " & Session.SessionID
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString = "An Error Occurred"
	Else
		HTMLString = HTMLString & "<table width=""99" & chr(37) & """ cellspacing=0 cellpadding=0>" & vbcrlf
		HTMLString = HTMLString & "<th>Quantity</th><th>Description</th><th>Unit Price</th><th>Amount</th>"
		Do While Not rs.Eof
			If Cint(rs("ItemTypeID")) = 1 and not boolPrintme Then
				boolPrintMe = true
			End IF
			If Cint(rs("ItemTypeID")) = 2 AND boolPrintMe = true Then
				HTMLString = HTMLString & "<tr><td colspan=2>Music Subtotals</td><td>Items: " & ItemsSubTotal & "</td>" & vbcrlf
				HTMLString = HTMLString & "<td>" & FormatCurrency(TypeSubTotal,2) & "</td></tr>" & vbcrlf
				ItemsSubTotal = 0
				TypeSubTotal = 0
				boolPrintMe = False
				boolPrintMe2 = true
			End If
			HTMLString = HTMLString & "<tr><td>" & vbcrlf
			HTMLString = HTMLString & "<form action=""ShoppingCart.asp"" method=""POST"" onsubmit=""return confirm('Are you sure you want to '+button+' this item?');"">" & vbcrlf
			HTMLString = HTMLString & "<input size=2 type=""hidden"" Name=""CartID"" value=""" & rs("CartID") & """>" & vbcrlf
			HTMLString = HTMLString & "<input size=2 type=""text"" name=""Quantity"" value=""" & rs("quantity") & """>" & vbcrlf
			HTMLString = HTMLString & "<input type=""Submit"" value=""Change"" Name=""Change"" onclick=""button='change';"">" & vbcrlf
			HTMLString = HTMLString & "<input type=""Submit"" value=""Delete"" Name=""Delete"" onclick=""button='delete';"">" & vbcrlf
			HTMLString = HTMLString & "</form></td><td>" & rs("itemdescription") & "</td>" & vbcrlf
			HTMLString = HTMLString & "<td>" & rs("ProductPrice") & "</td><td>" & FormatCurrency(rs("amount"),2) & "</td></tr>" & vbcrlf
			ItemsSubTotal = ItemsSubTotal + rs("Quantity")
			ItemsTotal = ItemsTotal + rs("Quantity")
			TypeSubTotal = TypeSubTotal + CDbl(rs("amount"))
			CartTotal = CartTotal + CDbl(rs("amount"))
			rs.MoveNext
		Loop
		If boolPrintMe2 = true Then
			HTMLString = HTMLString & "<tr><td colspan=2>Shows Subtotals</td><td>Items: " & ItemsSubTotal & "</td>" & vbcrlf
			HTMLString = HTMLString & "<td>" & FormatCurrency(TypeSubTotal,2) & "</td></tr>" & vbcrlf
		End If
		HTMLString = HTMLString & "<tr><td colspan=2>Grand Total</td><td>Items: " & ItemsTotal & "</td>" & vbcrlf
		HTMLString = HTMLString & "<td>" & FormatCurrency(CartTotal,2) & "</td></tr>" & vbcrlf
		HTMLString = HTMLString & "</table>" & vbcrlf
		HTMLString = HTMLString & "<a href=""CheckOut.asp"">--&gt; Proceed to Checkout --&gt;</a>"
	End IF	
		Response.Write(HTMLString)
	Set rs = Nothing

%>		
    </td>
      <td valign="top" align="right" width=200> 
        <table border="1" cellspacing="0" cellpadding="0">
          <tr> 
            <td bgcolor="#CCCCCC"> 
			<!-- Shopping Cart Include Goes Here -->
            <!-- #include file="include\cartinfo.asp" -->  
        </td>
      </tr>
    </table>
	</td>
	</tr>
	</table>

</body>
</html>
<!-- include virtual="include/deconfig.asp" -->