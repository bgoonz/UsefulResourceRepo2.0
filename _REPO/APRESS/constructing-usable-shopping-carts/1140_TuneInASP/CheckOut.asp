<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Checkout Page </title>
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
		<!--navigation not used here......-->
		<!-- include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
<%
	Dim sqlQuery 'as String
	Dim sqlQuery2 'as String
	Dim rs 'as ADODB.Recordset
	Dim rs2 'as ADODB.Recordset
If Request.Form("Continue") = "Continue" Then
	Response.Redirect("Address.asp?ShippingTypeID=" & Request.Form("ShippingTypeID"))
	
ElseIf Request.Form("Submit") = "Submit" Then
	If len(Request.Form("ShippingSelected")) < 1 Then
		Response.Redirect("Checkout.asp?Error=NoShip")
	End IF
	sqlQuery = "up_GetSelectedShipping " & Request.Form("ShippingSelected")
	sqlQuery2 = "up_GetCartForShipping " & Session.sessionID & ", " & Request.Form("ShippingSelected")
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs2 = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	Set rs2 = dbConn.Execute(sqlQuery2)
	If (rs.EOF and rs.BOF) and (rs2.EOF and rs2.BOF) Then
		HTMLString="An Error Occurred"
	Else
		With Response
			.Write("<h2>Shipping Method You Chose: " & rs("ShippingTypeDescription") & "</h2>")
			.Write("<form name=""SubmitForm2"" Action=""Checkout.asp"" Method=""POST"">")
			.Write("<input type=""hidden"" name=""ShippingTypeID"" value=""" & Request.Form("ShippingSelected") & """>")
			.Write("<table width=100" & Chr(37) & " cellspacing=5 cellpadding=0 border=0>")
			.Write("<tr><th>Item Type</th><th>Quantity</th><th>Shipping Per Item</th><th>Shipping Charge</th>")
			.Write("</tr>")
		End With
		ShippingForRow = 0 
		TotalShipping = 0 
		Do While not rs2.EOF
			ShippingCost = rs2("IdentityShipping")
			ShippingQuantity = rs2("IdentityQuantity")
			ShippingForRow = Cdbl(ShippingCost) * CInt(ShippingQuantity)
			With Response
				.Write("<tr><td>" & rs2("IdentityDescription") & "</td><td align=center>" & rs2("IdentityQuantity"))
				.Write("</td><td align=center>" & FormatCurrency(rs2("IdentityShipping")) & "</td><td align=center>")
				.Write(FormatCurrency(ShippingForRow) & "</td></tr>")
			End With
			TotalShipping = TotalShipping + ShippingForRow
			rs2.MoveNext
		Loop
		sqlQuery = "up_GetCurrentCartSummaryInformation " & Session.SessionID
		Set rs = dbConn.Execute(sqlQuery)
		Do While Not rs.EOF
			OrderTotal = OrderTotal + Cdbl(rs("SubTotal"))
			rs.MoveNext
		Loop
		With Response
			.Write("<tr><td colspan=4><hr></td></tr>")
			.Write("<tr><td colspan=3 align=right> Shipping Total </td>")
			.Write("<td align=center>" & FormatCurrency(TotalShipping) & "</td></tr>")
			.Write("<tr><td colspan=3 align=right> Merchandise Total </td>")
			.Write("<td align=center>" & FormatCurrency(OrderTotal) & "</td></tr>")
			.Write("<tr><td colspan=4><hr></td></tr>")
			.Write("<tr><td colspan=3 align=right><b>Order Total</b></td>")
			.Write("<td align=center><b>" & FormatCurrency(OrderTotal + TotalShipping) & "</b></td></tr>")
			.Write("<td align=center colspan=2>If Everything appears in order then click here to continue")
			.Write(" to the address form<br><input type=""submit"" value=""Continue"" name=""Continue"">")
			.Write("<td align=center colspan=2>If you wish to change the shipping method, click here to go back to")
			.Write(" the previous menu<br><input type=""submit"" value=""Go Back"" name=""GoBack"">")
			.Write("</table></form>")
		End With
	End If	
Else
	Dim Counter 'as Integer
	sqlQuery = "up_GetShippingOptions"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		Counter = 0
		With Response
			.Write("<h1>Step 1: Shipping Options</h1>")
			.Write("<p>Important Information</p>")
			.Write("<ol><li>Currently we can ship to USA addresses only")
			.Write("<li>Shipping is free for any additional itemsin excess of 5 items of each type</ol>")
			If Request.QueryString("Error") = "NoShip" Then
				.Write("<p class=""error"">Please make sure to select a shipping method!</p>")
			End IF
			.Write("<form name=""ShippingForm"" method=""POST"" Action=""CheckOut.asp"">")
			.Write("<table width=""100" & chr(37) & """ cellspacing=0 cellpadding=0>")
			.Write("<tr><th>Shipping Method</th><th>Per Compact Disc or Cassette</th>")
			.Write("<th>Per Vinyl LP.</th><th>Per Event Ticket</th><th>[choose one]</th></tr>")
		End With
		Do While Not rs.Eof
			With Response
				If (Counter Mod 2) > 0 Then
					.Write("<tr bgcolor=""#999999"">")
				Else
					.Write("<tr bgcolor=""#CCCCCC"">")
				End IF
				.Write("<td>" & rs("ShippingTypeDescription") & "</td><td align=center>" & rs("ShippingPerCDCass") & "</td><td>")
				.Write(rs("ShippingPerLP") & "</td><td align=center>" & rs("ShippingPerTicket") & "</td><td align=center>")
				.Write("<input type=""radio"" name=""ShippingSelected"" value=""" & rs("ShippingTypeID") & """></td></tr>")
			End With
			Counter = Counter + 1
			rs.MoveNext
		Loop
		Response.Write("<tr><td colspan=5 align=""center"">Select Shipping Method:")
		Response.Write("<input type=""submit"" value=""Submit"" name=""Submit"">")
		Response.Write("</table></form>")
	End IF
	Set rs = Nothing
End IF
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