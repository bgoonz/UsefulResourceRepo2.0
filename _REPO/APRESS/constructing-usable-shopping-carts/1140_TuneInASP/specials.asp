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
		<h1>A Special Offer from TuneIn!</h1>
<%
	If Len(Request.QueryString("SpecialID")) > 0 Then
		Dim HTMLString 'as String
		Dim sqlQuery 'as String
		Dim rs 'as ADODB.Recordset
		sqlQuery = "up_GetSpecialInfo " & Request.QueryString("SpecialID")
		Set rs = Server.CreateObject("ADODB.Recordset")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF and rs.BOF Then
			HTMLString = HTMLString & "An Error Occurred"
		Else
			HTMLString = HTMLString & "<b>" & rs("ShortDescription") & "</b><br>" 
			HTMLString = HTMLString & "<p>" & rs("LongDescription") & "</p>"
			HTMLString = HTMLString & "Order Now! Offer Ends " & rs("EndDate") & "<br>"
			ProdCode = rs("ProductCodeID")
			If Cint(rs("ItemTypeID")) = 1 Then
				URL = "<a href=""music.asp?AlbumID=" & ProdCode & """>here</a>"
			Else
				URL = "<a href=""shows.asp?ShowID=" & ProdCode & """>here</a>"
			End IF
			HTMLString = HTMLString & "Click " & URL & " for order form<br>"
		End IF
		Response.Write(HTMLString)
		Set rs = Nothing
	Else
		Response.Redirect("index.asp")
	End If
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