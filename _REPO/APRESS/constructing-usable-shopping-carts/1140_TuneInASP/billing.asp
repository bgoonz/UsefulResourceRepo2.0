<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn </title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>
<%
If Request.Form("online") = "Credit Card" Then
	'Note in a real world application this would redirect to the Secure Server
	Response.Redirect("OnlineForm.asp?Session=" & request.form("SessionID") & "&CID=" & Request.Form("CustomerID"))
ElseIF Request.Form("offline") = "Printable Form" Then
	Response.Redirect("OfflineForm.asp?Session=" & request.form("SessionID") & "&CID=" & Request.Form("CustomerID"))
End If
%>
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
		<!-- include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
		<h1>Step 3: Payment Options</h1>
		<form name="BillingForm" action="billing.asp" method="post">
		<input type="hidden" name="SessionID" value="<%=Session.SessionID%>">
		<input type="hidden" name="CustomerID" value="<%=Request.QueryString("CID")%>">
        <table border=1 cellspacing=5 cellpadding=0>
			<tr>
				<td>
					<p><b>Option #1:</b> Online Credit Card</p>
					<p>We currently accept Visa, MasterCard, or American Express</p>
					<p>Click the button below to proceed to our secure credit card form. Please have your credit card ready 
					and be sure that the zip code you enter on the following page matches the one to which your monthly
					statement is mailed.</p>
				</td>
				<td>
					<p><b>Option #2:</b> Phone, Fax or Mail</p>
					<p>Click the button below to view a printable copy of your order which you can then use to phone, fax or
					mail your order to us.</p>
					<p>Please note that we cannot process your order until payment is recieved. For your protection please do
					<b>not</b> send your Credit Card Number by Email.
				</td>
			</tr>
			<tr>
				<td align=center><input type="submit" value="Credit Card" name="online"></td>
				<td align=center><input type="submit" value="Printable Form" name="offline"></td>
			</tr>
		</table>
	</form>
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