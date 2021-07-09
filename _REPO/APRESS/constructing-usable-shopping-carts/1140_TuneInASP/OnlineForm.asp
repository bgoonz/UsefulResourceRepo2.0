<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>
<%
    Function CheckCCNumLuhn(ccnumber)
    	Dim i, w, x, y
    	y = 0
    	ccnumber = Replace(Replace(Replace(CStr(ccnumber), "-", ""), " ", ""), ".", "")
    	w = 2 * (Len(ccnumber) Mod 2)
    	For i = Len(ccnumber) - 1 To 1 Step -1
    		x = Mid(ccnumber, i, 1)
    		if IsNumeric(x) Then
    			Select Case (i Mod 2) + w
    				Case 0, 3 
    					y = y + CInt(x)
    				Case 1, 2 
    					x = CInt(x) * 2
    					if x > 9 Then   
    						y = y + (x \ 10) + (x - 10)
    					Else
    						y = y + x
    					End if
    			End Select
    		End if
    	Next     
    	y = 10 - (y Mod 10)
    	if y > 9 Then y = 0
    	CheckCC = (CStr(y) = Right(ccnumber, 1))
    End function



Sub ValidateForm()
	Dim boolFormIsValid 'as Boolean
	boolFormIsValid = true 
	If Len(Request.Form("ccname")) < 1 Then boolFormIsValid = False
	If Len(Request.Form("cctype")) < 1 Then boolFormIsValid = False
	If Cint(Request.Form("ccmonth")) < 1 Then boolFormIsValid = False
	If Cint(Request.Form("ccyear")) < 1 Then boolFormIsValid = False
	If Len(Request.Form("ccnumber")) < 1 Then boolFormIsValid = False
	If Len(Request.Form("cczip")) < 1 Then boolFormIsValid = False
	If Not CheckCCNumLuhn(Request.Form("ccnumber")) Then boolFormIsValid = False
	If Not boolFormIsValid Then
		BuildForm()
	Else
		'This is where you pass the information to Merchant account interface
		Response.write("Information submitted to merchant account.")
	End If
End Sub

Sub BuildForm()
	If Request.Form("Submit") = "Submit" Then
		blnShowErrors = true
	Else
		blnShowErrors = false
	End IF
	%>
		<h1>Credit Card Information</h1>
        <p>All Fields Are Required.</p>
		<form name="CCForm" action="OnlineForm.asp" method=POST>
		<p align=center><b>Your name as it appears on the card</b><br>
		<input type="text" name="ccname" value="<%=Request.Form("ccname")%>" size=60>
		<%if blnShowErrors AND Len(Request.Form("ccname")) < 1 Then response.write("<span class=""error"">Please Enter Your Name</span>")%>
		</p><hr>
		<p align=center><b>Type of Card</b><br>
		<table width=50% cellspacing=2 cellpadding=0>
		<tr><td align=right>Visa</td><td><input type="radio" name="cctype" value="visa" <%if request.form("cctype")="visa" then response.write("checked")%>><br></td></tr>
		<tr><td align=right>MasterCard</td><td><input type="radio" name="cctype" value="mc" <%if request.form("cctype")="mc" then response.write("checked")%>><br></td></tr>
		<tr><td align=right>American Express</td><td><input type="radio" name="cctype" value="amex"  <%if request.form("cctype")="amex" then response.write("checked")%>><br></td></tr>
		</table></p><hr>
		<p align=center><b>Expiration Date</b></p>
		<table width=100% cellspacing=5 cellpadding=0>
			<tr><td align=center>Month</td><td align=center>Year</td></tr>
			<tr>
				<td align=center>
				<select name="ccmonth">
					<option value=0>[Choose Month]
	<%
	Dim arrMonths 
	arrMonths = array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
	For i = 0 to UBound(arrMonths)
		Response.Write("<option value=" & (i+1))
		If Cint(Request.Form("ccmonth")) = (i+1) then response.write(" selected ")
		Response.write(">" & arrMonths(i) & vbcrlf)
	
	Next
	%>	
				</select>
				<%if blnShowErrors AND Cint(Request.Form("ccmonth")) < 1 Then response.write("<span class=""error"">Please Select the expiration month</span>")%>
				</td>
				<td align=center><select name="ccyear">
					<option value=0>[Choose Year]
	<%
	Dim thisYear
	thisYear = Year(Now)
	For i = 0 to 4
		Response.Write("<option value=" & (thisYear+i))
		If Cint(Request.Form("ccyear")) = (thisYear + i) Then Response.write(" selected ")
		Response.Write(">" & (thisYear+i))
	Next
	%>	
					</select>
					<%if blnShowErrors AND Cint(Request.Form("ccyear")) < 1 Then response.write("<span class=""error"">Please Select the expiration year</span>")%>
				</td></tr>
		<tr><td colspan=2><hr></td></tr>
			<tr><td align=center>Card Number</td>
				<td align=center>Zip Code where you recieve your statement</td>
			</tr><tr>
				<td align=center>
				<input type="text" name="ccnumber" value="<%=request.form("ccnumber")%>">
				<%If blnShowErrors AND len(request.form("ccnumber"))<1 AND NOT CheckCCNumLuhn(Request.Form("ccnumber"))Then
				response.write("<span class=""error"">Please verify your credit card number</span>")
				End If %>
				</td>
				<td align=center>
				<input type="text" name="cczip" value="<%=request.form("cczip")%>">
				<%if blnShowErrors AND Len(Request.Form("cczip")) < 1 Then response.write("<span class=""error"">Please enter your zip code</span>")%>
				</td>
			</tr><tr><td colspan=2><hr></td></tr>
			<tr><td align=center><input type="submit" name="submit" value="Submit"></td>
				<td align=center><input type="reset" name="reset" value="Reset"></td></tr>
		</table></form>
<%End Sub%>

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
<%
	If lcase(Request.Form("submit")) = "submit" Then
	    ValidateForm()	
	Else	
		BuildForm()
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