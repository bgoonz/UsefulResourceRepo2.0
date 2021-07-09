<%
	Dim rsCart 'as ADODB.Recordset
	Set rsCart = Server.CreateObject("ADODB.Recordset")
	Dim sqlCartInfo 'as String
	sqlCartInfo = "up_GetCurrentCartSummaryInformation " & Session.SessionID
	Set rsCart = dbConn.Execute(sqlCartInfo)
%>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td colspan="2">
			<a href="ShoppingCart.asp">Shopping Cart</A>| 
			<a href="CheckOut.asp">Check Out</A>
		</td>
	</tr>
<%
If rsCart.EOF and rsCart.BOF Then
%>
	<tr>
		<td colspan=2>
			<br>Your Cart is<br> currently Empty.</b>
		</td>
	</tr>
<%
Else
	Dim Total 'as double
	Total = 0
	Do While Not rsCart.EOF
		With Response
			.write("<tr><td>" & rsCart(1) & chr(32) & rsCart(0)  & "</td><td>" & FormatCurrency((rsCart(2))) & "</td></tr>")
		End With
		Total = Total + Cdbl(rsCart(2))
		rsCart.MoveNext
	Loop
	With Response
		.Write("<tr><td colspan=2><hr width=""80" & chr(37) & """></td></tr>")
		.Write("<tr><td>Subtotal</td><td>" & FormatCurrency(Total) & "</td></tr>")
	End With
End If
%>	
</table>