<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>
<%
Dim re
Sub ValidateForm()
	Dim boolFormIsValid 'as Boolean
	boolFormIsValid = true 
	If len(Request.Form("FirstName")) < 1 Then
		boolFormIsValid = False
	End If
	If Len(Request.Form("LastName")) < 1 Then
		boolFormIsValid = False
	End If
	If Len(Request.Form("Address1")) < 1 Then
		boolFormIsValid = False
	End If
	If Cint(Request.Form("State")) < 1 Then
		boolFormIsValid = False
	End If
	If Len(Request.Form("Zip")) < 5 Then
		boolFormIsValid = False
	End If

  	Set re = new RegExp
	re.pattern = "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
	If not re.test(Request.Form("Email")) Then
		boolFormIsValid = False
	End IF
	re.pattern = "^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$"
	If Not re.test(Request.Form("Phone")) Then
		boolFormIsValid = False
	End If
	If Not boolFormIsValid Then
		BuildForm()
	Else
		If Len(Request.Form("Address2")) < 1 Then
			Address2 = ""
		Else
			Address2 = Request.Form("Address2")
		End If
		sqlQuery = "up_InsertCustomerInfo '" & Request.Form("FirstName") & "', '" & Request.Form("LastName")
		sqlQuery = sqlQuery & "', '" & Request.Form("Address1") & "', '" & Address2 & "', '"
		sqlQuery = sqlQuery & Request.Form("City") & "', '" & Request.Form("State") & "', '"
		sqlQuery = sqlQuery & Request.Form("Zip") & "', '" & Request.Form("Email") & "', '"
		sqlQuery = sqlQuery & Request.Form("Phone") & "'"
		response.write(sqlQuery)
		Set rs = dbConn.Execute(sqlQuery)
		CustomerID = rs(0)
		rs.Close
		Response.Redirect("Billing.asp?CID=" & CustomerID)
	End If
	
	

End Sub

Sub BuildForm()
	If Request.Form("Submit") = "Submit" Then
		blnShowErrors = true
	Else
		blnShowErrors = false
	End IF
%>
<form name="ContactForm" action="address.asp" method="post">
		<h1>Step 2. Address and Contact Information</h1>
		<p>Required fields are marked with an asterisk <span class="error">*</span>.</p>
		<table width=100% cellspacing=5 cellpadding=0>
		<tr>
			<td align="right"><span class="error">*</span> First Name:</td>
			<td><input type="text" name="FirstName" value="<%=Request.Form("FirstName")%>">
			<% If blnShowErrors and Len(Request.Form("FirstName")) < 1 Then
					Response.Write("<span class=""error"">Please Enter Your First Name</span>")
				End If %>
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> Last Name:</td>
			<td><input type="text" name="LastName" value="<%=Request.Form("LastName")%>">
			<% If blnShowErrors and Len(Request.Form("LastName")) < 1 Then
					Response.Write("<span class=""error"">Please Enter Your Last Name</span>")
				End If %>
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> Address Line 1:</td>
			<td><input type="text" name="Address1" value="<%=Request.Form("Address1")%>">
			<% If blnShowErrors and Len(Request.Form("Address1")) < 5 Then
					Response.Write("<span class=""error"">Please Enter Your Address</span>")
				End If %>
			</td>
		</tr>
		<tr>
			<td align="right">Address Line 2:</td>
			<td><input type="text" name="Address2" value="<%=Request.Form("Address2")%>"></td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> City:</td>
			<td><input type="text" name="City" value="<%=Request.Form("City")%>">
			<% If blnShowErrors and Len(Request.Form("City")) < 5 Then
					Response.Write("<span class=""error"">Please Enter Your City</span>")
				End If %>
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> State:</td>
			<td><select name="State">
				<option value="0">[Choose One]
<%
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	sqlQuery = "up_GetStateForSelect"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		Do While Not rs.Eof
			Response.Write("<option ")
			If Cint(Request.Form("State")) = Cint(rs("StateID")) Then
				Response.Write("selected")
			End If
			Response.Write(" value=""" & rs("StateID") & """>" & rs("StateName") & vbcrlf)
			rs.MoveNext
		Loop
	End IF	
	Response.Write("</select>")			
	If blnShowErrors and Cint(Request.Form("State")) < 1 Then
					Response.Write("<span class=""error"">Please Select Your State</span>")
	End If 
%>			
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> Zip Code:</td>
			<td><input type="text" name="Zip" value="<%=Request.Form("Zip")%>">
			<% If blnShowErrors and Len(Request.Form("Zip")) < 5 Then
					Response.Write("<span class=""error"">Please Enter a Valid Zip Code</span>")
				End If %>
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> Email Address:</td>
			<td><input type="text" name="Email"  value="<%=Request.Form("Email")%>">
			<% 
  			Set re = new RegExp
			re.pattern = "^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
			If blnShowErrors and not re.test(Request.Form("Email")) Then
				Response.Write("<span class=""error"">Please Enter a Valid Email Address</span>")
			End IF%>
			</td>
		</tr>
		<tr>
			<td align="right"><span class="error">*</span> Telephone Number With Area Code:</td>
			<td><input type="text" name="Phone"  value="<%=Request.Form("Phone")%>">
			<%
			re.pattern = "^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$"
			If (blnShowErrors and Not re.test(Request.Form("Phone"))) or ( blnShowErrors and Len(Request.Form("Phone")) < 1 ) Then
				Response.Write("<span class=""error"">Please Re-Enter Your Phone (XXX) XXX-XXXX</span>")
			End If%>
			</td>
		</tr>
		<tr>
			<td align="right"><input type="submit" name="submit" value="Submit"></td>
			<td><input type="reset" name="clear" value="Clear"></td>
		</tr>
		</table>
		</form>


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
		<!-- navigation commented out for this section -->
		<!-- include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
<%
	If Request.Form("submit") = "Submit" Then
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